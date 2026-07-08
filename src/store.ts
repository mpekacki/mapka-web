import { configureStore } from '@reduxjs/toolkit';
import adventuresReducer, {
  defaultAdventuresState,
} from './features/adventuresSlice';
import { loadAdventuresState, saveAdventuresState } from './persistence';

const persisted = loadAdventuresState();

export const store = configureStore({
  reducer: {
    adventures: adventuresReducer,
  },
  preloadedState: {
    adventures: persisted
      ? { ...defaultAdventuresState, ...persisted, loadingAdventures: [] }
      : defaultAdventuresState,
  },
});

store.subscribe(() => saveAdventuresState(store.getState().adventures));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
