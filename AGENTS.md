# AGENTS.md

## Cursor Cloud specific instructions

This is a **pnpm + Turborepo monorepo** (`mindwave-app`). `pnpm install` at the repo
root installs everything for all workspaces. Node 22 and `pnpm@9` are already available.

### Services & how to run them
- **web** — Next.js app (`apps/web`), dev server on port **3000**.
- **docs** — Next.js app (`apps/docs`), dev server on port **3001**.
- **mobile** — Expo / React Native app (`apps/mobile`); this is the primary product.

Run web + docs together with `pnpm dev` (runs `turbo run dev`). Standard scripts:
`pnpm lint`, `pnpm check-types`, `pnpm build` — see `package.json` / `turbo.json`.

### Non-obvious caveats
- The `mobile` app has **no `dev` script** (Expo uses `start`), so `turbo run dev` /
  `pnpm dev` only starts **web** and **docs**. Start mobile separately from
  `apps/mobile`: `npx expo start` (Metro on **8081**), or `npx expo start --web` to run
  it in a browser without native toolchains.
- For headless/CI verification of the mobile app, prefix with `CI=1` to disable Metro
  watch mode, e.g. `CI=1 npx expo start --web --port 8082`.
- The **repo root is itself a second, separate Expo app** (`App.tsx`, `app.json`,
  `ios/`, `android/`) that also uses Metro on **8081**. Do not run the root Expo app and
  `apps/mobile` at the same time — they collide on port 8081.
- `pnpm` is the canonical package manager (`pnpm-lock.yaml`). Stray `package-lock.json`
  files exist at the root and in `apps/mobile`; ignore them and do not run `npm install`.
- Expo peer-dependency warnings during `pnpm install` are expected and non-fatal.
