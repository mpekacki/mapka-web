import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import Map from '../components/Map';
import GamePrompt from '../components/GamePrompt';
import BottomSheet from '../components/BottomSheet';

import { useAppDispatch, useAppSelector } from '../hooks';
import {
  thunkStartAdventure,
  thunkLocateAndCenter,
  selectPlayerPosition,
  setIsManualLocation,
  selectIsManualLocation,
  getAdventure,
  isAdventureLoading,
} from '../features/adventuresSlice';

function AdventureView() {
  const params = useParams<{ id: string }>();
  const adventureId = params.id!;
  const dispatch = useAppDispatch();
  const playerPosition = useAppSelector(selectPlayerPosition);
  const [alreadyStarted, setAlreadyStarted] = useState(false);
  const isLoading = useAppSelector(isAdventureLoading(adventureId));
  const adventure = useAppSelector(getAdventure(adventureId));
  const isManualLocation = useAppSelector(selectIsManualLocation);

  useEffect(() => {
    if (playerPosition && !alreadyStarted) {
      setAlreadyStarted(true);
      dispatch(thunkStartAdventure(adventureId));
    }
  }, [dispatch, adventureId, playerPosition, alreadyStarted]);

  const onClickReload = () => {
    if (
      window.confirm(
        'Are you sure you want to reload this adventure? All progress will be lost.'
      )
    ) {
      dispatch(thunkStartAdventure(adventure.id, true));
    }
  };

  return (
    <div className="page">
      <header className="toolbar">
        <Link to="/" className="button button-clear" aria-label="Back">
          ←
        </Link>
        <div className="toolbar-actions">
          <label className="toggle-label">
            Manual location
            <input
              type="checkbox"
              className="toggle"
              checked={isManualLocation}
              onChange={(e) => dispatch(setIsManualLocation(e.target.checked))}
            />
          </label>
          <button
            className="button button-clear"
            aria-label="Reload adventure"
            onClick={onClickReload}
          >
            ⟳
          </button>
          <button
            className="button button-clear"
            aria-label="Locate me"
            onClick={() => dispatch(thunkLocateAndCenter())}
          >
            ◎
          </button>
        </div>
      </header>
      <main className="map-area">
        <Map />
        <BottomSheet snapPoints={[0.12, 0.24, 0.45, 0.92]} initialSnap={1}>
          <GamePrompt />
        </BottomSheet>
        {isLoading && (
          <div className="loading-overlay">
            <div className="spinner" />
            <p>Loading adventure...</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdventureView;
