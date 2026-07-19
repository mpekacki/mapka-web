import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

const ADVENTURE_PATH = '/#/adventure/0';
const LONDON = { latitude: 51.5074, longitude: -0.1278 };
const WARSAW = { latitude: 52.2297, longitude: 21.0122 };
const POZNAN = { latitude: 52.4064, longitude: 16.9252 };

// keep tests hermetic: stub the Overpass API with a node at the center of
// the requested bounding box (so adventures load with markers near the
// player wherever they are) and block all other external traffic (OSM tiles)
test.beforeEach(async ({ context }) => {
  await context.route(
    (url) => url.hostname !== 'localhost',
    (route) => {
      const url = new URL(route.request().url());
      if (!url.pathname.endsWith('/interpreter')) {
        return route.abort();
      }
      const query = url.searchParams.get('data') ?? '';
      const bbox = query.match(/\((-?[\d.]+),(-?[\d.]+),(-?[\d.]+),(-?[\d.]+)\)/);
      const lat = bbox ? (parseFloat(bbox[1]) + parseFloat(bbox[3])) / 2 : 0;
      const lon = bbox ? (parseFloat(bbox[2]) + parseFloat(bbox[4])) / 2 : 0;
      // spread places queried in the same area slightly apart
      const jitter = (query.length % 10) * 0.0005;
      return route.fulfill({
        json: {
          elements: [
            {
              type: 'node',
              lat: lat + jitter,
              lon: lon + jitter,
              tags: { name: 'Test Place' },
            },
          ],
        },
      });
    }
  );
});

interface PersistedState {
  isManualLocation: boolean;
  playerPosition: { latitude: number; longitude: number } | null;
  geolocationError: string | null;
}

// Redux state is mirrored to localStorage on every dispatch; the adventure
// page always dispatches (auto-start), so the key exists shortly after load
const readState = (page: Page): Promise<PersistedState | null> =>
  page.evaluate(() => JSON.parse(localStorage.getItem('adventures') ?? 'null'));

// a fresh context has no geolocation permission, so requests are auto-denied
test.describe('geolocation denied', () => {
  test('first launch defaults to manual location at downtown London', async ({
    page,
  }) => {
    await page.goto(ADVENTURE_PATH);
    await expect(page.getByRole('checkbox')).toBeChecked();
    await expect(page.locator('.player-marker')).toHaveCount(1);
    // the adventure loads around the manual position
    await expect(page.locator('.loading-overlay')).toHaveCount(0);
    expect(await page.locator('.map-pin').count()).toBeGreaterThan(0);
    await expect
      .poll(async () => (await readState(page))?.isManualLocation)
      .toBe(true);
    expect((await readState(page))?.playerPosition).toEqual(LONDON);
  });

  test('toggling manual off shows instructions and snaps back on', async ({
    page,
  }) => {
    await page.goto(ADVENTURE_PATH);
    const toggle = page.getByRole('checkbox');
    await toggle.click();

    const banner = page.locator('.geo-error-banner');
    await expect(banner).toBeVisible();
    await expect(banner).toContainText(/site settings/i);
    await expect(toggle).toBeChecked();
    expect((await readState(page))?.playerPosition).toEqual(LONDON);

    await banner.getByRole('button', { name: 'Dismiss' }).click();
    await expect(banner).toHaveCount(0);

    // retrying surfaces the message again
    await toggle.click();
    await expect(banner).toBeVisible();
    await expect(toggle).toBeChecked();
  });

  test('granting permission on re-prompt switches to real location', async ({
    page,
    context,
  }) => {
    await page.goto(ADVENTURE_PATH);
    const toggle = page.getByRole('checkbox');
    await toggle.click();
    await expect(page.locator('.geo-error-banner')).toBeVisible();

    // user follows the instructions and allows location for the site
    await context.grantPermissions(['geolocation']);
    await context.setGeolocation(WARSAW);
    await toggle.click();

    await expect(toggle).not.toBeChecked();
    await expect(page.locator('.geo-error-banner')).toHaveCount(0);
    await expect
      .poll(async () => (await readState(page))?.playerPosition)
      .toEqual(WARSAW);

    // the position watch was re-established, so updates keep streaming
    await context.setGeolocation(POZNAN);
    await expect
      .poll(async () => (await readState(page))?.playerPosition)
      .toEqual(POZNAN);
  });

  test('a stale geolocation error is not shown after reload', async ({
    page,
  }) => {
    await page.goto(ADVENTURE_PATH);
    await expect
      .poll(() => readState(page))
      .not.toBeNull();
    await page.evaluate(() => {
      const s = JSON.parse(localStorage.getItem('adventures')!);
      s.geolocationError = 'stale error from a previous session';
      localStorage.setItem('adventures', JSON.stringify(s));
    });
    await page.reload();
    await expect(page.getByRole('checkbox')).toBeChecked();
    await expect(page.locator('.geo-error-banner')).toHaveCount(0);
  });
});

test.describe('geolocation granted on first prompt', () => {
  test.use({ permissions: ['geolocation'], geolocation: WARSAW });

  test('switches to real location and turns manual off', async ({ page }) => {
    await page.goto(ADVENTURE_PATH);
    await expect(page.getByRole('checkbox')).not.toBeChecked();
    await expect
      .poll(async () => (await readState(page))?.playerPosition)
      .toEqual(WARSAW);
    expect((await readState(page))?.isManualLocation).toBe(false);
  });

  test('manual mode chosen by the user is not overridden by fixes', async ({
    page,
    context,
  }) => {
    await page.goto(ADVENTURE_PATH);
    const toggle = page.getByRole('checkbox');
    await expect(toggle).not.toBeChecked();
    await expect
      .poll(async () => (await readState(page))?.playerPosition)
      .toEqual(WARSAW);

    // an explicit switch to manual must stick even though fixes keep coming
    await toggle.click();
    await expect(toggle).toBeChecked();
    await context.setGeolocation(POZNAN);
    await page.waitForTimeout(1500);
    const state = await readState(page);
    expect(state?.isManualLocation).toBe(true);
    expect(state?.playerPosition).toEqual(WARSAW);
  });

  test('clicking the map moves the player in manual mode', async ({
    page,
  }) => {
    await page.goto(ADVENTURE_PATH);
    const toggle = page.getByRole('checkbox');
    await expect(toggle).not.toBeChecked();
    await toggle.click();

    await expect(page.locator('.loading-overlay')).toHaveCount(0);
    await page.locator('.leaflet-container').click({ position: { x: 200, y: 300 } });
    await expect
      .poll(async () => (await readState(page))?.playerPosition)
      .not.toEqual(WARSAW);
    expect((await readState(page))?.isManualLocation).toBe(true);
  });
});
