import shopeeCategories from "./worker-data/shopee-fees.json";
import tiktokCategories from "./worker-data/tiktok-fees.json";
import blibliCategories from "./worker-data/blibli-fees.json";

const COOKIE = "mm_session";
const PPH_RATE = 0.005;
const encoder = new TextEncoder();

function base64url(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
function decodeBase64url(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - normalized.length % 4) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, ch => ch.charCodeAt(0));
}
async function hmac(value, secret) {
  const key = await crypto.subtle.importKey(
    "raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  return new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
}
async function sign(payload, secret) {
  const encoded = base64url(encoder.encode(payload));
  return `${encoded}.${base64url(await hmac(encoded, secret))}`;
}
async function verify(token, secret) {
  try {
    if (!secret || !token) return false;
    const [payloadPart, signaturePart] = token.split(".");
    if (!payloadPart || !signaturePart) return false;
    const expected = await hmac(payloadPart, secret);
    const supplied = decodeBase64url(signaturePart);
    if (expected.length !== supplied.length) return false;
    let difference = 0;
    for (let i = 0; i < expected.length; i++) difference |= expected[i] ^ supplied[i];
    if (difference !== 0) return false;
    const payload = JSON.parse(new TextDecoder().decode(decodeBase64url(payloadPart)));
    return Number(payload.exp) > Date.now();
  } catch {
    return false;
  }
}
function getCookie(request, name) {
  const cookieHeader = request.headers.get("Cookie") || "";
  for (const part of cookieHeader.split(";")) {
    const index = part.indexOf("=");
    if (index < 0) continue;
    if (part.slice(0, index).trim() === name) {
      try { return decodeURIComponent(part.slice(index + 1).trim()); }
      catch { return part.slice(index + 1).trim(); }
    }
  }
  return "";
}
async function authenticated(request, env) {
  return verify(getCookie(request, COOKIE), env.MASTER_SECRET || "");
}
function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...headers }
  });
}
function methodNotAllowed() { return json({ error: "Method not allowed" }, 405, { Allow: "GET, POST" }); }
function html(body, status = 200, headers = {}) {
  return new Response(body, { status, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", ...headers } });
}
function oauthPopupResult(data, success = true, headers = {}) {
  const message = `authorization:github:${success ? "success" : "error"}:` + JSON.stringify(data);
  const safeMessage = JSON.stringify(message).replace(/</g, "\\u003c");
  return html(`<!doctype html><html lang="en"><meta charset="utf-8"><title>GitHub authorization</title><body><p>Completing GitHub authorization…</p><script>
    const message = ${safeMessage};
    if (!window.opener) { document.body.textContent = "Authorization window unavailable. Close this window and try again."; }
    else {
      window.opener.postMessage("authorizing:github", location.origin);
      window.addEventListener("message", function (event) {
        if (event.origin !== location.origin || event.data !== "authorizing:github") return;
        window.opener.postMessage(message, location.origin);
        window.close();
      });
    }
  </script></body></html>`, 200, headers);
}
async function handleCmsAuth(request, env) {
  if (request.method !== "GET") return methodNotAllowed();
  const url = new URL(request.url);
  if (url.searchParams.get("provider") !== "github") return json({ error: "OAuth provider tidak didukung." }, 400);
  if (!env.GITHUB_OAUTH_ID || !env.GITHUB_OAUTH_SECRET) return html("GitHub OAuth belum dikonfigurasi di Cloudflare Workers.", 500);
  const stateBytes = crypto.getRandomValues(new Uint8Array(32));
  const state = base64url(stateBytes);
  const callback = `${url.origin}/api/callback`;
  const authorize = new URL("https://github.com/login/oauth/authorize");
  authorize.searchParams.set("client_id", env.GITHUB_OAUTH_ID);
  authorize.searchParams.set("redirect_uri", callback);
  authorize.searchParams.set("scope", "repo");
  authorize.searchParams.set("state", state);
  return new Response(null, { status: 302, headers: {
    "Location": authorize.toString(),
    "Set-Cookie": `decap_oauth_state=${state}; Path=/api/callback; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
    "Cache-Control": "no-store"
  }});
}
async function handleCmsCallback(request, env) {
  if (request.method !== "GET") return methodNotAllowed();
  const url = new URL(request.url);
  const error = url.searchParams.get("error");
  if (error) return oauthPopupResult({ message: url.searchParams.get("error_description") || error }, false);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const expectedState = getCookie(request, "decap_oauth_state");
  const clearState = "decap_oauth_state=; Path=/api/callback; HttpOnly; Secure; SameSite=Lax; Max-Age=0";
  if (!code || !state || !expectedState || state !== expectedState) {
    return oauthPopupResult({ message: "OAuth state tidak valid. Tutup popup dan coba login lagi." }, false);
  }
  if (!env.GITHUB_OAUTH_ID || !env.GITHUB_OAUTH_SECRET) {
    return oauthPopupResult({ message: "GitHub OAuth belum dikonfigurasi di Cloudflare Workers." }, false);
  }
  try {
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ client_id: env.GITHUB_OAUTH_ID, client_secret: env.GITHUB_OAUTH_SECRET, code, redirect_uri: `${url.origin}/api/callback` })
    });
    const tokenData = await tokenResponse.json();
    if (!tokenResponse.ok || !tokenData.access_token) {
      return oauthPopupResult({ message: tokenData.error_description || tokenData.error || "GitHub gagal memberikan access token." }, false, { "Set-Cookie": clearState });
    }
    return oauthPopupResult({ token: tokenData.access_token, provider: "github" }, true, { "Set-Cookie": clearState });
  } catch {
    return oauthPopupResult({ message: "Tidak dapat menghubungi GitHub. Coba lagi." }, false, { "Set-Cookie": clearState });
  }
}
async function readBody(request) {
  try { return await request.json(); } catch { return {}; }
}
const cap = (value, max) => Math.min(value, max);
const pctLabel = rate => (rate * 100).toLocaleString("id-ID", { maximumFractionDigits: 2 }) + "%";

function detectBlibli(text) {
  const query = String(text || "").toLowerCase();
  let best = null, score = 0;
  for (const category of blibliCategories) {
    for (const keyword of (category.keywords || [])) {
      const key = String(keyword).toLowerCase();
      if (key && query.includes(key) && key.length > score) { best = category; score = key.length; }
    }
  }
  return best || blibliCategories.find(item => item.id === "camera_body") || blibliCategories[0];
}

async function handleLogin(request, env) {
  if (request.method !== "POST") return methodNotAllowed();
  if (!env.MASTER_USERNAME || !env.MASTER_PASSWORD || !env.MASTER_SECRET) {
    return json({ error: "Environment login belum disetel di Cloudflare Workers." }, 500);
  }
  const body = await readBody(request);
  if (body.username !== env.MASTER_USERNAME || body.password !== env.MASTER_PASSWORD) {
    return json({ error: "Username atau password salah." }, 401);
  }
  const token = await sign(JSON.stringify({ exp: Date.now() + 1000 * 60 * 60 * 12 }), env.MASTER_SECRET);
  return json({ ok: true }, 200, {
    "Set-Cookie": `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=43200`
  });
}
function handleLogout() {
  return json({ ok: true }, 200, {
    "Set-Cookie": `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`
  });
}
async function handleCategories(request, env) {
  if (request.method !== "GET") return methodNotAllowed();
  if (!await authenticated(request, env)) return json({ error: "Login diperlukan" }, 401);
  return json({ categories: shopeeCategories, tiktokCategories });
}
async function handleCalculate(request, env) {
  if (request.method !== "POST") return methodNotAllowed();
  if (!await authenticated(request, env)) return json({ error: "Login diperlukan" }, 401);
  const body = await readBody(request);
  const price = Number(body.price) || 0;
  const cost = Number(body.cost) || 0;
  const supplierCashback = Math.max(0, Number(body.supplierCashback) || 0);
  if (price <= 0) return json({ error: "Harga jual harus diisi." }, 400);

  const fees = [];
  let totalFees = 0, affiliate = 0;
  const pph = price * PPH_RATE;
  if (body.market === "shopee" || body.market === "gearnest") {
    const category = shopeeCategories[Number(body.shopeeCategoryIndex) || 0];
    if (!category) return json({ error: "Kategori Shopee tidak valid." }, 400);
    const categoryFee = price * category.fee;
    fees.push({ label: `Fee kategori ${pctLabel(category.fee)}`, amount: categoryFee });
    const feeMax = cap(price * 0.055, 40000);
    fees.push({ label: "FeeMax 5,5% (maks Rp40.000)", amount: feeMax });
    const extra = body.market === "shopee" ? cap(price * 0.065, 80000) : cap(price * 0.045, 60000);
    fees.push({ label: body.market === "shopee" ? "XTRA Plus 6,5% (maks Rp80.000)" : "XTRA 4,5% (maks Rp60.000)", amount: extra });
    const packing = 1600, premium = price * 0.005, dapat = price * 0.005;
    fees.push({ label: "Packing", amount: packing }, { label: "Premi 0,5%", amount: premium }, { label: "DAPAT 0,5%", amount: dapat });
    affiliate = body.campaign ? price * 0.01 * 1.11 : 0;
    fees.push({ label: "Campaign / Affiliate 1% × 1,11", amount: affiliate, off: !body.campaign });
    fees.push({ label: "PPh 0,5%", amount: pph });
    totalFees = categoryFee + feeMax + extra + packing + premium + dapat + affiliate + pph;
  } else if (body.market === "tiktok") {
    const category = tiktokCategories[Number(body.tiktokCategoryIndex) || 0];
    if (!category) return json({ error: "Kategori TikTok tidak valid." }, 400);
    const rate = body.tiktokSellerType === "mall" ? Number(category.mallFee) || 0 : Number(category.nonMallFee) || 0;
    const categoryFee = price * rate;
    const dynamicRate = Number(category.dynamicFee) || 0;
    const dynamic = cap(price * dynamicRate, 60000);
    const mallAddon = body.tiktokSellerType === "mall" ? cap(price * 0.018, 50000) : 0;
    const packing = 1250, service = 4000, growth = body.gmvExtra ? cap(price * 0.02, 100000) : 0;
    fees.push({ label: `Komisi Platform ${body.tiktokSellerType === "mall" ? "Mall" : "Non-Mall"} — ${pctLabel(rate)}`, amount: categoryFee });
    fees.push({ label: `Komisi Dinamis ${pctLabel(dynamicRate)} (maks Rp60.000)`, amount: dynamic });
    fees.push({ label: "TikTok Mall Add On 1,8% (maks Rp50.000)", amount: mallAddon, off: body.tiktokSellerType !== "mall" });
    fees.push({ label: "Packing", amount: packing }, { label: "Biaya Layanan", amount: service }, { label: "Growth Xtra 2% (maks Rp100.000)", amount: growth, off: !body.gmvExtra }, { label: "PPh 0,5%", amount: pph });
    totalFees = categoryFee + dynamic + mallAddon + packing + service + growth + pph;
  } else if (body.market === "blibli") {
    const category = detectBlibli(String(body.sku || ""));
    const regular = price * (Number(category.fee) || 0);
    const flagship = cap(price * 0.018, 50000);
    const shippingRate = Number(category.shippingRate) || 0.02;
    const shipping = cap(price * shippingRate, Number(category.shippingCap) || 30000);
    const extra = cap(price * 0.0575, 500000);
    affiliate = body.campaign ? price * 0.01 : 0;
    fees.push({ label: `Reguler Margin FS ${pctLabel(Number(category.fee) || 0)} — ${category.subcategory || category.category}`, amount: regular });
    fees.push({ label: "Add On Flagship 1,8% (maks Rp50.000)", amount: flagship });
    fees.push({ label: `Add On Pengiriman ${pctLabel(shippingRate)} (maks Rp30.000)`, amount: shipping });
    fees.push({ label: "Extra Kerja Sama 5,75% (maks Rp500.000)", amount: extra });
    fees.push({ label: "Campaign 1%", amount: affiliate, off: !body.campaign }, { label: "PPh 0,5%", amount: pph });
    totalFees = regular + flagship + shipping + extra + affiliate + pph;
  } else {
    return json({ error: "Marketplace tidak valid." }, 400);
  }

  const net = price - totalFees;
  const profit = net - cost;
  const promoNet = net, promoProfit = profit, promoMargin = price ? promoProfit / price * 100 : 0;
  const finalProfit = profit + supplierCashback;
  const finalPromoProfit = promoProfit + supplierCashback;
  const finalPromoMargin = price ? finalPromoProfit / price * 100 : 0;
  return json({ price, cost, supplierCashback, fees, totalFees, pph, net, profit, finalProfit, promoNet, promoProfit, promoMargin, finalPromoProfit, finalPromoMargin });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/auth") return handleCmsAuth(request, env);
    if (url.pathname === "/api/callback") return handleCmsCallback(request, env);
    if (url.pathname === "/api/login") return handleLogin(request, env);
    if (url.pathname === "/api/logout") return handleLogout();
    if (url.pathname === "/api/session") {
      if (request.method !== "GET") return methodNotAllowed();
      return json({ authenticated: await authenticated(request, env) });
    }
    if (url.pathname === "/api/categories") return handleCategories(request, env);
    if (url.pathname === "/api/calculate") return handleCalculate(request, env);
    if (url.pathname.startsWith("/api/")) return json({ error: "API endpoint tidak ditemukan." }, 404);
    return env.ASSETS.fetch(request);
  }
};
