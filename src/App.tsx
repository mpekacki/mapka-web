import { useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AdventureView from './pages/AdventureView';

import { useAppDispatch } from './hooks';
import { setPlayerPosition } from './features/adventuresSlice';
import { watchPosition } from './geolocation';

const PositionWatcher = () => {
  const dispatch = useAppDispatch();
  useEffect(
    () => watchPosition((coords) => dispatch(setPlayerPosition(coords))),
    [dispatch]
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
