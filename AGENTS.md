# Repository Guidelines

## Project Structure & Module Organization
- `src/pages/`: Astro entry points that load feature services and compose layouts.
- `src/features/<feature>/`: Feature-scoped UI, layouts, and future data handlers; mirror route responsibilities (e.g., `top`, `about`, `blog`, `contact`).
- `src/shared/`: Cross-feature building blocks (`layouts/`, `components/`, `styles/`, `types/`, `utils/`). Import via the `@` alias (configured in `astro.config.mjs`).
- `public/`: Directly served static assets (favicons, OG images). Use module imports for processed assets that live under `src/`.
- Configuration roots: `astro.config.mjs`, `tsconfig.json`, and `biome.json` manage build, path aliases, TypeScript, and lint/format rules.

## Build, Test, and Development Commands
- `npm run dev` (or `npm run start`): Launch Astro dev server; access http://localhost:4321.
- `npm run build`: Run `astro check` then emit the static site to `dist/`.
- `npm run preview`: Serve the `dist/` output for manual QA.
- `npm run biome:check`: Biome diagnose mode (format + lint without writing changes).
- `npm run biome:format`: Apply Biome formatting fixes across the repo.

## Coding Style & Naming Conventions
- Biome enforces 2-space indentation, LF line endings, single quotes, trailing commas (`es5`), and required semicolons.
- Name Astro/TS modules in kebab-case under `pages/` and `features/` (e.g., `top/layouts/layout.astro`); keep helpers in camelCase.
- Use descriptive view-transition keys like `transition:name="hero-image"`. Avoid committing `console`/`debugger`; Biome flags them.

## Testing Guidelines
- There is no automated test harness yet. Perform manual smoke tests: home ↔ about, blog list → detail, browser back/forward, and reduced-motion preference.
- Always run `npm run build` before opening or updating a PR to catch type/compile issues early.
- Document manual test steps and expected outcomes in the PR description.

## Commit & Pull Request Guidelines
- Follow Conventional Commit prefixes (`feat:`, `fix:`, `chore:`, `refactor:`). Keep subject ≤72 characters and add context in the body when behaviour changes.
- Ensure `npm run biome:check` and `npm run build` pass locally before requesting review.
- PRs should include: concise summary, linked issues, screenshots or GIFs for visual changes, and manual QA notes.
- Target `main`, request at least one reviewer, and respond promptly to feedback.

## Architecture Notes
- The repository applies a feature-based layout inspired by Bulletproof React: feature folders own their UI, while shared houses cross-cutting concerns.
- When adding API clients or services, prefer feature-local placement; move shared abstractions into `src/shared/lib/` or `src/shared/api/` as they emerge.
- Keep new contributors oriented by updating this guide whenever folder responsibilities shift.
