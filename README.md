# Kohlkat Interactive Resume (local-only lane)

**Not** in the Zaraa monorepo. **Not** synced to GBrain.

Source Drive folder: `Interactive resume and regular resume`
- `interactive-resume-three-v6.3.zip` (partial R3F slice → completed here)
- `David Kohler resume.docx`
- `David Kohler cover letter.docx`

## Local

```bash
cd /Users/zaraa/Code/kohlkat-interactive-resume/site
npm install
npm run dev
```

Optional GLBs: see `scripts/fetch-assets.sh`, then `VITE_USE_MODELS=1 npm run dev`.

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
