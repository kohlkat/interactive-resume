# Kohlkat Interactive Resume (local-only lane)

**Not** in the Zaraa monorepo. **Not** synced to GBrain.

The site is a phone briefing: one sentence, five chapters, then the traditional resume and cover letter as a download. The street address stays in those files only.

Source Drive folder: `Interactive resume and regular resume`
- `David Kohler resume.docx`
- `David Kohler cover letter.docx`

## Local

```bash
cd /Users/zaraa/Code/kohlkat-interactive-resume/site
npm install
npm run dev
```

## Deploy to Kohlkat Vercel only

Current machine CLI is logged in as Zaraa's Vercel (`zaraagoddess-4684` / `zaraas-projects`).
That account is **blocked** by `scripts/deploy-kohlkat-vercel.sh`.

1. Create a token in Kohlkat's Vercel dashboard → Settings → Tokens.
2. Export it (do not commit):

```bash
export KOHLKAT_VERCEL_TOKEN='…'
npm run deploy:kohlkat
```

## GitHub (Kohlkat)

`gh` on this Mac is only `Skyscrapersax`. GitHub CLI supports multiple accounts:

```bash
gh auth login -h github.com   # choose Kohlkat user
gh auth status
gh auth switch --user kohlkat
```

Then create the repo under `kohlkat` (not Skyscrapersax) if you want a Git remote.
