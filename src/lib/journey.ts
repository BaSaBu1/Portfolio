// Build-time numbers and the static (no-JS / reduced-motion) view of the journey globe.
import { journey } from "../data/site";
import { createGlobe, legKm, type LonLat } from "./globe";

const stops = journey.map((s) => s.coords as LonLat);

export const legsKm = legKm(stops);
export const totalKm = legsKm.reduce((sum, km) => sum + km, 0);
export const formatKm = (km: number) => Math.round(km / 10) * 10;

// Overview: centred over northern Europe, where all four stops are on the visible side.
const globe = createGlobe(stops);
export const overview = globe.frame([-8, -60, 0], stops.length - 1);
