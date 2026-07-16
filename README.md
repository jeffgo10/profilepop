# ProfilePop

Style a profile photo with Gemini. Pick a theme, upload an image, download the result.

## Stack

- Next.js (App Router)
- Gemini image model via `@google/genai`
- Tailwind CSS

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

## How it works

1. Choose a visual theme (Anime, Neon Night, Oil Studio, and more).
2. Upload a JPG, PNG, or WebP profile photo (max 8MB).
3. Hit **Pop it** — the app sends your image and a theme prompt to Gemini.
4. Download the styled portrait.

API route: `POST /api/generate` with `multipart/form-data` fields `themeId` and `image`.
