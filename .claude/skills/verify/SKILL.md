---
name: verify
description: How to run and drive mapka-web for runtime verification
---

# Verifying mapka-web

Browser GUI (React + Vite + Leaflet). Verify by driving it with Playwright headless Chromium.

## Launch

```
npm run dev   # Vite on http://localhost:5173, ready in <1s
```

Routes use HashRouter: home is `/#/`, adventure page is `/#/adventure/0` (id `0` is a built-in example adventure).

## E2E tests

`@playwright/test` is a devDependency; the suite lives in `e2e/` and runs with `npm test` (config in `playwright.config.ts` starts the dev server itself, or reuses a running one). Prefer extending the suite over writing ad-hoc drive scripts. If browsers are missing, run `npx playwright install chromium-headless-shell`.

## Driving the app / gotchas

- **External requests**: the tests stub the Overpass API (any URL ending `/interpreter`) with a node at the center of the requested bbox — see `e2e/location.spec.ts` `beforeEach` — and abort other non-localhost traffic (OSM tiles). Do NOT block by `/overpass/` regex: it matches the app's own `src/overpass.ts` module URL and blanks the whole page. Aborting Overpass instead of stubbing it makes adventures fail with an error overlay that covers the map and intercepts clicks.
- **Reading app state**: Redux state is persisted to `localStorage['adventures']`, but only after the first dispatch. The home page may dispatch nothing; the adventure page always dispatches (auto-starts the adventure), so read state there or after an interaction.
- **Geolocation flows**: a fresh context auto-denies permission prompts; `test.use({ permissions: ['geolocation'], geolocation: {...} })` grants. `ctx.grantPermissions` / `ctx.setGeolocation` work mid-session to simulate a user granting on re-prompt.
- The "Manual location" toggle on the adventure page is `getByRole('checkbox')`. The player marker is `.player-marker`, place pins are `.map-pin`, the geolocation error banner is `.geo-error-banner`.
