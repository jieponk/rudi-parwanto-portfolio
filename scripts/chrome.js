// Shared VS Code × macOS window chrome for /blog, /links and 404.
// The homepage (index.html) has its own richer chrome; keep both visually in sync.
'use strict';

const svg = (d, sw = 1.6) => `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const P = {
  code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
  battery: '<rect x="2.5" y="7" width="17" height="10" rx="2.5"/><rect x="4.5" y="9" width="10" height="6" rx="1" fill="currentColor" stroke="none"/><path d="M21.5 10.5v3"/>',
  wifi: '<path d="M2.5 9a14 14 0 0 1 19 0"/><path d="M5.5 12.3a9.5 9.5 0 0 1 13 0"/><path d="M8.6 15.5a5 5 0 0 1 6.8 0"/><circle cx="12" cy="18.6" r="1.2" fill="currentColor" stroke="none"/>',
  left: '<path d="m15 6-6 6 6 6"/>', right: '<path d="m9 6 6 6-6 6"/>', down: '<path d="m6 9 6 6 6-6"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.8-4.8"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  files: '<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h2"/>',
  home: '<path d="M4 11 12 4l8 7"/><path d="M6 10v10h12V10"/>',
  book: '<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  download: '<path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14"/>',
  account: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  contrast: '<circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  remote: '<path d="m4 8 4 4-4 4M20 8l-4 4 4 4"/>',
  branch: '<circle cx="6" cy="5" r="2"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="6" r="2"/><path d="M6 7v10M18 8c0 5-5 5-10.5 9"/>',
  err: '<circle cx="12" cy="12" r="8"/><path d="m9.5 9.5 5 5m0-5-5 5"/>',
  warn: '<path d="M12 4 3 20h18z"/><path d="M12 10v4m0 3v.01"/>',
  bell: '<path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>'
};
const ic = k => svg(P[k]);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const FI = { js: '<span class="fi" aria-hidden="true">JS</span>', md: '<span class="fi md" aria-hidden="true">MD</span>', html: '<span class="fi html" aria-hidden="true">&lt;&gt;</span>', pdf: '<span class="fi pdf" aria-hidden="true">PDF</span>' };

/**
 * @param {object} o
 * @param {'blog'|'links'|'404'} o.section  which area is open
 * @param {string} o.app       app name in the menu bar
 * @param {string} [o.file]    open file name, e.g. "my-post.md"
 * @param {string} [o.fileType] js | md | html
 * @param {string} [o.fileHref]
 * @param {string[]} [o.crumbs] breadcrumb parts before the file
 * @param {string} [o.language] status bar language label
 */
function chrome(o) {
  const section = o.section;
  const file = o.file || (section === 'blog' ? 'index.md' : section === 'links' ? 'links.html' : section === 'master' ? 'calculator.js' : '404.html');
  const type = o.fileType || (section === 'blog' ? 'md' : section === 'master' ? 'js' : 'html');
  const href = o.fileHref || (section === 'blog' ? '/blog/' : section === 'links' ? '/links/' : section === 'master' ? '/master/' : '#');
  const crumbs = o.crumbs || ['cv-portfolio', section === '404' ? '' : section].filter(Boolean);
  const top = (name, url) => `<a href="${url}"${(section === name.toLowerCase()) ? ' class="active" aria-current="page"' : ''}>${name}</a>`;
  const act = (url, icon, label, cur) => `<a class="act${cur ? ' current' : ''}" href="${url}" aria-label="${label}" title="${label}"${cur ? ' aria-current="page"' : ''}>${ic(icon)}</a>`;
  const fileRow = (lvl, url, t, name, active) => `<a class="file lvl${lvl}${active ? ' active' : ''}" href="${url}"${active ? ' aria-current="page"' : ''}>${FI[t]}<span class="filename">${esc(name)}</span></a>`;
  const folder = (name, url, open) => `<a class="tree-row lvl1 tree-link" href="${url}">${ic(open ? 'down' : 'right')}<span class="tree-folder">${ic('folder')}</span><span>${name}</span></a>`;

  let tree = fileRow(1, '/', 'js', 'portfolio.js', false);
  tree += folder('blog', '/blog/', section === 'blog');
  if (section === 'blog') {
    tree += fileRow(2, '/blog/', 'md', 'index.md', file === 'index.md');
    if (file !== 'index.md') tree += fileRow(2, href, type, file, true);
  }
  tree += folder('links', '/links/', section === 'links');
  if (section === 'links') tree += fileRow(2, '/links/', 'html', 'links.html', true);
  if (section === '404') tree += fileRow(1, '#', 'html', '404.html', true);
  if (section === 'master') tree += folder('master', '/master/', true) + fileRow(2, '/master/', 'js', 'calculator.js', true);
  tree += `<a class="tree-row lvl1 tree-link leaf" href="/Rudi-Parwanto-CV.pdf" download>${FI.pdf}<span>Rudi-Parwanto-CV.pdf</span></a>`;

  let tabs = `<a class="tab" href="/">${FI.js}<span class="tab-label">portfolio.js</span></a>`;
  if (section === 'blog' && file !== 'index.md') tabs += `<a class="tab" href="/blog/">${FI.md}<span class="tab-label">index.md</span></a>`;
  tabs += `<a class="tab active" href="${href}" aria-current="page">${FI[type]}<span class="tab-label">${esc(file)}</span></a>`;
  if (section !== 'links') tabs += `<a class="tab" href="/links/">${FI.html}<span class="tab-label">links.html</span></a>`;

  const crumbHtml = crumbs.map(c => `<span>${esc(c)}</span><i class="crumb-sep">›</i>`).join('') + `${FI[type]}<b>${esc(file)}</b>`;

  const head = `<header class="mac-menu"><div class="menu-left"><a class="apple brand-mark" href="/" aria-label="CV Studio — Portfolio">${svg(P.code, 2)}</a><b>${esc(o.app)}</b><nav class="top-links" aria-label="Site">${top('Portfolio', '/')}${top('Blog', '/blog/')}${top('Links', '/links/')}</nav></div>`
    + `<div class="menu-right"><span class="mac-icon desktop-status">${ic('battery')}</span><span class="mac-icon desktop-status">${ic('wifi')}</span><span id="clock"></span></div></header>`
    + `<div class="window"><div class="titlebar"><div class="tb-left"><div class="lights" aria-hidden="true"><i></i><i></i><i></i></div><div class="tb-nav"><button type="button" data-nav="back" aria-label="Back">${ic('left')}</button><button type="button" data-nav="forward" aria-label="Forward">${ic('right')}</button></div></div>`
    + `<a class="command-center" href="/" aria-label="Open portfolio">${ic('search')}<span>cv-portfolio — ${esc(file)}</span></a>`
    + `<div class="title-right"><button id="theme" type="button" aria-label="Switch color theme">${ic('sun')}<span>Light</span></button></div></div>`
    + `<div class="work"><nav class="activitybar" aria-label="Activity bar"><button type="button" class="act active" id="act-explorer" aria-label="Toggle explorer" aria-pressed="true" title="Explorer">${ic('files')}</button>`
    + act('/', 'home', 'Portfolio', false) + act('/blog/', 'book', 'Blog', section === 'blog') + act('/links/', 'link', 'Links', section === 'links')
    + `<a class="act" href="/Rudi-Parwanto-CV.pdf" download aria-label="Download CV" title="Download CV">${ic('download')}</a><span class="act-spacer"></span>`
    + `<a class="act" href="https://github.com/jieponk" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" title="GitHub">${ic('branch')}</a>`
    + `<a class="act" href="https://id.linkedin.com/in/rudi-parwanto-a0723b163" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" title="LinkedIn">${ic('account')}</a><button type="button" class="act" id="act-theme" aria-label="Switch color theme" title="Color theme">${ic('contrast')}</button></nav>`
    + `<aside class="sidebar"><div class="side-head"><span class="explorer-title">EXPLORER</span></div><div class="tree"><div class="side-section">${ic('down')}<span>CV-PORTFOLIO</span></div>${tree}</div>`
    + `<div class="stats"><div class="side-section">${ic('down')}<span>PROFILE</span></div><div><span>Name</span><span>Rudi Parwanto</span></div><div><span>Role</span><span>E-Commerce</span></div><div><span>Base</span><span>Jakarta</span></div></div></aside>`
    + `<section class="editor-group"><nav class="tabs" aria-label="Open files">${tabs}</nav><main class="editor" id="editor"><div class="breadcrumb">${crumbHtml}</div>`;

  const foot = `</main></section></div><footer class="status"><div class="status-left"><span class="sb-item sb-remote">${ic('remote')}</span><span class="sb-item">${ic('branch')}main</span><span class="sb-item">${ic('err')}0 ${ic('warn')}0</span></div>`
    + `<div class="status-right"><span class="sb-item sb-wide">UTF-8</span><span class="sb-item sb-wide">LF</span><span class="sb-item">${esc(o.language || (type === 'md' ? 'Markdown' : 'HTML'))}</span><a class="sb-item" href="https://www.dmca.com/site-report/masrudi.site" target="_blank" rel="noopener noreferrer" title="View the DMCA site report for masrudi.site">DMCA</a><span class="sb-item sb-wide">${ic('bell')}</span></div></footer></div>`;

  return { head, foot };
}

// Applied before first paint to avoid a theme flash.
const themeBoot = `<script>(function(){try{var t=localStorage.getItem('cvstudio-theme')||localStorage.getItem('cv-theme')||localStorage.getItem('rudi-theme');if(t==='light')document.documentElement.dataset.theme='light'}catch(e){}})()</script>`;
const bodyOpen = `<body class="vsc boot-skip"><script>if(document.documentElement.dataset.theme==='light')document.body.classList.add('light')</script>`;

// Favicon set + manifest, shared by every generated page.
const headIcons = '<link rel="icon" href="/favicon.ico?v=3" sizes="any"><link rel="icon" href="/favicon.svg?v=3" type="image/svg+xml"><link rel="apple-touch-icon" href="/apple-touch-icon.png?v=3"><link rel="manifest" href="/site.webmanifest">';
const OG_IMAGE = 'https://masrudi.site/assets/og-image.jpg';

module.exports = { chrome, themeBoot, bodyOpen, headIcons, OG_IMAGE, svg, P };
