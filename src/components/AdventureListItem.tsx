import { Link } from 'react-router-dom';
import { ChevronRightIcon } from './icons';

import { useAppSelector } from '../hooks';
import {
  isAlreadyStarted,
  isAdventureLoading,
} from '../features/adventuresSlice';

interface AdventureListItemProps {
  adventureId: string;
  adventureName: string;
  adventureDescription: string;
  closestDistance: number;
  farthestDistance: number;
  biggestDistance: number;
}

const AdventureListItem = ({
  adventureId,
  adventureName,
  adventureDescription,
  closestDistance,
  farthestDistance,
  biggestDistance,
}: AdventureListItemProps) => {
  const isStarted = useAppSelector(isAlreadyStarted(adventureId));
  const isLoading = useAppSelector(isAdventureLoading(adventureId));

  return (
    <Link
      to={`/adventure/${adventureId}`}
      className={`adventure-item${isLoading ? ' adventure-item-disabled' : ''}`}
      onClick={(e) => isLoading && e.preventDefault()}
    >
      <div
        className={
          isStarted
            ? farthestDistance !== 0
              ? 'dot dot-unread'
              : 'dot dot-failed'
            : 'dot'
        }
      ></div>
      <div className="adventure-item-body">
        <h2>{adventureName}</h2>
        <p>
          {adventureDescription}{' '}
          {farthestDistance ? (
            <span className="badge">
              {closestDistance} - {farthestDistance} m
            </span>
          ) : null}{' '}
          {biggestDistance ? (
            <span className="badge badge-danger">{biggestDistance} m</span>
          ) : null}
        </p>
      </div>
      {isLoading ? (
        <div className="spinner" />
      ) : (
        <span className="chevron">
          <ChevronRightIcon />
        </span>
      )}
    </Link>
  );
};

export default AdventureListItem;
