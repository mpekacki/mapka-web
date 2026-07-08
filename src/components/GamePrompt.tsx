import { LatLng } from 'leaflet';
import ReactMarkdown from 'react-markdown';

import { useAppSelector, useAppDispatch } from '../hooks';
import {
  selectMarkers,
  selectPlayerPosition,
  selectSelectedAdventure,
  thunkMakeChoice,
  Adventure,
  CustomStyles,
} from '../features/adventuresSlice';

import { calculateBearing } from '../bearing';

// custom styles in adventure definitions use CSS property names ("font-family");
// React style objects want camelCase ("fontFamily")
const toReactStyles = (styles?: CustomStyles) =>
  styles
    ? Object.fromEntries(
        Object.entries(styles).map(([key, value]) => [
          key.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase()),
          value,
        ])
      )
    : undefined;

const GamePrompt = () => {
  const dispatch = useAppDispatch();
  const adventure: Adventure = useAppSelector(selectSelectedAdventure) ?? {
    id: '',
    currentStep: {
      id: '',
      text: '',
      choices: [],
      markers: [],
    },
    inventory: {},
    biggestDistance: 0,
  };
  const markers = useAppSelector(selectMarkers);
  const playerPosition = useAppSelector(selectPlayerPosition);
  return (
    <>
      <div className="prompt-text" style={toReactStyles(adventure.customStyles)}>
        <ReactMarkdown>{adventure.currentStep.text}</ReactMarkdown>
      </div>
      <ul className="choice-list">
        {adventure.currentStep.choices.map((choice, index) => {
          const marker = markers.find((m) => m.id === choice.markerId);
          let distance;
          // choices without a marker are gated only by inventory requirements
          let isActive = choice.areRequirementsMet;
          let bearingIcon;
          if (marker && playerPosition) {
            distance = new LatLng(
              playerPosition.latitude,
              playerPosition.longitude
            ).distanceTo(new LatLng(marker.latitude, marker.longitude));
            isActive =
              distance <= (choice.distanceThreshold || 50) &&
              choice.areRequirementsMet;
            bearingIcon = getBearingIcon(
              calculateBearing(
                playerPosition.latitude,
                playerPosition.longitude,
                marker.latitude,
                marker.longitude
              )
            );
          }
          return (
            <li key={choice.id}>
              <button
                className="choice-button"
                disabled={!isActive}
                onClick={() =>
                  dispatch(
                    thunkMakeChoice(
                      adventure.id,
                      adventure.currentStep.id,
                      choice.id
                    )
                  )
                }
              >
                <span>
                  {index + 1}. {!choice.areRequirementsMet && '(UNAVAILABLE) '}
                  {choice.text}
                </span>
                {distance && (!isActive || choice.markerHidden) ? (
                  <span className="choice-meta">
                    {choice.markerHidden && !isActive ? '???' : marker?.label}
                    {' · '}
                    {Math.ceil(distance)} m
                    {bearingIcon ? ` ${bearingIcon}` : ''}
                  </span>
                ) : null}
              </button>
            </li>
          );
        })}
        {adventure.currentStep.choices.length === 0 && (
          <li className="the-end">THE END</li>
        )}
      </ul>
      {Object.keys(adventure.inventory).length > 0 && (
        <div className="inventory">
          <h3>Inventory</h3>
          <ul>
            {Object.entries(adventure.inventory).map(([key, value]) => (
              <li key={key}>
                <span>{key}</span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

function getBearingIcon(degrees: number) {
  const westArrow = '←',
    northwestArrow = '↖',
    northArrow = '↑',
    northeastArrow = '↗',
    eastArrow = '→',
    southeastArrow = '↘',
    southArrow = '↓',
    southwestArrow = '↙';
  return degrees >= 337.5 || degrees < 22.5
    ? northArrow
    : degrees >= 22.5 && degrees < 67.5
    ? northeastArrow
    : degrees >= 67.5 && degrees < 112.5
    ? eastArrow
    : degrees >= 112.5 && degrees < 157.5
    ? southeastArrow
    : degrees >= 157.5 && degrees < 202.5
    ? southArrow
    : degrees >= 202.5 && degrees < 247.5
    ? southwestArrow
    : degrees >= 247.5 && degrees < 292.5
    ? westArrow
    : northwestArrow;
}

export default GamePrompt;
