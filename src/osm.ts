import { Polygon, LatLng } from "leaflet";
import { OsmData, OsmElement, getOverpassApiData } from "./overpass";

function getBounds(lat: number, long: number, meters: number) {
  return new LatLng(lat, long).toBounds(meters);
}

export interface Place {
  lat: number;
  long: number;
  type: string;
  tags: {
    name: string;
  };
}

function getPlaces(
  lat: number,
  long: number,
  meters: number,
  overpassQuery: string
): Promise<OsmData> {
  var bounds = getBounds(lat, long, meters);
  return getOverpassApiData(bounds, overpassQuery);
}

export function loadAdventure(
  queries: string[],
  lat: number,
  lng: number,
  closeLat: number = lat,
  closeLong: number = lng
): Promise<Place[]> {
  return new Promise((resolve, reject) => {
    getPath(queries, 8000, lat, lng, 0, true, 1, false, [], resolve, reject, closeLat, closeLong);
  });
}

function getPath(
  placeList: string[],
  meters: number,
  lat: number,
  long: number,
  i = 0,
  chainMode = false,
  tempMultiplier = 1,
  renderImmediately = false,
  osmDatas: Place[],
  resolve: Function,
  reject: Function,
  closeLat: number = lat,
  closeLong: number = long
) {
  if (placeList.length > 0) {
    let place = placeList.shift() as string;
    let distance = meters * tempMultiplier;
    console.log(`distance=${distance}`);
    if (distance > 8000) {
      reject(`No places nearby (${place})`);
      return;
    }
    getPlaces(lat, long, distance, place)
      .then((osmDataAsJson) => {
        // filter only of type "node" or "way", but only if they have bounds
        osmDataAsJson.elements = osmDataAsJson.elements.filter((element) => {
          return (
            element.type === "node" ||
            (element.type === "way" && element.geometry)
          );
        });
        if (osmDataAsJson.elements.length > 0) {
          const closeDistance = 300;
          const mediumDistance = 1000;
          const placesByDistance = {
            close: [] as OsmElement[],
            medium: [] as OsmElement[],
            far: [] as OsmElement[],
          };
          osmDataAsJson.elements.forEach((element) => {
            if (element.type === "way") {
              const center = new Polygon([element.geometry])
                .getBounds()
                .getCenter();
              element.lat = center.lat;
              element.lon = center.lng;
            }
            const elementDistance = new LatLng(
              element.lat as number,
              element.lon as number
            ).distanceTo(new LatLng(closeLat, closeLong));
            // console.log("element:", element, "distance:", elementDistance);
            element.distance = elementDistance;
            if (elementDistance < closeDistance) {
              placesByDistance.close.push(element);
            } else if (elementDistance < mediumDistance) {
              placesByDistance.medium.push(element);
            } else {
              placesByDistance.far.push(element);
            }
          });
          // console.log("placesByDistance", placesByDistance);
          // console.log("places found: ", osmDataAsJson.elements);
          let elements;
          if (placesByDistance.close.length > 0) {
            elements = placesByDistance.close;
          } else if (placesByDistance.medium.length > 0) {
            elements = placesByDistance.medium;
          } else if (placesByDistance.far.length > 0) {
            elements = placesByDistance.far;
          } else {
            elements = osmDataAsJson.elements;
          }
          // get chosen element index
          let index = getRandomElementIndex(elements);
          let randomElement = elements[index];
          console.log(randomElement.tags);
          console.log(randomElement.distance);
          const placeLat = randomElement.lat;
          const placeLong = randomElement.lon;
          if (chainMode) {
            lat = placeLat as number;
            long = placeLong as number;
          }
          const placeObj = {
            lat: placeLat as number,
            long: placeLong as number,
            type: randomElement.type,
            tags: randomElement.tags,
          };
          osmDatas.push(placeObj);
          if (tempMultiplier > 1) {
            tempMultiplier = 1;
          }
        } else {
          console.log("no elements found for " + place);
          // reattach place to beggining of placeList
          placeList.unshift(place);
          tempMultiplier *= 2;
        }
        setTimeout(() => {
          getPath(
            placeList,
            meters,
            lat,
            long,
            i,
            chainMode,
            tempMultiplier,
            renderImmediately,
            osmDatas,
            resolve,
            reject
          );
        }, 50);
      })
      .catch((error) => {
        console.log("error:", error);
        reject(error);
      });
  } else {
    resolve(osmDatas);
  }
}

function getRandomElementIndex(array: any[]) {
  let indexArray = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < Math.pow(array.length - i, 1); j++) {
      indexArray.push(i);
    }
  }
  return indexArray[Math.floor(Math.random() * indexArray.length)];
}
