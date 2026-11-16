"""Builds docs/readme-banner.svg — an animated mini preview of masrudi.site for README.md.
Run: python3 scripts/readme-banner.py"""
import base64, html, os
ROOT = os.path.join(os.path.dirname(__file__), '..')
E = html.escape
avatar = base64.b64encode(open('/tmp/avatar.jpg', 'rb').read()).decode() if os.path.exists('/tmp/avatar.jpg') else ''

KW, PR, ST, CM, TX, BO, LN = '#569cd6', '#9cdcfe', '#ce9178', '#6a9955', '#cccccc', '#569cd6', '#6e7681'
code = [
    [(CM, '# About Rudi Parwanto')],
    [],
    [(KW, 'const '), (PR, 'specialist'), (TX, ' = {')],
    [(TX, '  '), (PR, 'name'), (TX, ': '), (ST, '"Rudi Parwanto"'), (TX, ',')],
    [(TX, '  '), (PR, 'role'), (TX, ': '), (ST, '"E-Commerce Specialist"'), (TX, ',')],
    [(TX, '  '), (PR, 'location'), (TX, ': '), (ST, '"Central Jakarta, Indonesia"'), (TX, ',')],
    [(TX, '  '), (PR, 'focus'), (TX, ': '), (ST, '"Marketplace Growth & Operations"'), (TX, ',')],
    [(TX, '  '), (PR, 'available'), (TX, ': '), (BO, 'true')],
    [(TX, '};')],
]
CYCLE = 12.0
def appear(t, end=0.96):
    k = t / CYCLE
    return (f'<animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;{k:.3f};{k+0.01:.3f};{end};1" '
            f'dur="{CYCLE}s" repeatCount="indefinite"/>')

EX, EY = 300, 152   # editor origin
code_svg = []
for i, toks in enumerate(code):
    y = EY + i * 20
    t = 0.6 + i * 0.32
    spans = ''.join(f'<tspan fill="{c}">{E(s)}</tspan>' for c, s in toks)
    code_svg.append(f'<text x="{EX+8}" y="{y}" class="mono" font-size="13" fill="{LN}" text-anchor="end">{i+1}</text>'
                    f'<text x="{EX+30}" y="{y}" class="mono" font-size="13" xml:space="preserve" opacity="1">{appear(t)}{spans}</text>')
last_t = 0.6 + (len(code) - 1) * 0.32
cursor_y = [EY + i * 20 - 13 for i in range(len(code))]
cursor_x = [EX + 32 + sum(len(t) for _, t in toks) * 7.83 for toks in code]
cur_vals = ';'.join(str(v) for v in cursor_y) + f';{cursor_y[-1]}'
curx_vals = ';'.join(f'{v:.0f}' for v in cursor_x) + f';{cursor_x[-1]:.0f}'
cur_keys = ';'.join(f'{(0.6 + i*0.32)/CYCLE:.3f}' for i in range(len(code)))
files = ['about.js', 'experience.js', 'projects.js', 'skills.js', 'education.js', 'contact.js']
tabs = ''.join(
    f'<g transform="translate({284 + i*118},78)">'
    f'<rect width="118" height="32" fill="{"#1f1f1f" if i == 0 else "#181818"}"/>'
    f'<line x1="118" y1="0" x2="118" y2="32" stroke="#2b2b2b"/>'
    f'<text x="14" y="20" class="mono" font-size="9" font-weight="700" fill="#e8c547">JS</text>'
    f'<text x="34" y="21" class="sans" font-size="12.5" fill="{"#ececec" if i == 0 else "#9d9d9d"}">{f}</text></g>'
    for i, f in enumerate(files))
explorer = ''.join(
    f'<g><text x="{150}" y="{176 + i*22}" class="mono" font-size="8.5" font-weight="700" fill="#e8c547">JS</text>'
    f'<text x="168" y="{177 + i*22}" class="sans" font-size="12.5" fill="#cccccc">{f}</text></g>'
    for i, f in enumerate(files))
