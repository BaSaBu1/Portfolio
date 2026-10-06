// Loaded on demand when the journey section comes near the viewport.
import { createGlobe, type LonLat } from "../lib/globe";

export function mountGlobe(root: HTMLElement) {
    const stops: LonLat[] = JSON.parse(root.dataset.stops ?? "[]");
    const globe = createGlobe(stops);
    const land = root.querySelector('[data-g="land"]')!;
    const graticule = root.querySelector('[data-g="graticule"]')!;
    const route = root.querySelector('[data-g="route"]')!;
    const legs = [...root.querySelectorAll("[data-leg]")];
    const pins = [...root.querySelectorAll<HTMLElement>("[data-pin]")];

    let last = -1;
    return (p: number) => {
        if (Math.abs(p - last) < 0.0005) return;
        last = p;
        const f = globe.frame(globe.rotationAt(p), p);
        land.setAttribute("d", f.land);
        graticule.setAttribute("d", f.graticule);
        route.setAttribute("d", f.route);
        legs.forEach((leg, i) => leg.setAttribute("d", f.legs[i]));
        pins.forEach((pin, i) => {
            pin.style.left = `${f.pins[i].x}%`;
            pin.style.top = `${f.pins[i].y}%`;
            pin.classList.toggle("is-hidden", !f.pins[i].visible);
            pin.classList.toggle("is-reached", p >= i - 0.02);
        });
    };
}
