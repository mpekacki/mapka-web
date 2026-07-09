import { Link } from 'react-router-dom';
import { ChevronRightIcon } from './icons';

import { useAppSelector } from '../hooks';
import {
  isAlreadyStarted,
  isAdventureLoading,
  selectAdventureLoadingProgress,
} from '../features/adventuresSlice';

interface AdventureListItemProps {
  adventureId: string;
  adventureName: string;
  adventureDescription: string;
  closestDistance: number;
  farthestDistance: number;
  biggestDistance: number;
  error?: string;
}

const AdventureListItem = ({
  adventureId,
  adventureName,
  adventureDescription,
  closestDistance,
  farthestDistance,
  biggestDistance,
  error,
}: AdventureListItemProps) => {
  const isStarted = useAppSelector(isAlreadyStarted(adventureId));
  const isLoading = useAppSelector(isAdventureLoading(adventureId));
  const loadingProgress = useAppSelector(
    selectAdventureLoadingProgress(adventureId)
  );

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
        {error && !isLoading ? (
          <p className="adventure-item-error">{error}</p>
        ) : null}
      </div>
      {isLoading ? (
        <div className="loading-progress">
          {loadingProgress && loadingProgress.total > 0 && (
            <span className="progress-label">
              {loadingProgress.done}/{loadingProgress.total}
            </span>
          )}
          <div className="spinner" />
        </div>
      ) : (
        <span className="chevron">
          <ChevronRightIcon />
        </span>
      )}
    </Link>
  );
};

export default AdventureListItem;