eq = ''.join(f'<rect x="{868 + i*4}" y="526" width="2.4" height="8" rx="1" fill="#ffffff" class="eq" style="animation-delay:-{i*0.27:.2f}s"/>' for i in range(3))

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="560" viewBox="0 0 1200 560" role="img" aria-label="Preview of masrudi.site — a portfolio styled as VS Code on macOS">
<defs>
  <linearGradient id="wall" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a1b54"/><stop offset=".55" stop-color="#151a3d"/><stop offset="1" stop-color="#3a1640"/></linearGradient>
  <filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="60"/></filter>
  <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#000" flood-opacity=".55"/></filter>
  <clipPath id="winClip"><rect x="40" y="44" width="1120" height="496" rx="12"/></clipPath>
  <clipPath id="av"><circle cx="{EX+66}" cy="{EY+278}" r="36"/></clipPath>
  <linearGradient id="shine" x1="0" x2="1"><stop offset="0" stop-color="#ececec"/><stop offset=".45" stop-color="#ececec"/><stop offset=".5" stop-color="#9fd0ff"/><stop offset=".55" stop-color="#ececec"/><stop offset="1" stop-color="#ececec"/>
    <animateTransform attributeName="gradientTransform" type="translate" values="-1 0;1 0;1 0" keyTimes="0;.4;1" dur="6s" repeatCount="indefinite"/></linearGradient>
