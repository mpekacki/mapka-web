import { configureStore } from '@reduxjs/toolkit';
import adventuresReducer, {
  defaultAdventuresState,
} from './features/adventuresSlice';
import { loadAdventuresState, saveAdventuresState } from './persistence';

const persisted = loadAdventuresState();

// always include the current built-in adventures, but keep any extra
// (imported or generated) adventures the user has saved
const mergedAvailableAdventures = persisted
  ? [
      ...defaultAdventuresState.availableAdventures,
      ...(persisted.availableAdventures ?? []).filter(
        (a) =>
          !defaultAdventuresState.availableAdventures.some(
            (d) => d.id === a.id
          )
      ),
    ]
  : defaultAdventuresState.availableAdventures;

export const store = configureStore({
  reducer: {
    adventures: adventuresReducer,
  },
  preloadedState: {
    adventures: persisted
      ? {
          ...defaultAdventuresState,
          ...persisted,
          availableAdventures: mergedAvailableAdventures,
          loadingAdventures: [],
          loadingProgress: {},
          geolocationError: null,
        }
      : defaultAdventuresState,
  },
});

store.subscribe(() => saveAdventuresState(store.getState().adventures));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
