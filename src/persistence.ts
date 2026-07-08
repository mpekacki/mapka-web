import type { AdventuresState } from './features/adventuresSlice';

const STORAGE_KEY = 'adventures';

export function loadAdventuresState(): AdventuresState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AdventuresState) : null;
  } catch (e) {
    console.error('Failed to load saved state', e);
    return null;
  }
}

export function saveAdventuresState(state: AdventuresState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state', e);
  }
}
