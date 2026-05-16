import { useState, useEffect } from 'react';

export function useGeolocation() {
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    const handleSuccess = (pos: any) => {
      setPosition({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
      setLoading(false);
    };

    const handleError = (err: any) => {
      setError(err.message);
      setLoading(false);
    };

    // Request the user's location
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy: true, // Requests the best possible results
      timeout: 5000,            // Time to wait before timing out (5s)
      maximumAge: 0             // Forces the browser to get a fresh position
    });
  }, []);

  return { position, error, loading };
}