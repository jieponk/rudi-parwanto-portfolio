'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { markdown, sanitizeRawHtml, safeHref } = require('../scripts/build-blog.js');

test('generates stable heading ids and a TOC for longer articles', () => {
  const html = markdown('## Intro\n\n## Setup\n\n## Setup\n\n## Finish');
  assert.match(html, /class="article-toc"/);
  assert.match(html, /id="setup"/);
  assert.match(html, /id="setup-2"/);
  assert.match(html, /href="#finish"/);
});

test('renders callout variants and multi-paragraph blockquotes', () => {
  const html = markdown('> [!WARNING] Take care\n> First paragraph\n>\n> Second paragraph\n\n> A quote.');
  assert.match(html, /class="callout callout-warning"/);
  assert.match(html, /<blockquote><p>A quote\.<\/p><\/blockquote>/);
  assert.match(html, /First paragraph<\/p><p>Second paragraph/);
});

test('renders footnote references with unique IDs and a backlink', () => {
  const html = markdown('Text[^ref] and again[^ref].\n\n[^ref]: Source note.');
  assert.match(html, /id="fnref-ref"/);
  assert.match(html, /id="fnref-ref-2"/);
  assert.match(html, /href="#fnref-ref"/);
  assert.match(html, /Source note\./);
});

test('renders copyable code and Mermaid source fallback', () => {
  const html = markdown('```js\nconsole.log(1)\n```\n\n```mermaid\nflowchart TD\n A --> B\n```');
  assert.match(html, /class="copy-code"/);
  assert.match(html, /class="mermaid-block"/);
  assert.match(html, /class="diagram-source"/);
});

test('keeps safe relative links and rejects executable URL schemes', () => {
  assert.equal(safeHref('/downloads/guide.pdf'), '/downloads/guide.pdf');
  assert.equal(safeHref('../images/example.png'), '../images/example.png');
  assert.equal(safeHref('javascript:alert(1)'), '#');
  assert.equal(safeHref('javascript&#58;alert(1)'), '#');
  assert.equal(safeHref('//untrusted.example'), '#');
});

test('sanitizes event handlers while preserving accessible component hooks', () => {
  const html = sanitizeRawHtml('<div data-tabs><button type="button" data-tab-trigger="one" aria-selected="true" onclick="alert(1)">One</button><section data-tab-panel="one" hidden>Content</section></div>');
  assert.match(html, /data-tabs/);
  assert.match(html, /data-tab-trigger="one"/);
  assert.match(html, /aria-selected="true"/);
  assert.match(html, /hidden/);
  assert.doesNotMatch(html, /onclick/);
});

test('supports table scrolling semantics and fenced code language classes', () => {
  const html = markdown('| Name | Value |\n| --- | --- |\n| A | B |\n\n```css\na { color: red }\n```');
  assert.match(html, /class="table-wrap" role="region"/);
  assert.match(html, /<th scope="col">Name<\/th>/);
  assert.match(html, /class="language-css"/);
});
