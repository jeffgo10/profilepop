# ProfilePop

Style a profile photo with Gemini. Pick a theme, upload an image, download the result.

**Live:** [https://profilepop.liteshademedia.com](https://profilepop.liteshademedia.com) (password protected)

## Stack

- Next.js (App Router)
- Gemini image model via `@google/genai`
- Tailwind CSS
- Cloudflare Workers via `@opennextjs/cloudflare`

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the env file and add your [Gemini API key](https://aistudio.google.com/apikey):

```bash
cp .env.example .env.local
```

3. Run the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Locally, Basic Auth is skipped unless you set `SITE_PASSWORD` in `.env.local`.

## How it works

1. Choose a visual theme (Anime, Neon Night, Oil Studio, and more).
2. Upload a JPG, PNG, or WebP profile photo (max 8MB).
3. Hit **Pop it** — the app sends your image and a theme prompt to Gemini.
4. Download the styled portrait.

API route: `POST /api/generate` with `multipart/form-data` fields `themeId` and `image`.

## Deploy (Cloudflare Workers)

Worker name: `profilepop`  
Custom domain: `profilepop.liteshademedia.com`

### One-time setup

1. Create a Cloudflare API token with Workers Scripts Edit, Account Settings Read, and Zone DNS Edit for `liteshademedia.com`.
2. Add GitHub repo secrets:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
3. Deploy once (local or via Actions), then set Worker secrets:

```bash
npx wrangler secret put GEMINI_API_KEY
npx wrangler secret put SITE_PASSWORD
# optional:
# npx wrangler secret put SITE_USERNAME
```

Default Basic Auth username is `portfolio` when `SITE_USERNAME` is unset.

### Local deploy

```bash
npm run deploy
```

### CI

Pushes to `master` run [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds with OpenNext and deploys the Worker. App secrets (`GEMINI_API_KEY`, `SITE_PASSWORD`) stay on the Worker — they are not set by the workflow.

### Preview in the Workers runtime

```bash
npm run preview
```
