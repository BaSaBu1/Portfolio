// Orthographic globe geometry, shared by the build (static fallback) and the browser
// (scroll-driven rotation, loaded lazily).
import { geoDistance, geoGraticule, geoInterpolate, geoOrthographic, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import land110 from "world-atlas/land-110m.json";

export type LonLat = [number, number];

export const SIZE = 600;
const RADIUS = SIZE / 2 - 4;
// Look slightly north of the traveller so the high-latitude arcs stay in view.
const TILT = 14;

// world-atlas ships untyped TopoJSON
const topology = land110 as any;
const land = feature(topology, topology.objects.land);
const graticule = geoGraticule().step([15, 15])();

const clamp = (t: number) => Math.min(1, Math.max(0, t));

export interface GlobeFrame {
    land: string;
    graticule: string;
    route: string;
    legs: string[];
    pins: { x: number; y: number; visible: boolean }[];
}

export function createGlobe(stops: LonLat[]) {
    const projection = geoOrthographic()
        .scale(RADIUS)
        .translate([SIZE / 2, SIZE / 2])
        .clipAngle(90)
        .precision(0.6);
    const path = geoPath(projection).digits(1);
    const legs = stops.slice(1).map((to, i) => geoInterpolate(stops[i], to));

    // p runs from 0 (first stop) to stops.length - 1 (last stop)
    function rotationAt(p: number): [number, number, number] {
        const i = Math.min(legs.length - 1, Math.max(0, Math.floor(p)));
        const [lon, lat] = legs[i](clamp(p - i));
        return [-lon, -(lat + TILT), 0];
    }

    function frame(rotation: [number, number, number], p: number): GlobeFrame {
        projection.rotate(rotation);
        const center: LonLat = [-rotation[0], -rotation[1]];
        return {
            land: path(land) ?? "",
            graticule: path(graticule) ?? "",
            route: path({ type: "LineString", coordinates: stops }) ?? "",
            legs: legs.map((leg, i) => {
                const t = clamp(p - i);
                if (t <= 0) return "";
                return path({ type: "LineString", coordinates: [stops[i], leg(t)] }) ?? "";
            }),
            pins: stops.map((s) => {
                const [x, y] = projection(s) ?? [0, 0];
                return {
                    x: (x / SIZE) * 100,
                    y: (y / SIZE) * 100,
                    visible: geoDistance(s, center) < Math.PI / 2 - 0.06,
                };
            }),
        };
    }

    return { frame, rotationAt, radius: RADIUS };
}

export const legKm = (stops: LonLat[]) =>
    stops.slice(1).map((to, i) => geoDistance(stops[i], to) * 6371);
