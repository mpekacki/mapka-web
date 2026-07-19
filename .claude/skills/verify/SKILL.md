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

## Drive with Playwright

Playwright is not a project dep. Install the driver in the scratchpad (`npm i playwright`) and run scripts from there; browsers live in `%LOCALAPPDATA%\ms-playwright` — run `npx playwright install chromium-headless-shell` if the revision doesn't match.

Gotchas learned the hard way:

- **Blocking external requests**: use a URL-predicate route like `(url) => url.hostname !== 'localhost'`. Do NOT block by `/overpass/` regex — it matches the app's own `src/overpass.ts` module URL and blanks the whole page.
- **Reading app state**: Redux state is persisted to `localStorage['adventures']`, but only after the first dispatch. The home page may dispatch nothing; the adventure page always dispatches (auto-starts the adventure), so read state there or after an interaction.
- **Geolocation flows**: a fresh context auto-denies permission prompts; `newContext({ permissions: ['geolocation'], geolocation: {...} })` grants them. `ctx.grantPermissions` / `ctx.setGeolocation` work mid-session to simulate a user granting on re-prompt.
- The "Manual location" toggle on the adventure page is `getByRole('checkbox')`. The player marker is `.player-marker`.
- With external requests blocked, adventures show the Overpass error overlay — expected, doesn't affect the toolbar/map/state.
