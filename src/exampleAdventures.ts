import {
  AdventureDefinition,
  ComparisonOperator,
  InventoryOperation,
  Place,
  AdventureStep,
} from "./adventureEngine";

const places = {
  statue: "memorial=statue",
  monument: "historic=monument",
  church: "amenity=place_of_worship",
  museum: "tourism=museum",
  park: "leisure=park",
  zoo: "tourism=zoo",
  theatre: "amenity=theatre",
  library: "amenity=library",
  school: "amenity=school",
  university: "amenity=university",
  college: "amenity=college",
  convenienceStore: "shop=convenience",
  supermarket: "shop=supermarket",
  pharmacy: "amenity=pharmacy",
  bank: "amenity=bank",
  postOffice: "amenity=post_office",
  restaurant: "amenity=restaurant",
  cafe: "amenity=cafe",
  bar: "amenity=bar",
  pub: "amenity=pub",
  hotel: "tourism=hotel",
  railwayStation: "railway=station",
  memorial: "historic=memorial",
  fireStation: "amenity=fire_station",
  cemetery: "landuse=cemetery",
  townHall: "amenity=townhall",
  doctors: "amenity=doctors",
  waysideShrine: "historic=wayside_shrine",
  hairdresser: "shop=hairdresser",
  gasStation: "amenity=fuel",
  pitch: "leisure=pitch",
  touristAttraction: "tourism=attraction",
  monastery: "building=monastery",
  bookstore: "shop=books",
  castle: "historic=castle",
  artwork: "tourism=artwork",
};

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export const ADVENTURES: AdventureDefinition[] = [
  {
    id: "0",
    title: "Talking statue",
    description: "An unhappy statue comes to life",
    customStyles: {
      'font-family': 'Courier New',
      'color': 'lime',
      'background-color': 'black'
    },
    places: [
      {
        id: "statue",
        name: "The statue",
        osmQuery: `${places.statue}`,
      },
      {
        id: "store",
        name: "The store",
        osmQuery: `${places.supermarket}`,
        closeTo: "statue",
      },
      {
        id: "hotel",
        name: "The hotel",
        osmQuery: `${places.hotel}`,
        closeTo: "statue",
      },
    ],
    steps: [
      {
        id: "0",
        title: "Step 1",
        text: `# The *statue* is calling you\nYou should go\n\n${loremIpsum}\n\n![Orang](https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg)\n\n${loremIpsum}\n\n${loremIpsum}\n\n${loremIpsum}`,
        choices: [
          {
            id: "0",
            text: "Go to the statue",
            place: { id: "statue" },
            nextStepId: "1",
          },
        ],
      },
      {
        id: "1",
        title: "Step 2",
        text: "The statue says 'Bring me something to drink from that store!'",
        choices: [
          {
            id: "0",
            text: "Go to the store",
            nextStepId: "2",
            place: { id: "store" },
          },
          {
            id: "1",
            text: "Refuse",
            nextStepId: "5",
            place: { id: "statue" },
          },
        ],
      },
      {
        id: "2",
        title: "Step 3",
        text: "You buy the drink",
        inventoryModification: {
          drink: {
            operation: InventoryOperation.ADD,
            value: 1,
          },
        },
        choices: [
          {
            id: "0",
            text: "Go back to the statue",
            nextStepId: "3",
            place: { id: "statue" },
            inventoryCheck: {
              drink: {
                operator: ComparisonOperator.GREATER_THAN_OR_EQUAL,
                value: 1,
              },
            },
            inventoryModification: {
              drink: {
                operation: InventoryOperation.ADD,
                value: -1,
              },
            },
          },
        ],
      },
      {
        id: "3",
        title: "Step 4",
        text: "'Thank you', the statue says. 'Now I need to get some sleep. Go find me a hotel.'",
        choices: [
          {
            id: "0",
            text: "Go to the hotel",
            nextStepId: "4",
            place: { id: "hotel" },
          },
        ],
      },
      {
        id: "4",
        title: "Step 5",
        text: "You book the hotel for the statue",
        choices: [],
      },
      {
        id: "5",
        title: "Step 6",
        text: "The statue attacks you and kills you on the spot!",
        choices: [],
      },
    ],
  },
  {
    id: "1",
    title: "The park",
    description: "Just a walk",
    places: [
      {
        id: "park",
        name: "The park",
        osmQuery: `${places.park}`,
      },
      {
        id: "store",
        name: "The store",
        osmQuery: `${places.convenienceStore}`,
        closeTo: "park",
      },
      {
        id: "cafe",
        name: "The cafe",
        osmQuery: `${places.cafe}`,
        closeTo: "store",
      },
    ],
    steps: [
      {
        id: "0",
        title: "Step 1",
        text: "You decide to have a walk in the park",
        choices: [
          {
            id: "0",
            text: "Go to the park",
            place: { id: "park" },
            nextStepId: "1",
          },
        ],
      },
      {
        id: "1",
        title: "Step 2",
        text: "You go to the store",
        choices: [
          {
            id: "0",
            text: "Go to the store",
            nextStepId: "2",
            place: { id: "store" },
          },
        ],
      },
      {
        id: "2",
        title: "Step 3",
        text: "You leave the store",
        choices: [
          {
            id: "0",
            text: "Go to the cafe",
            nextStepId: "3",
            place: { id: "cafe" },
          },
        ],
      },
      {
        id: "3",
        title: "Step 4",
        text: "You leave the cafe",
        choices: [],
      },
    ],
  },
];

