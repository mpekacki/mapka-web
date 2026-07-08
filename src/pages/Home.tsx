import AdventureListItem from '../components/AdventureListItem';
import Fetcher from '../components/Fetcher';

import { useAppSelector, useAppDispatch } from '../hooks';
import {
  selectPlayerPosition,
  thunkStartAdventures,
  selectAvailableAdventures,
} from '../features/adventuresSlice';

const Home = () => {
  const adventures = useAppSelector(selectAvailableAdventures);
  const playerPosition = useAppSelector(selectPlayerPosition);
  const dispatch = useAppDispatch();

  const scan = () => {
    if (playerPosition) {
      dispatch(
        thunkStartAdventures(
          adventures.map((a) => a.id),
          true
        )
      );
    }
  };

  return (
    <div className="page">
      <header className="toolbar">
        <h1>Adventures</h1>
        <button className="button" onClick={scan}>
          Scan
        </button>
      </header>
      <main className="page-content">
        <div className="adventure-list">
          {adventures
            .sort((a, b) =>
              a.isLoading
                ? 1
                : b.isLoading
                ? -1
                : (a.farthestDistance || b.farthestDistance + 1) -
                  (b.farthestDistance || a.farthestDistance + 1)
            )
            .map((a) => (
              <AdventureListItem
                key={a.id}
                adventureId={a.id}
                adventureName={a.title}
                adventureDescription={a.description}
                closestDistance={a.closestDistance}
                farthestDistance={a.farthestDistance}
                biggestDistance={a.biggestDistance}
              />
            ))}
        </div>
        <Fetcher />
      </main>
    </div>
  );
};

export default Home;
