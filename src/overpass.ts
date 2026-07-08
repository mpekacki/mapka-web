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

// Public Overpass instances, tried in order until one answers.
// See https://wiki.openstreetmap.org/wiki/Overpass_API#Public_Overpass_API_instances
// (overpass.kumi.systems was handed over to private.coffee and is unreliable,
// so it is kept only as a last resort.)
const ENDPOINTS = [
  "https://overpass-api.de/api/interpreter",
  "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
  "https://overpass.private.coffee/api/interpreter",
];

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
  let lastError: unknown;
  for (let i = 0; i < ENDPOINTS.length; i++) {
    const index = (preferredEndpoint + i) % ENDPOINTS.length;
    const endpoint = ENDPOINTS[index];
    const url = `${endpoint}?data=${encodeURIComponent(query)}`;
    try {
      const response = await fetch(url, {
        // the query itself times out at 15 s, so give the server a bit more
        signal: AbortSignal.timeout(20_000),
      });
      if (!response.ok) {
        throw new Error(
          `${endpoint} responded ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      preferredEndpoint = index;
      return data;
    } catch (error) {
      console.warn("Overpass request failed, trying next endpoint", error);
      lastError = error;
    }
  }
  throw lastError;
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
