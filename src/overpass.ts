import { LatLngBounds } from "leaflet";

export interface OsmData {
  elements: OsmElement[];
}

export interface OsmElement {
  type: string;
  bounds: any;
  geometry: any;
  lat: number | null;
  lon: number | null;
  distance: number | null;
  tags: {
    name: string;
  };
}

// thrown when every Overpass endpoint has been tried and none answered,
// so callers can tell a server problem apart from other failures
export class OverpassError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OverpassError";
  }
}

// Public Overpass instances, tried in order until one answers.
// See https://wiki.openstreetmap.org/wiki/Overpass_API#Public_Overpass_API_instances
const ENDPOINTS: { url: string; timeoutMs: number }[] = [
  { url: "https://maps.mail.ru/osm/tools/overpass/api/interpreter", timeoutMs: 20_000 },
  { url: "https://overpass-api.de/api/interpreter", timeoutMs: 20_000 },
  { url: "https://overpass.private.coffee/api/interpreter", timeoutMs: 8_000 },
];

// overpass-api.de grants two request slots per IP; exceeding them just
// produces 429s, so funnel all queries through a two-slot queue
const MAX_CONCURRENT = 2;
const RETRIES_PER_ENDPOINT = 2;
const BUSY_RETRY_DELAY_MS = 2_000;

let activeRequests = 0;
const waiters: (() => void)[] = [];

async function acquireSlot(): Promise<void> {
  if (activeRequests < MAX_CONCURRENT) {
    activeRequests++;
    return;
  }
  await new Promise<void>((resolve) => waiters.push(resolve));
  activeRequests++;
}

function releaseSlot(): void {
  activeRequests--;
  waiters.shift()?.();
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function buildOverpassQuery(boundsObj: LatLngBounds, overpassQuery: string) {
  const bounds = `${boundsObj.getSouth()},${boundsObj.getWest()},${boundsObj.getNorth()},${boundsObj.getEast()}`;
  const nodeQuery = `node[${overpassQuery}](${bounds});`;
  const wayQuery = `way[${overpassQuery}](${bounds});`;
  const relationQuery = `relation[${overpassQuery}](${bounds});`;
  return `[out:json][timeout:15];(${nodeQuery}${wayQuery}${relationQuery});out geom;`;
}

// start each request at the endpoint that answered most recently, so a burst
// of queries doesn't pay the timeout penalty of a struggling endpoint each time
let preferredEndpoint = 0;

async function fetchWithFallback(query: string): Promise<OsmData> {
  await acquireSlot();
  try {
    let lastError: unknown;
    for (let i = 0; i < ENDPOINTS.length; i++) {
      const index = (preferredEndpoint + i) % ENDPOINTS.length;
      const endpoint = ENDPOINTS[index];
      const url = `${endpoint.url}?data=${encodeURIComponent(query)}`;
      for (let attempt = 0; attempt < RETRIES_PER_ENDPOINT; attempt++) {
        try {
          const response = await fetch(url, {
            signal: AbortSignal.timeout(endpoint.timeoutMs),
          });
          if (response.status === 429 || response.status === 504) {
            // server is busy — wait briefly and retry the same endpoint
            lastError = new Error(
              `${endpoint.url} responded ${response.status} (busy)`
            );
            console.warn("Overpass endpoint busy, retrying", endpoint.url);
            await sleep(BUSY_RETRY_DELAY_MS);
            continue;
          }
          if (!response.ok) {
            throw new Error(
              `${endpoint.url} responded ${response.status} ${response.statusText}`
            );
          }
          const data = await response.json();
          preferredEndpoint = index;
          return data;
        } catch (error) {
          // network error or timeout — move on to the next endpoint
          console.warn("Overpass request failed, trying next endpoint", error);
          lastError = error;
          break;
        }
      }
    }
    throw new OverpassError(
      lastError instanceof Error ? lastError.message : String(lastError)
    );
  } finally {
    releaseSlot();
  }
}

const cache: { [key: string]: Promise<OsmData> } = {};

export function getOverpassApiData(
  boundsObj: LatLngBounds,
  overpassQuery: string
): Promise<OsmData> {
  const query = buildOverpassQuery(boundsObj, overpassQuery);
  if (!cache[query]) {
    cache[query] = fetchWithFallback(query).catch((error) => {
      // don't cache failures, so the query can be retried
      delete cache[query];
      throw error;
    });
  }
  return cache[query];
}