</defs>
<style>
  .mono{{font-family:"SF Mono",ui-monospace,Menlo,Consolas,"Liberation Mono",monospace}}
  .sans{{font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",Helvetica,Arial,sans-serif}}
  .blob{{animation:drift 20s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:center}}
  .b2{{animation-duration:26s;animation-delay:-8s}}
  @keyframes drift{{0%{{transform:translate(0,0)}}100%{{transform:translate(120px,-40px) scale(1.15)}}}}
  .blink{{animation:blink 1s steps(1) infinite}}@keyframes blink{{50%{{opacity:0}}}}
  .eq{{animation:eq .9s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:bottom}}
  @keyframes eq{{0%{{transform:scaleY(.3)}}100%{{transform:scaleY(1.2)}}}}
  .glow{{animation:glow 2.4s ease-in-out infinite}}@keyframes glow{{50%{{opacity:.35}}}}
  @media (prefers-reduced-motion:reduce){{*{{animation:none!important}}}}
</style>

<!-- macOS wallpaper + menu bar -->
<rect width="1200" height="560" rx="16" fill="url(#wall)"/>
<g filter="url(#blur)" opacity=".7"><circle class="blob" cx="200" cy="480" r="170" fill="#7c3aed"/><circle class="blob b2" cx="1000" cy="80" r="160" fill="#0a84ff"/></g>
<rect width="1200" height="26" rx="0" fill="#000" fill-opacity=".28"/>
<rect x="14" y="5" width="16" height="16" rx="4" fill="#5e5ce6"/><text x="22" y="17" text-anchor="middle" class="mono" font-size="9" font-weight="800" fill="#fff">&lt;/&gt;</text>
<text x="40" y="17.5" class="sans" font-size="12.5" font-weight="700" fill="#fff">CV Studio</text>
<text x="118" y="17.5" class="sans" font-size="12.5" fill="#fff" word-spacing="14">File Edit View Go Window Help</text>
<text x="1184" y="17.5" text-anchor="end" class="sans" font-size="12" fill="#fff">masrudi.site</text>

<!-- window -->
<g filter="url(#shadow)"><rect x="40" y="44" width="1120" height="496" rx="12" fill="#181818"/></g>
<g clip-path="url(#winClip)">
  <rect x="40" y="44" width="1120" height="34" fill="#181818"/>
  <line x1="40" y1="78" x2="1160" y2="78" stroke="#2b2b2b"/>
  <circle cx="60" cy="61" r="6" fill="#ff5f57"/><circle cx="80" cy="61" r="6" fill="#febc2e"/><circle cx="100" cy="61" r="6" fill="#28c840"/>
  <text x="128" y="66" class="sans" font-size="14" fill="#6e7681">‹  ›</text>
  <rect x="400" y="50" width="400" height="22" rx="6" fill="#252527" stroke="#3c3c3c"/>
  <text x="600" y="65" text-anchor="middle" class="sans" font-size="12" fill="#9d9d9d">⌕  cv-portfolio — about.js</text>

  <!-- activity bar -->
  <rect x="40" y="79" width="44" height="437" fill="#181818"/><line x1="84" y1="79" x2="84" y2="516" stroke="#2b2b2b"/>
  <rect x="40" y="92" width="2" height="24" fill="#0a84ff"/>
  <g fill="none" stroke="#cccccc" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M54 96h10l4 4v14h-14z"/><path d="M58 100v-4"/>
  </g>
  <g fill="none" stroke="#6e7681" stroke-width="1.6" stroke-linecap="round">
    <circle cx="61" cy="146" r="6"/><path d="M65.5 150.5l4 4"/>
    <rect x="54" y="186" width="14" height="12" rx="2"/><path d="M54 192h14"/>
    <path d="M61 228v10m-4-4l4 4 4-4M55 242h12"/>
  </g>

  <!-- explorer -->
  <rect x="85" y="79" width="198" height="437" fill="#181818"/><line x1="283" y1="79" x2="283" y2="516" stroke="#2b2b2b"/>
  <text x="100" y="102" class="sans" font-size="11" font-weight="600" fill="#9d9d9d" letter-spacing=".8">EXPLORER</text>
  <text x="100" y="126" class="sans" font-size="11.5" font-weight="700" fill="#cccccc">⌄ CV-PORTFOLIO</text>
  <text x="112" y="148" class="sans" font-size="12.5" fill="#cccccc">⌄ 📁 src</text>
  <rect x="86" y="160" width="196" height="22" fill="#0a84ff" fill-opacity=".2" stroke="#0a84ff"/>
  {explorer}
  <text x="112" y="{177 + 6*22}" class="sans" font-size="12.5" fill="#cccccc">› 📁 blog</text>
  <text x="112" y="{177 + 7*22}" class="sans" font-size="12.5" fill="#cccccc">› 📁 links</text>
  <text x="100" y="{177 + 9*22}" class="sans" font-size="11.5" font-weight="700" fill="#4ec9b0">⌄ STATS</text>
  <text x="112" y="{177 + 10*22}" class="sans" font-size="12" fill="#9d9d9d">Specialty</text>
  <text x="270" y="{177 + 10*22}" text-anchor="end" class="mono" font-size="11.5" fill="#4ec9b0">E-Commerce</text>
  <text x="112" y="{177 + 11*22}" class="sans" font-size="12" fill="#9d9d9d">Blog posts</text>
  <text x="270" y="{177 + 11*22}" text-anchor="end" class="mono" font-size="11.5" fill="#4ec9b0">8</text>

  <!-- editor -->
  <rect x="284" y="79" width="876" height="437" fill="#1f1f1f"/>
  <rect x="284" y="79" width="876" height="31" fill="#181818"/>
  {tabs}
  <rect x="284" y="78" width="118" height="2" fill="#0a84ff"/>
  <line x1="284" y1="110" x2="1160" y2="110" stroke="#2b2b2b"/>
  <text x="300" y="127" class="sans" font-size="11.5" fill="#9d9d9d">cv-portfolio › src › components › <tspan fill="#cccccc">about.js</tspan></text>
  {''.join(code_svg)}
  <rect class="blink" width="2" height="16" fill="#aeafad">
    <animate attributeName="x" values="{curx_vals}" keyTimes="{cur_keys};1" dur="{CYCLE}s" calcMode="discrete" repeatCount="indefinite"/>
    <animate attributeName="y" values="{cur_vals}" keyTimes="{cur_keys};1" dur="{CYCLE}s" calcMode="discrete" repeatCount="indefinite"/>
  </rect>
  <!-- minimap -->
  <g opacity=".55">{''.join(f'<rect x="1100" y="{142+i*5}" width="{w}" height="2" fill="{c}"/>' for i,(w,c) in enumerate([(30,CM),(0,TX),(36,KW),(44,ST),(48,ST),(52,ST),(56,ST),(34,BO),(10,TX)]))}</g>

  <!-- preview card -->
  <line x1="284" y1="{EY+172}" x2="1160" y2="{EY+172}" stroke="#2b2b2b"/>
  <text x="300" y="{EY+193}" class="sans" font-size="11" font-weight="600" fill="#9d9d9d" letter-spacing=".8">PREVIEW</text>
  <g opacity="1">{appear(last_t + 0.6)}
    <rect x="{EX}" y="{EY+204}" width="560" height="128" rx="12" fill="#252527" stroke="#2b2b2b"/>
    <text x="{EX+20}" y="{EY+224}" class="mono" font-size="11" fill="#6a9955">// Profile</text>
    <circle cx="{EX+66}" cy="{EY+278}" r="39" fill="none" stroke="#0a84ff" stroke-width="2.5"/>
    {f'<image href="data:image/jpeg;base64,{avatar}" x="{EX+30}" y="{EY+242}" width="72" height="72" clip-path="url(#av)" preserveAspectRatio="xMidYMid slice"/>' if avatar else ''}
    <text x="{EX+124}" y="{EY+256}" class="sans" font-size="20" font-weight="700" fill="url(#shine)">Rudi Parwanto</text>
    <text x="{EX+124}" y="{EY+278}" class="sans" font-size="13" fill="#9d9d9d">E-Commerce Specialist · Central Jakarta</text>
    <rect x="{EX+124}" y="{EY+288}" width="226" height="22" rx="11" fill="#4ec9b0" fill-opacity=".12" stroke="#4ec9b0" stroke-opacity=".6"/>
    <circle class="glow" cx="{EX+137}" cy="{EY+299}" r="3.5" fill="#4ec9b0"/>
    <text x="{EX+146}" y="{EY+303}" class="sans" font-size="11.5" fill="#4ec9b0">E-Commerce Systems &amp; Automation</text>
    <rect x="{EX+364}" y="{EY+288}" width="96" height="22" rx="6" fill="#0066d6"/>
    <text x="{EX+412}" y="{EY+303}" text-anchor="middle" class="sans" font-size="11" font-weight="700" fill="#fff">⤓ Download CV</text>
    <rect x="{EX+466}" y="{EY+288}" width="80" height="22" rx="6" fill="none" stroke="#3c3c3c"/>
    <text x="{EX+506}" y="{EY+303}" text-anchor="middle" class="sans" font-size="11" font-weight="600" fill="#ececec">Contact Me</text>
  </g>
  <g opacity="1">{appear(last_t + 0.9)}
    <rect x="{EX+576}" y="{EY+204}" width="268" height="128" rx="12" fill="#252527" stroke="#2b2b2b"/>
    <text x="{EX+596}" y="{EY+224}" class="mono" font-size="11" fill="#6a9955">// Quick Facts</text>
    {''.join(f'<text x="{EX+596}" y="{EY+250+i*21}" class="sans" font-size="12" fill="#9d9d9d">{k}</text><text x="{EX+826}" y="{EY+250+i*21}" text-anchor="end" class="sans" font-size="12" fill="#ececec">{E(v)}</text>' for i,(k,v) in enumerate([("Experience","5+ years"),("Stores","Aneka Foto · Urbanix"),("Platforms","Shopee · TikTok Shop"),("Stack","JS · Workers · Django")]))}
  </g>

  <!-- status bar -->
  <rect x="40" y="516" width="1120" height="24" fill="#181818"/><line x1="40" y1="516" x2="1160" y2="516" stroke="#2b2b2b"/>
  <rect x="40" y="516" width="34" height="24" fill="#0066d6"/>
  <text x="57" y="532" text-anchor="middle" class="mono" font-size="11" font-weight="700" fill="#fff">&gt;&lt;</text>
  <text x="86" y="532" class="sans" font-size="11.5" fill="#9d9d9d" xml:space="preserve">⎇ main     ⊗ 0  ⚠ 0</text>
  {eq}
  <text x="884" y="532" class="sans" font-size="11.5" fill="#9d9d9d" xml:space="preserve">Music     Ln 9, Col 3     UTF-8     {{ }} JavaScript</text>
</g>
</svg>'''
open(os.path.join(ROOT, 'docs', 'readme-banner.svg'), 'w').write(svg)
print('ok', len(svg))
