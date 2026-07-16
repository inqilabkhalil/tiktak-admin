# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server
- `npm run build` — typecheck (`tsc -b`) then production build (`vite build`)
- `npm run lint` — run ESLint over the project
- `npm run preview` — preview the production build
- Typecheck only: `npx tsc --noEmit` (fast way to check for compile errors without a full build)
- There is no test runner configured in this repo (no `test` script, no test files/framework installed).

## Stack

- Vite + React 19 + TypeScript, `antd` v6 as the UI kit, `react-router-dom` v7, `zustand`, `formik` + `yup`, `axios`, `dayjs`.
- Path alias `@/*` → `src/*` (configured in both `vite.config.ts` and `tsconfig.app.json`).
- UI copy and many in-code comments are written in Azerbaijani — keep new user-facing strings consistent with that.

## Architecture

### Routing is not actually wired up yet

`main.tsx` wraps the app in `<BrowserRouter>`, and `react-router-dom` is a dependency, but nothing uses `<Routes>`/`<Route>`. `App.tsx` currently just renders a single page component directly (e.g. `return <CampaignsPage />`), and switching pages today means editing which component `App.tsx` returns. `Sidebar` reads/writes a `?page=` search param rather than navigating real routes. Treat this as an in-progress area, not a settled pattern — if asked to add real navigation, that's a deliberate change, not a bug fix.

### `src/` layout

- `app/routes/` — placeholder, currently empty.
- `features/<name>/{components,hooks,services,styles,types,utils}` — one folder per domain (`auth`, `campaigns`, `categories`, `orders`, `products`, `users`). Almost all of these are still empty `index.js` stubs; only `campaigns` has real content (`features/campaigns/types/campaign.ts`, `features/campaigns/utils/mockCampaigns.ts`). This is the intended home for domain logic/types/mock data as features get built out.
- `pages/<name>/` — page-level composition. Only `campaigns` and `products` are implemented as real `.tsx` files; the rest (`auth`, `categories`, `dashboard`, `orders`, `users`) are empty `index.js` stubs.
- `shared/components/` — reusable UI, see pattern below.
- `shared/constants/` — `colors.tsx` (`COLORS` palette), `font.tsx` (`FONT_FAMILY`), `env.ts` (`API_URL` from Vite env).
- `shared/store/`, `shared/services/`, `shared/hooks/`, `shared/utils/`, `shared/types/` — all currently empty stubs (zustand store and axios service layer not wired up yet; `pages/campaigns/campaign.tsx` uses static mock data instead of a service call).

### Shared component pattern

Each component under `shared/components/` follows:
```
ComponentName/
  component/ComponentName.tsx
  styles/ComponentName.module.css   (optional)
  index.ts                          (barrel: `export * from './component/ComponentName'` or default re-export)
```
Import from the barrel (`shared/components/Button`), not the inner `component/` file.

Shared components are thin wrappers around the matching `antd` component that fix house conventions (e.g. `Button` fixes `borderRadius`/`height` but deliberately does not hardcode color — callers pass color via the `style` prop depending on intent, e.g. green for add, red for delete; `Table` fixes default pagination behavior so it isn't repeated per feature). Follow this wrap-don't-fork approach when adding new shared components rather than styling `antd` components ad hoc in page code.

### Styling

CSS Modules (`*.module.css`) are used per component/page, alongside global `App.css` / `index.css`. There's also a plain (non-module) `.app-container` class defined in `App.css` and referenced by className string (not via the CSS-module `styles` import) in `pages/campaigns/campaign.tsx` — that file imports `App.css` directly for it.

Page-level layout ownership is currently inconsistent between pages: `pages/campaigns/campaign.tsx` renders its own `Header` + `Sidebar` + content shell internally, while `pages/products/products.tsx` renders only its own content with no shell. Check how the specific page you're touching currently composes itself before assuming a shared layout wrapper exists.

Font: the `--font-family` CSS variable (declared once in `index.css` `:root`) is what every CSS Module should use — `font-family: var(--font-family);` — rather than hardcoding `'Roboto', sans-serif'` again. For JS-side contexts that need the font (e.g. antd `ConfigProvider` theme tokens), use the `FONT_FAMILY` constant from `shared/constants/font.tsx` instead. The two are kept manually in sync (CSS can't import a `.tsx` export) — if you change the font, update both.

## Keeping this file updated

When you learn something about this codebase's structure, conventions, or in-progress state that isn't obvious from reading a single file — and that would save a future session time — add it here rather than only acting on it. Keep entries factual and about the repo itself (not about a specific conversation or task).
