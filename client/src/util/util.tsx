/** Colour-codes bus ETA: arriving (≤3), soon (≤7), later */
export function etaColor(eta: number) {
  if (eta <= 3) return "error";
  if (eta <= 7) return "success";
  return "default";
}

/** Colour-codes carpark availability percentage */
export function availColor(pct: number) {
  if (pct > 25) return "success";
  if (pct > 10) return "warning";
  return "error";
}

export function etaMins(iso: string) {
  return iso
    ? Math.max(0, Math.round((new Date(iso).getTime() - Date.now()) / 60000))
    : null;
}


// Haversine formula to calculate distance in kilometers (for nearby bus stops)
export const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

export const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};