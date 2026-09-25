SEO PATCH - Rudi Parwanto Portfolio

Replace/copy these files into the repository root while preserving folders:
- index.html
- scripts/build-blog.js
- admin/config.yml

Then commit and push. Netlify build will regenerate blog pages, feed.xml and sitemap.xml automatically.

Changes:
- Homepage Person + WebSite structured data
- Better homepage title and Twitter/Open Graph metadata
- Blog article published-time/author metadata
- Safer CMS date output (YYYY-MM-DD)
- Build accepts existing ISO datetime values and normalizes them
- Sitemap includes all valid posts + lastmod
- Fix escaped Markdown headings/lists from existing CMS test post
