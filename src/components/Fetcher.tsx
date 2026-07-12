import { useState } from 'react';
import { addAvailableAdventure } from '../features/adventuresSlice';
import { useAppDispatch } from '../hooks';
import { AdventureDefinition } from '../adventureEngine';

const Fetcher = () => {
  const [url, setUrl] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const dispatch = useAppDispatch();
  const fetchAdventure = (urlString: string) => {
    const url = new URL(urlString);
    fetch(url.href)
      .then((res) => res.json())
      .then((data) => {
        const adventures: { adventures: AdventureDefinition[] } = data;
        adventures.adventures.forEach((adventure) => {
          dispatch(addAvailableAdventure(adventure));
        });
        setUrl('');
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="fetcher">
      {isClicked ? (
        <>
          <input
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button className="button" onClick={() => fetchAdventure(url)}>
            Fetch
          </button>
        </>
      ) : (
        <button className="button" onClick={() => setIsClicked(true)}>
          Import
        </button>
      )}
    </div>
  );
};

export default Fetcher;
