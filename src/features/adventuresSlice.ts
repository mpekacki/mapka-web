import { createSlice } from "@reduxjs/toolkit";
import type {
  PayloadAction,
  ThunkAction,
  UnknownAction,
} from "@reduxjs/toolkit";
import type { RootState } from "../store";
import {
  startAdventure,
  makeChoice,
  AdventureDefinition,
} from "../adventureEngine";
import { ADVENTURES } from "../exampleAdventures";
import { LatLng } from "leaflet";
import { getCurrentPosition } from "../geolocation";
import { OverpassError } from "../overpass";

export interface AdventuresState {
  availableAdventures: AdventureDefinition[];
  playerPosition: PlayerPosition | null;
  adventures: Id2Adventure;
  selectedAdventureId: string | null;
  shouldFitBounds: boolean;
  isManualLocation: boolean;
  // false while manual location is only on as the first-launch default;
  // once true, a geolocation fix no longer switches manual mode off
  hasUserToggledManualLocation: boolean;
  // user-facing message shown when a geolocation request fails
  geolocationError: string | null;
  loadingAdventures: string[];
  loadingProgress: { [adventureId: string]: LoadingProgress };
}

export interface LoadingProgress {
  done: number;
  total: number;
}

export interface Adventure {
  id: string;
  currentStep: Step;
  inventory: Inventory;
  biggestDistance: number;
  customStyles?: CustomStyles;
  // user-facing message set when the adventure failed to load
  error?: string;
}

export interface Step {
  id: string;
  text: string;
  choices: Choice[];
  markers: Marker[];
}

export interface Marker {
  id: string;
  label: string;
  latitude: number;
  longitude: number;
  visible: boolean;
}

interface Choice {
  id: string;
  text: string;
  markerId?: string;
  markerHidden?: boolean;
  distanceThreshold?: number;
  areRequirementsMet: boolean;
}

export interface Inventory {
  [key: string]: number;
}

export interface CustomStyles {
  [key: string]: string;
}

interface Id2Adventure {
  [id: string]: Adventure;
}

interface PlayerPosition {
  latitude: number;
  longitude: number;
}

export const DOWNTOWN_LONDON: PlayerPosition = {
  latitude: 51.5074,
  longitude: -0.1278,
};

export const defaultAdventuresState: AdventuresState = {
  availableAdventures: [...ADVENTURES],
  adventures: {},
  selectedAdventureId: null,
  playerPosition: DOWNTOWN_LONDON,
  shouldFitBounds: false,
  isManualLocation: true,
  hasUserToggledManualLocation: false,
  geolocationError: null,
  loadingAdventures: [],
  loadingProgress: {},
};

export const adventuresSlice = createSlice({
  name: "adventures",
  initialState: defaultAdventuresState,
  reducers: {
    setAvailableAdventures: (
      state,
      action: PayloadAction<AdventureDefinition[]>
    ) => {
      state.availableAdventures = action.payload;
    },
    addAvailableAdventure: (
      state,
      action: PayloadAction<AdventureDefinition>
    ) => {
      state.availableAdventures.push(action.payload);
    },
    adventureStarted: (state, action: PayloadAction<Adventure>) => {
      state.adventures[action.payload.id] = action.payload;
    },
    choiceSelected: (state, action: PayloadAction<Step>) => {
      if (state.selectedAdventureId) {
        state.adventures[state.selectedAdventureId].currentStep =
          action.payload;
        state.shouldFitBounds = true;
      }
    },
    setSelectedAdventureId: (state, action: PayloadAction<string | null>) => {
      state.selectedAdventureId = action.payload;
      state.shouldFitBounds = true;
    },
    deselectAdventure: (state, action: PayloadAction<string>) => {
      const adventureId = action.payload;
      if (adventureId === state.selectedAdventureId) {
        state.selectedAdventureId = null;
        state.shouldFitBounds = true;
      }
    },
    setPlayerPosition: (state, action: PayloadAction<PlayerPosition>) => {
      // a real geolocation fix while manual mode is only on as the
      // first-launch default means the user granted permission — switch
      // to the real location
      if (state.isManualLocation && !state.hasUserToggledManualLocation) {
        state.isManualLocation = false;
      }
      if (!state.isManualLocation) {
        state.playerPosition = action.payload;
      }
    },
    setPlayerPositionManually: (
      state,
      action: PayloadAction<PlayerPosition>
    ) => {
      state.playerPosition = action.payload;
    },
    setShouldFitBounds: (state, action: PayloadAction<boolean>) => {
      state.shouldFitBounds = action.payload;
    },
    setIsManualLocation: (state, action: PayloadAction<boolean>) => {
      state.isManualLocation = action.payload;
      state.hasUserToggledManualLocation = true;
    },
    setGeolocationError: (state, action: PayloadAction<string | null>) => {
      state.geolocationError = action.payload;
    },
    setInventory: (
      state,
      action: PayloadAction<{ inventory: Inventory; adventureId: string }>
    ) => {
      state.adventures[action.payload.adventureId].inventory =
        action.payload.inventory;
    },
    setAdventureAsLoading: (state, action: PayloadAction<string>) => {
      state.loadingAdventures.push(action.payload);
    },
    removeAdventureAsLoading: (state, action: PayloadAction<string>) => {
      state.loadingAdventures = state.loadingAdventures.filter(
        (id) => id !== action.payload
      );
      delete state.loadingProgress[action.payload];
    },
    setAdventureLoadingProgress: (
      state,
      action: PayloadAction<{ adventureId: string; progress: LoadingProgress }>
    ) => {
      state.loadingProgress[action.payload.adventureId] =
        action.payload.progress;
    },
  },
});

