import { useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AdventureView from './pages/AdventureView';

import { useAppDispatch, useAppSelector } from './hooks';
import {
  setPlayerPosition,
  selectIsManualLocation,
} from './features/adventuresSlice';
import { watchPosition } from './geolocation';

const PositionWatcher = () => {
  const dispatch = useAppDispatch();
  const isManualLocation = useAppSelector(selectIsManualLocation);
  // re-subscribe when manual mode changes: a watch started while permission
  // was denied stays dead, so a fresh one is needed once the user grants it
  useEffect(
    () => watchPosition((coords) => dispatch(setPlayerPosition(coords))),
    [dispatch, isManualLocation]
  );
  return null;
};

const App = () => (
  <>
    <PositionWatcher />
    {/* HashRouter so deep links survive reloads on GitHub Pages */}
    <HashRouter>
      <Routes>
        <Route path="/adventure/:id" element={<AdventureView />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  </>
);

export default App;