export function generateRandomAdventures(
  count: number,
  numberOfPlaces: number
): AdventureDefinition[] {
  console.log(`Generating ${count} random adventures`);
  const adventures = [];
  for (let i = 0; i < count; i++) {
    const adventure = generateRandomAdventure(numberOfPlaces);
    adventures.push(adventure);
  }
  return adventures;
}

function generateRandomAdventure(numberOfPlaces: number): AdventureDefinition {
  console.log(`Generating adventure with ${numberOfPlaces} places`);
  const randomOsmQueries: [string, string][] = [];
  while (randomOsmQueries.length < numberOfPlaces) {
    const randomOsmQuery =
      Object.entries(places)[
      Math.floor(Math.random() * Object.entries(places).length)
      ];
    if (!randomOsmQueries.some(([, query]) => query === randomOsmQuery[1])) {
      randomOsmQueries.push(randomOsmQuery);
    }
  }
  const randomPlaces: Place[] = randomOsmQueries.map(([key, query], index) => ({
    id: key,
    name: key,
    osmQuery: query,
    closeTo: index === 0 ? undefined : randomOsmQueries[index - 1][0],
  }));
  const steps: AdventureStep[] = randomPlaces.map((place, index) => ({
    id: (index + 1).toString(),
    title: place.name,
    text: `You are at ${place.name}. ${loremIpsum}`,
    choices: randomPlaces
      .map((_, index2) => ({
        id: index2.toString(),
        text: `Go to ${randomPlaces[index2].name}`,
        nextStepId: (index2 + 1).toString(),
        place: { id: randomPlaces[index2].id },
      }))
      .filter((_, index3) => index3 !== index),
  }));
  steps.unshift({
    id: "0",
    title: "Start",
    text: `You are at the start. ${loremIpsum} ${loremIpsum} ${loremIpsum} ${loremIpsum} ${loremIpsum} ${loremIpsum}`,
    choices: randomPlaces.map((_, index2) => ({
      id: index2.toString(),
      text: `Go to ${randomPlaces[index2].name}`,
      nextStepId: (index2 + 1).toString(),
      place: { id: randomPlaces[index2].id, hidden: Math.random() < 0.1 },
    })),
  });
  const adventure: AdventureDefinition = {
    id: randomPlaces.map((p) => p.id).join("-"),
    title: `Random: ${randomPlaces.map((p) => p.name).join("-")}`,
    description: randomPlaces.map((p) => p.name).join("-"),
    places: randomPlaces,
    steps: steps,
  };
  console.log(adventure);
  return adventure;
}
