export interface Coordinates {
  latitude: number;
  longitude: number;
}

const options: PositionOptions = {
  enableHighAccuracy: true,
  maximumAge: 5000,
};

export function watchPosition(
  onPosition: (coords: Coordinates) => void
): () => void {
  if (!('geolocation' in navigator)) {
    console.warn('Geolocation is not available in this browser');
    return () => {};
  }
  const watchId = navigator.geolocation.watchPosition(
    (position) =>
      onPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }),
    (error) => console.error('Geolocation error', error),
    options
  );
  return () => navigator.geolocation.clearWatch(watchId);
}

export function getCurrentPosition(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      reject,
      options
    );
  });
}
