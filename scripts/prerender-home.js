// Writes a static snapshot of the default (English, About) view into index.html,
// so search engines and no-JS visitors see real content before script.js runs.
// Content source of truth stays in script.js. Run via `npm run build`.
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ROOT = path.resolve(__dirname, '..');

// Minimal no-op DOM so script.js can execute and expose its data.
const noop = new Proxy(function () {}, {
  get(_, prop) { if (prop === Symbol.toPrimitive) return () => ''; if (prop === 'length') return 0; return noop; },
  apply() { return noop; }, construct() { return noop; }, set() { return true; }
});
const ctx = {
  document: noop, window: noop, history: noop, location: { hash: '' }, navigator: noop,
  localStorage: { getItem: () => null, setItem() {} }, CustomEvent: function () {},
  setInterval() {}, setTimeout() {}, structuredClone, Intl, Date, console
};
vm.createContext(ctx);
const src = fs.readFileSync(path.join(ROOT, 'script.js'), 'utf8') + '\n;globalThis.__out={pages:englishPages,highlight};';
vm.runInContext(src, ctx, { filename: 'script.js' });
const { pages, highlight } = ctx.__out;
const about = pages.about;

const code = about.code.map((line, i) => `<div class="line"><span class="ln">${i + 1}</span><span>${highlight(line)}</span></div>`).join('');
const crumb = 'cv-portfolio &gt; src &gt; components &gt; <b>' + about.label + '</b>';
const lines = Object.values(pages).reduce((n, p) => n + p.code.length, 0);

const file = path.join(ROOT, 'index.html');
let html = fs.readFileSync(file, 'utf8');
const put = (key, value) => {
  const re = new RegExp(`<!--prerender:${key}-->[\\s\\S]*?<!--/prerender:${key}-->`);
  if (!re.test(html)) throw new Error('marker missing: ' + key);
  html = html.replace(re, `<!--prerender:${key}-->${value}<!--/prerender:${key}-->`);
};
put('code', code);
put('content', about.html.replace(/\n\s*/g, ' '));
put('crumb', crumb);
// Inline the homepage CSS so the first paint needs no extra render-blocking requests.
const minifyCss = css => css
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s+/g, ' ')
  .replace(/\s*([{};,>])\s*/g, '$1')
  .replace(/;}/g, '}')
  .trim();
const inlineCss = ['style.css', 'vscode.css']
  .map(f => minifyCss(fs.readFileSync(path.join(ROOT, f), 'utf8')))
  .join('');
if (/<\/style/i.test(inlineCss)) throw new Error('CSS contains </style');
put('inline-css', `<style>${inlineCss}</style>`);
html = html.replace(/<span id="linecount">[^<]*<\/span>/, `<span id="linecount">${lines}</span>`);
fs.writeFileSync(file, html);
console.log('Prerendered About into index.html');