export const thunkStartAdventure = (
  adventureId: string,
  reload: boolean = false
): ThunkAction<void, RootState, unknown, UnknownAction> =>
  thunkStartAdventures([adventureId], reload, adventureId);

export const thunkStartAdventures =
  (
    adventureIds: string[],
    reload: boolean = false,
    selectedAdventureId: string | null = null
  ): ThunkAction<void, RootState, unknown, UnknownAction> =>
  async (dispatch, getState) => {
    adventureIds = adventureIds
      .filter(
        (adventureId) =>
          (reload || !getState().adventures.adventures[adventureId]) &&
          !isAdventureLoading(adventureId)(getState())
      )
      .map((adventureId) => {
        dispatch(setAdventureAsLoading(adventureId));
        return adventureId;
      });
    for (const adventureId of adventureIds) {
      dispatch(deselectAdventure(adventureId));
      const playerPosition = getState().adventures.playerPosition;
      if (!playerPosition) {
        throw new Error("Player position not set");
      }
      try {
        const adventureDefinition =
          getState().adventures.availableAdventures.find(
            (a) => a.id === adventureId
          );
        if (!adventureDefinition) {
          throw new Error(`Adventure ${adventureId} not found`);
        }
        const adventure = await startAdventure(
          adventureDefinition,
          playerPosition.latitude,
          playerPosition.longitude,
          (done, total) =>
            dispatch(
              setAdventureLoadingProgress({
                adventureId,
                progress: { done, total },
              })
            )
        );
        dispatch(
          adventureStarted({
            id: adventureId,
            currentStep: adventure.currentStep,
            inventory: adventure.inventory,
            biggestDistance: adventure.biggestDistance,
            customStyles: adventure.customStyles,
          })
        );
      } catch (e) {
        console.error(e);
        const error =
          e instanceof OverpassError
            ? "There was a problem with the Overpass map server. Please try again later."
            : typeof e === "string"
            ? e
            : "Failed to load the adventure. Please try again.";
        dispatch(
          adventureStarted({
            id: adventureId,
            currentStep: {
              id: "",
              text: "",
              choices: [],
              markers: [],
            },
            inventory: {},
            biggestDistance: 0,
            error,
          })
        );
      } finally {
        dispatch(removeAdventureAsLoading(adventureId));
      }
    }
    if (selectedAdventureId !== null) {
      dispatch(setSelectedAdventureId(selectedAdventureId));
    }
  };

export const thunkMakeChoice =
  (
    adventureId: string,
    stepId: string,
    choiceId: string
  ): ThunkAction<void, RootState, unknown, UnknownAction> =>
  async (dispatch, getState) => {
    const markers =
      getState().adventures.adventures[adventureId].currentStep.markers;
    const inventory = getState().adventures.adventures[adventureId].inventory;
    const adventureDefinition = getState().adventures.availableAdventures.find(
      (a) => a.id === adventureId
    );
    if (!adventureDefinition) {
      throw new Error(`Adventure ${adventureId} not found`);
    }
    const [step, newInventory] = makeChoice(
      adventureDefinition,
      stepId,
      choiceId,
      markers,
      inventory
    );
    dispatch(choiceSelected(step));
    dispatch(setInventory({ inventory: newInventory, adventureId }));
  };

const isPermissionDenied = (e: unknown): boolean =>
  typeof e === "object" &&
  e !== null &&
  "code" in e &&
  (e as GeolocationPositionError).code ===
    (e as GeolocationPositionError).PERMISSION_DENIED;

const geolocationErrorMessage = (e: unknown): string =>
  isPermissionDenied(e)
    ? "Location access is blocked for this site, so it was probably denied " +
      "before. To use your real location, open your browser's site " +
      "settings (usually behind the icon next to the address bar), allow " +
      "Location, and try again."
    : "Couldn't determine your location. Please check that location " +
      "services are enabled on your device and try again.";

