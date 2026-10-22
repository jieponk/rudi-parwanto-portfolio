<div align="center">

# Rudi Parwanto

### E-Commerce Specialist · Automation · Web Development

Personal portfolio and blog for documenting projects, workflows, and experiments in e-commerce operations, pricing systems, and automation.

<p>
  <a href="https://masrudi.site">Website</a> ·
  <a href="https://masrudi.site/blog/">Blog</a> ·
  <a href="https://masrudi.site/sitemap.xml">Sitemap</a>
</p>

</div>

---

## About

This repository contains the source code for my personal portfolio and blog. It brings together my professional profile, selected work, notes, and small tools in one place.

My main areas of interest are:

- **E-commerce operations** — marketplace workflows, product data, and reporting.
- **Pricing systems** — fee calculations, margin analysis, and pricing workflows.
- **Automation** — reducing repetitive tasks with practical tools.
- **Web development** — building and maintaining lightweight websites and internal utilities.

## Features

- Responsive portfolio website.
- Blog with category pages and content generated from JSON files.
- Search and RSS feed.
- Sitemap and `robots.txt` for search-engine discovery.
- Static assets, downloadable CV, and custom 404 page.
- Cloudflare Worker endpoints for supported site functions.
- Browser-based blog CMS under `/admin/`.
- Marketplace fee calculator under `/master/`.

> Some features require Cloudflare Worker configuration and secrets. A successful static build alone does not verify OAuth, API endpoints, or other server-side functionality.

## Tech Stack

- HTML, CSS, and JavaScript
- Node.js build scripts
- Cloudflare Workers and Wrangler
- GitHub for source control and deployment workflow
- JSON files for blog content

## Project Structure

```text
.
├── admin/                  # Blog CMS interface
├── assets/                 # Images, icons, and blog media
├── blog/                   # Generated blog pages and category pages
├── content/
│   ├── blog/               # Blog posts stored as JSON
│   └── settings/           # Blog configuration
├── links/                  # Links page
├── master/                 # Marketplace fee calculator interface
├── scripts/
│   └── build-blog.js       # Generates blog pages, feed, and sitemap
├── worker-data/            # Data used by Worker features
├── index.html              # Portfolio homepage
├── worker.js               # Cloudflare Worker logic
├── wrangler.json           # Wrangler configuration
├── package.json            # Project metadata and scripts
├── sitemap.xml             # Search-engine sitemap
├── robots.txt              # Crawler rules
└── feed.xml                # RSS feed
```

## Run Locally

Requirements: Node.js and npm.

1. Clone the repository:

   ```bash
   git clone https://github.com/jieponk/rudi-parwanto-portfolio.git
   cd rudi-parwanto-portfolio
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the blog pages and generated files:

   ```bash
   npm run build
   ```

4. To run or test the Worker locally, configure Wrangler and the required local environment variables, then use:

   ```bash
   npx wrangler dev
   ```

The build command generates the blog pages and related files. Worker features that depend on credentials or Cloudflare bindings need additional configuration before they can be tested.

## Blog Content

Blog posts are stored in `content/blog/` as JSON files. After editing or adding a post, run:

```bash
npm run build
```

Review the generated pages, `feed.xml`, and `sitemap.xml` before committing the changes.

## Cloudflare Deployment

The site is configured for deployment with Cloudflare Workers and Wrangler.

Typical deployment commands:

```bash
npm run build
npx wrangler deploy
```

Before deploying, confirm that `wrangler.json` points to the intended Worker and asset directory. Do not publish the repository root as public assets if it would expose source files, internal data, or `node_modules`.

Configure required environment variables and secrets in the Cloudflare dashboard. Names used by the Worker may include:

- `MASTER_USERNAME`
- `MASTER_PASSWORD` *(secret)*
- `MASTER_SECRET` *(secret)*
- `GITHUB_OAUTH_ID`
- `GITHUB_OAUTH_SECRET` *(secret)*

Use the exact variable names expected by the current Worker code. Never commit real passwords, OAuth client secrets, session secrets, API tokens, or other credentials to the repository.

For GitHub OAuth, the application's callback URL must match the route implemented by the deployed Worker. Check the current Worker routes before configuring the OAuth app.

## SEO

The production domain is `https://masrudi.site`.

- Sitemap: <https://masrudi.site/sitemap.xml>
- Robots: <https://masrudi.site/robots.txt>
- RSS feed: <https://masrudi.site/feed.xml>

Keep canonical URLs, sitemap entries, and the sitemap reference in `robots.txt` aligned with the production domain.

## Security Notes

- Do not store credentials in tracked files.
- Keep CMS and administrative routes protected.
- Review Worker asset bindings and deployment settings before each production release.
- Test login, blog comments, calculator endpoints, and key pages after deployment.

## License

No license has been specified for this repository. Unless a license is added, reuse and redistribution permissions should not be assumed.
