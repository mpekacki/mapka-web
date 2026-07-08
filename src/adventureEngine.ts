import { Marker, Adventure, Step, Inventory, CustomStyles } from "./features/adventuresSlice";
import { loadAdventure } from "./osm";
import { LatLng } from "leaflet";

interface AdventureChoice {
  id: string;
  text: string;
  place?: {
    id: string;
    hidden?: boolean;
  }
  distanceThreshold?: number;
  nextStepId?: string;
  inventoryCheck?: InventoryCheck;
  inventoryModification?: InventoryModification;
}

export interface AdventureStep {
  id: string;
  title: string;
  text: string;
  choices: AdventureChoice[];
  inventoryModification?: InventoryModification;
}

export interface Place {
  id: string;
  name: string;
  osmQuery: string;
  closeTo?: string;
}

export interface AdventureDefinition {
  id: string;
  title: string;
  description: string;
  places: Place[];
  steps: AdventureStep[];
  customStyles?: CustomStyles;
}

export enum InventoryOperation {
  ADD,
  SET,
}

interface InventoryModification {
  [key: string]: {
    operation: InventoryOperation;
    value: number;
  };
}

export enum ComparisonOperator {
  EQUAL = "=",
  NOT_EQUAL = "!=",
  GREATER_THAN = ">",
  LESS_THAN = "<",
  GREATER_THAN_OR_EQUAL = ">=",
  LESS_THAN_OR_EQUAL = "<=",
}

interface InventoryCheck {
  [key: string]: {
    operator: ComparisonOperator;
    value: number;
  };
}

export const startAdventure = async (
  adventure: AdventureDefinition,
  initialLatitude: number,
  initialLongitude: number
): Promise<Adventure> => {
  const firstStep = adventure.steps[0];
  const placeIdToMarker: { [placeId: string]: Marker } = {};
  while (Object.keys(placeIdToMarker).length < adventure.places.length) {
    const places = adventure.places.filter(
      (p) =>
        !placeIdToMarker[p.id] &&
        (p.closeTo === undefined || placeIdToMarker[p.closeTo])
    );
    await Promise.all(
      places.map(async (place) => {
        const lat =
          place.closeTo === undefined
            ? initialLatitude
            : placeIdToMarker[place.closeTo].latitude;
        const lon =
          place.closeTo === undefined
            ? initialLongitude
            : placeIdToMarker[place.closeTo].longitude;
        const osmData = (
          await loadAdventure(
            [place.osmQuery],
            initialLatitude,
            initialLongitude,
            lat,
            lon
          )
        )[0];
        const marker = {
          id: place.id,
          label: osmData.tags.name ?? place.osmQuery.split("=")[1],
          latitude: osmData.lat,
          longitude: osmData.long,
          visible: true,
        };
        placeIdToMarker[place.id] = marker;
      })
    );
  }
  const markers: Marker[] = Object.values(placeIdToMarker);
  const inventory = firstStep.inventoryModification
    ? Object.fromEntries(
      Object.entries(firstStep.inventoryModification).map(([key, value]) => [
        key,
        value.value,
      ])
    )
    : {};
  const choices = firstStep.choices.map((c) => ({
    id: c.id,
    text: c.text,
    markerId: markers.find((m) => m.id === c.place?.id)?.id as string,
    markerHidden: c.place?.hidden,
    distanceThreshold: c.distanceThreshold,
    inventoryCheck: c.inventoryCheck,
  }));
  const distance = (m1: Marker, m2: Marker) =>
    new LatLng(m1.latitude, m1.longitude).distanceTo(
      new LatLng(m2.latitude, m2.longitude)
    );
  return {
    id: adventure.id,
    currentStep: {
      id: firstStep.id,
      text: firstStep.text,
      choices: choices.map((c) => ({
        ...c,
        areRequirementsMet: c.inventoryCheck
          ? checkInventory(inventory, c.inventoryCheck)
          : true,
      })),
      markers: markers.map((m) => ({
        ...m,
        visible: choices.some((c) => c.markerId === m.id && !c.markerHidden),
      })),
    },
    inventory: inventory,
    biggestDistance: Math.ceil(
      Math.max(
        ...markers.map((m, i) =>
          Math.max(...markers.slice(i + 1).map((n) => distance(m, n)))
        )
      )
    ),
    customStyles: adventure.customStyles
  };
};

export const makeChoice = (
  adventure: AdventureDefinition,
  stepId: string,
  choiceId: string,
  markers: Marker[],
  inventory: Inventory
): [Step, Inventory] => {
  const step = adventure.steps.find((s) => s.id === stepId);
  if (!step) {
    throw new Error(`Step with id ${stepId} not found`);
  }
  const choice = step.choices.find((c) => c.id === choiceId);
  if (!choice) {
    throw new Error(`Choice with id ${choiceId} not found`);
  }
  const nextStep = adventure.steps.find((s) => s.id === choice.nextStepId);
  if (!nextStep) {
    throw new Error(`Next step with id ${choice.nextStepId} not found`);
  }
  const choices = nextStep.choices.map((c) => ({
    id: c.id,
    text: c.text,
    markerId: markers.find((m) => m.id === c.place?.id)?.id as string,
    distanceThreshold: c.distanceThreshold,
    inventoryCheck: c.inventoryCheck,
  }));
  if (choice.inventoryModification) {
    inventory = applyInventoryModification(
      inventory,
      choice.inventoryModification
    );
  }
  if (nextStep.inventoryModification) {
    inventory = applyInventoryModification(
      inventory,
      nextStep.inventoryModification
    );
  }
  return [
    {
      id: nextStep.id,
      text: nextStep.text,
      choices: choices.map((c) => ({
        ...c,
        areRequirementsMet: c.inventoryCheck
          ? checkInventory(inventory, c.inventoryCheck)
          : true,
      })),
      markers: markers.map((m) => ({
        ...m,
        visible: choices.some((c) => c.markerId === m.id),
      })),
    },
    inventory,
  ];
};

function applyInventoryModification(
  inventory: Inventory,
  modification: InventoryModification
): Inventory {
  const newInventory = { ...inventory };
  Object.entries(modification).forEach(([key, value]) => {
    switch (value.operation) {
      case InventoryOperation.ADD:
        newInventory[key] = (newInventory[key] || 0) + value.value;
        break;
      case InventoryOperation.SET:
        newInventory[key] = value.value;
        break;
    }
    if (newInventory[key] <= 0) {
      delete newInventory[key];
    }
  });
  return newInventory;
}

function checkInventory(inventory: Inventory, check: InventoryCheck): boolean {
  return Object.entries(check).every(([key, value]) => {
    switch (value.operator) {
      case ComparisonOperator.EQUAL:
        return inventory[key] === value.value;
      case ComparisonOperator.NOT_EQUAL:
        return inventory[key] !== value.value;
      case ComparisonOperator.GREATER_THAN:
        return inventory[key] > value.value;
      case ComparisonOperator.GREATER_THAN_OR_EQUAL:
        return inventory[key] >= value.value;
      case ComparisonOperator.LESS_THAN:
        return inventory[key] < value.value;
      case ComparisonOperator.LESS_THAN_OR_EQUAL:
        return inventory[key] <= value.value;
    }
    return true;
  });
}
