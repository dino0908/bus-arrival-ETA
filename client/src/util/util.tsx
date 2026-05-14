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