export const thunkSetManualLocation =
  (isManual: boolean): ThunkAction<void, RootState, unknown, UnknownAction> =>
  async (dispatch) => {
    dispatch(setGeolocationError(null));
    dispatch(setIsManualLocation(isManual));
    if (isManual) {
      return;
    }
    // turning manual location off requires a real position; this triggers
    // the browser permission prompt if it wasn't granted before
    try {
      const position = await getCurrentPosition();
      dispatch(setPlayerPosition(position));
    } catch (e) {
      console.warn("Geolocation unavailable, keeping manual location", e);
      dispatch(setIsManualLocation(true));
      dispatch(setGeolocationError(geolocationErrorMessage(e)));
    }
  };

export const thunkLocateAndCenter =
  (): ThunkAction<void, RootState, unknown, UnknownAction> =>
  async (dispatch, getState) => {
    if (getState().adventures.isManualLocation) {
      dispatch(setShouldFitBounds(true));
    } else {
      dispatch(setShouldFitBounds(true));
      try {
        const position = await getCurrentPosition();
        dispatch(setPlayerPositionManually(position));
        dispatch(setShouldFitBounds(true));
      } catch (e) {
        console.warn("Geolocation unavailable", e);
        dispatch(setGeolocationError(geolocationErrorMessage(e)));
      }
    }
  };

export const {
  addAvailableAdventure,
  setPlayerPosition,
  adventureStarted,
  choiceSelected,
  setSelectedAdventureId,
  deselectAdventure,
  setShouldFitBounds,
  setIsManualLocation,
  setGeolocationError,
  setPlayerPositionManually,
  setInventory,
  setAdventureAsLoading,
  removeAdventureAsLoading,
  setAdventureLoadingProgress,
} = adventuresSlice.actions;

export const selectPlayerPosition = (state: RootState) =>
  state.adventures.playerPosition;

// the selected adventure may not be in `adventures` yet while its load is
// still in flight, so both selectors must tolerate a missing entry
export const selectMarkers = (state: RootState) =>
  state.adventures.selectedAdventureId
    ? state.adventures.adventures[state.adventures.selectedAdventureId]
        ?.currentStep.markers ?? []
    : [];

export const selectSelectedAdventure = (state: RootState) =>
  state.adventures.selectedAdventureId
    ? state.adventures.adventures[state.adventures.selectedAdventureId] ?? null
    : null;

export const selectShouldFitBounds = (state: RootState) =>
  state.adventures.shouldFitBounds;

export const selectIsManualLocation = (state: RootState) =>
  state.adventures.isManualLocation;

export const selectGeolocationError = (state: RootState) =>
  state.adventures.geolocationError;

export const isAlreadyStarted = (
  adventureId: string
): ((state: RootState) => boolean) => {
  return (state: RootState) => {
    return !!state.adventures.adventures[adventureId];
  };
};

export const getAdventure = (
  adventureId: string
): ((state: RootState) => Adventure) => {
  return (state: RootState) => {
    return state.adventures.adventures[adventureId];
  };
};

export const isAdventureLoading = (
  adventureId: string
): ((state: RootState) => boolean) => {
  return (state: RootState) => {
    return state.adventures.loadingAdventures.includes(adventureId);
  };
};

export const selectAdventureLoadingProgress = (
  adventureId: string
): ((state: RootState) => LoadingProgress | null) => {
  return (state: RootState) => {
    return state.adventures.loadingProgress[adventureId] ?? null;
  };
};

export const selectAvailableAdventures = (state: RootState) => {
  const playerLatLng = state.adventures.playerPosition
    ? new LatLng(
        state.adventures.playerPosition.latitude,
        state.adventures.playerPosition.longitude
      )
    : null;
  return state.adventures.availableAdventures.map((a) => {
    const adventure = Object.values(state.adventures.adventures).find(
      ({ id }) => id === a.id
    );
    const distances = adventure?.currentStep.markers.map((cur) =>
      playerLatLng
        ? Math.ceil(
            new LatLng(cur.latitude, cur.longitude).distanceTo(playerLatLng)
          )
        : 0
    ) || [0];
    return {
      id: a.id,
      title: a.title,
      description: a.description,
      closestDistance: distances.length ? Math.min(...distances) : 0,
      farthestDistance: distances.length ? Math.max(...distances) : 0,
      biggestDistance: adventure ? adventure.biggestDistance : 0,
      isLoading: isAdventureLoading(a.id)(state),
      error: adventure?.error,
    };
  });
};

export default adventuresSlice.reducer;
