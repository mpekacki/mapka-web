import 'leaflet/dist/leaflet.css';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Tooltip,
  useMapEvents,
} from 'react-leaflet';
import { Icon, LatLngBounds } from 'leaflet';
import markerIconUrl from 'leaflet/dist/images/marker-icon.png';
import markerIcon2xUrl from 'leaflet/dist/images/marker-icon-2x.png';

import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../hooks';
import {
  selectPlayerPosition,
  selectMarkers,
  Marker as MyMarker,
  selectShouldFitBounds,
  setShouldFitBounds,
  setPlayerPositionManually,
  selectIsManualLocation,
} from '../features/adventuresSlice';

const ResizeMap = () => {
  // hack for fixing map not showing on initial load
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => map.invalidateSize(), 100);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
};

const FitBounds = (props: { markers: MyMarker[] }) => {
  const map = useMap();
  const dispatch = useAppDispatch();
  const shouldFitBounds = useAppSelector(selectShouldFitBounds);
  const { markers } = props;
  useEffect(() => {
    if (!shouldFitBounds || markers.length === 0) {
      return;
    }
    const bounds = new LatLngBounds(
      markers.map((m) => [m.latitude, m.longitude])
    );
    const timer = setTimeout(() => {
      map.fitBounds(bounds, {
        paddingBottomRight: [50, 220], // lower portion of the map is usually covered by the bottom sheet
        paddingTopLeft: [50, 50],
        maxZoom: 17,
      });
      // reset the flag only after the fit has actually run, so re-renders
      // in the meantime can't cancel it
      dispatch(setShouldFitBounds(false));
    }, 100);
    return () => clearTimeout(timer);
    // markers gets a new identity every render; depend on the count so a
    // pending fit isn't restarted by unrelated re-renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFitBounds, markers.length, map, dispatch]);
  return null;
};

const MapEvents = () => {
  const dispatch = useAppDispatch();
  const isManualLocation = useAppSelector(selectIsManualLocation);
  useMapEvents({
    click: (e) => {
      if (isManualLocation) {
        dispatch(
          setPlayerPositionManually({
            latitude: e.latlng.lat,
            longitude: e.latlng.lng,
          })
        );
      }
    },
  });
  return null;
};

const icon = new Icon({
  iconUrl: markerIconUrl,
  iconRetinaUrl: markerIcon2xUrl,
  iconSize: [25, 41],
});

const containerStyle = {
  height: '100%',
};

const Map = () => {
  const markers = useAppSelector(selectMarkers).filter((m) => m.visible);
  const playerPosition = useAppSelector(selectPlayerPosition);
  if (playerPosition) {
    markers.push({
      id: 'player',
      latitude: playerPosition.latitude,
      longitude: playerPosition.longitude,
      label: 'You',
      visible: true,
    });
  }
  return (
    <MapContainer style={containerStyle} center={[51.505, -0.09]} zoom={13}>
      <ResizeMap />
      <MapEvents />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        noWrap={true}
        detectRetina={window.devicePixelRatio > 1}
      />
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={[marker.latitude, marker.longitude]}
          icon={icon}
        >
          <Tooltip permanent={true} direction="top">
            {marker.label}
          </Tooltip>
        </Marker>
      ))}
      <FitBounds markers={markers} />
    </MapContainer>
  );
};

export default Map;
