// SVG sources for the favicon, app icons, and social preview image.
import { knot, patch } from "./knot";

const VERMILION = "#bf3a2b";
const PAPER = "#f6f3ec";
const INK = "#1a1917";

function knotLines(color: string, gapColor: string, stroke: number, gap: number) {
    const patches = knot.crossings
        .map(
            (c) =>
                `<path d="${patch(c, 15)}" stroke="${gapColor}" stroke-width="${stroke + gap * 2}" stroke-linecap="butt"/>` +
                `<path d="${patch(c, 16)}" stroke="${color}" stroke-width="${stroke}" stroke-linecap="butt"/>`,
        )
        .join("");
    return `<path d="${knot.d}" stroke="${color}" stroke-width="${stroke}" stroke-linejoin="round" fill="none"/>${patches}`;
}

function knotRibbon(edge: string, fill: string) {
    const patches = knot.crossings
        .map(
            (c) =>
                `<path d="${patch(c, 12)}" stroke="${edge}" stroke-width="10"/>` +
                `<path d="${patch(c, 13)}" stroke="${fill}" stroke-width="5.5"/>`,
        )
        .join("");
    return (
        `<g fill="none" stroke-linejoin="round">` +
        `<path d="${knot.d}" stroke="${edge}" stroke-width="10"/>` +
        `<path d="${knot.d}" stroke="${fill}" stroke-width="5.5"/>` +
        `<g stroke-linecap="butt">${patches}</g></g>`
    );
}

// Paper-coloured knot on a vermilion tile, like the seal. iOS rounds touch icons itself,
// so those get square corners.
export function iconSvg(size = 64, rounded = true) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
<rect width="64" height="64" rx="${rounded ? 14 : 0}" fill="${VERMILION}"/>
<svg x="5" y="5" width="54" height="54" viewBox="${knot.viewBox}">${knotLines(PAPER, VERMILION, 17, 9)}</svg>
</svg>`;
}

// 1200×630 social card: paper, woven knot, seal. The portrait is composited on top.
export function ogSvg() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="${PAPER}"/>
<svg x="155" y="105" width="420" height="420" viewBox="${knot.viewBox}" color="${INK}">${knotRibbon(INK, PAPER)}</svg>
<g transform="translate(600 470) rotate(-4)">
<rect width="64" height="64" rx="3" fill="#b8322a"/>
<rect x="5" y="5" width="54" height="54" rx="1.5" fill="none" stroke="#fbf5ec" stroke-width="1.4"/>
<text x="32" y="41.5" text-anchor="middle" fill="#fbf5ec" font-family="Georgia, 'DejaVu Serif', serif" font-size="24">ББ</text>
</g>
<line x1="730" y1="0" x2="730" y2="630" stroke="${INK}" stroke-width="2"/>
</svg>`;
}
