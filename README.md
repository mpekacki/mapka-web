# Mapka

Location-based adventure game played in a mobile web browser. Adventures are
text stories whose steps are tied to real-world places found via
OpenStreetMap/Overpass queries; the player physically walks to a place to
unlock the next step.

Modern re-scaffold of the original Ionic/Create React App project:

- **Vite 7 + React 19 + TypeScript 5** (replaces Create React App)
- **PWA** via `vite-plugin-pwa` (replaces the CRA Workbox template), with
  offline caching of OSM map tiles
- **Leaflet 1.9 / react-leaflet 5** for the map
- **Redux Toolkit 2** for game state, persisted to `localStorage`
  (replaces `@ionic/storage`)
- **Browser Geolocation API** (replaces Cordova/Capacitor plugins)
- **react-router 7** with `HashRouter` so deep links work on GitHub Pages
- Plain CSS with automatic light/dark theme (replaces Ionic components);
  the sheet over the map is a custom `BottomSheet` component

## Commands

```sh
npm install
npm run dev      # dev server
npm run build    # typecheck + production build to dist/
npm run preview  # serve the production build locally
npm run deploy   # build and publish dist/ to the gh-pages branch
```

Note: geolocation requires a secure context. `localhost` works for
development; anything else must be HTTPS. To test on a phone against the dev
server, use `npm run dev -- --host` and either accept the insecure-origin
limitation (manual location mode still works) or tunnel via HTTPS.
