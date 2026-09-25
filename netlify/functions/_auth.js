const crypto=require("crypto");
const COOKIE="mm_session";
function b64(s){return Buffer.from(s).toString("base64url")}
function sign(payload){const secret=process.env.MASTER_SECRET||"";return b64(payload)+"."+crypto.createHmac("sha256",secret).update(b64(payload)).digest("base64url")}
function verify(token){try{const [p,s]=token.split(".");const secret=process.env.MASTER_SECRET||"";const good=crypto.createHmac("sha256",secret).update(p).digest("base64url");if(!crypto.timingSafeEqual(Buffer.from(s),Buffer.from(good)))return false;const obj=JSON.parse(Buffer.from(p,"base64url").toString());return obj.exp>Date.now()}catch{return false}}
function cookies(event){return Object.fromEntries((event.headers.cookie||"").split(";").filter(Boolean).map(x=>{let i=x.indexOf("=");return [x.slice(0,i).trim(),decodeURIComponent(x.slice(i+1))]}))}
function authed(event){return verify(cookies(event)[COOKIE]||"")}
function json(statusCode,body,headers={}){return{statusCode,headers:{"Content-Type":"application/json; charset=utf-8",...headers},body:JSON.stringify(body)}}
module.exports={COOKIE,sign,authed,json};