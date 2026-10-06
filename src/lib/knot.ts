// Ölzii (endless knot) geometry.
// One closed curve on a 3×3 lattice: three horizontal and three vertical strands,
// joined by U-turns on two sides and teardrop "ears" on the other two corners,
// then rotated 45° so the lattice reads as a diamond.

type Pt = [number, number];

export interface Crossing {
    x: number;
    y: number;
    // unit vector of the strand that passes over at this crossing
    dx: number;
    dy: number;
}

export interface KnotGeometry {
    d: string;
    crossings: Crossing[];
    viewBox: string;
    size: number;
}

const S = 26; // strand spacing
const E = 1.75 * S; // where straight strands end
const U = 0.9 * S; // U-turn reach
const EAR = 2.2 * S; // ear reach
const R = Math.SQRT1_2;

const rotate = ([x, y]: Pt): Pt => [(x - y) * R, (x + y) * R];
const fmt = (n: number) => Number(n.toFixed(2)).toString();
const pt = (p: Pt) => {
    const [x, y] = rotate(p);
    return `${fmt(x)},${fmt(y)}`;
};

type Seg = { kind: "L"; to: Pt } | { kind: "C"; c1: Pt; c2: Pt; to: Pt };

const start: Pt = [-E, -S];
const segments: Seg[] = [
    { kind: "L", to: [E, -S] },
    { kind: "C", c1: [E + U, -S], c2: [E + U, 0], to: [E, 0] },
    { kind: "L", to: [-E, 0] },
    { kind: "C", c1: [-E - U, 0], c2: [-E - U, S], to: [-E, S] },
    { kind: "L", to: [E, S] },
    { kind: "C", c1: [E + EAR, S], c2: [S, E + EAR], to: [S, E] },
    { kind: "L", to: [S, -E] },
    { kind: "C", c1: [S, -E - U], c2: [0, -E - U], to: [0, -E] },
    { kind: "L", to: [0, E] },
    { kind: "C", c1: [0, E + U], c2: [-S, E + U], to: [-S, E] },
    { kind: "L", to: [-S, -E] },
    { kind: "C", c1: [-S, -E - EAR], c2: [-E - EAR, -S], to: [-E, -S] },
];

function bezier(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt {
    const m = 1 - t;
    const a = m * m * m,
        b = 3 * m * m * t,
        c = 3 * m * t * t,
        d = t * t * t;
    return [
        a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0],
        a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1],
    ];
}

function build(): KnotGeometry {
    let d = `M${pt(start)}`;
    const samples: Pt[] = [rotate(start)];
    let cur = start;
    for (const seg of segments) {
        if (seg.kind === "L") {
            d += ` L${pt(seg.to)}`;
            samples.push(rotate(seg.to));
        } else {
            d += ` C${pt(seg.c1)} ${pt(seg.c2)} ${pt(seg.to)}`;
            for (let i = 1; i <= 24; i++)
                samples.push(rotate(bezier(cur, seg.c1, seg.c2, seg.to, i / 24)));
        }
        cur = seg.to;
    }
    d += " Z";

    // Alternate over/under: the horizontal strand is on top when (i + j) is even.
    const lattice = [-S, 0, S];
    const crossings: Crossing[] = [];
    lattice.forEach((x, i) =>
        lattice.forEach((y, j) => {
            const [rx, ry] = rotate([x, y]);
            const horizontalOver = (i + j) % 2 === 0;
            const [dx, dy] = rotate(horizontalOver ? [1, 0] : [0, 1]);
            crossings.push({ x: rx, y: ry, dx, dy });
        }),
    );

    const xs = samples.map((p) => p[0]);
    const ys = samples.map((p) => p[1]);
    const pad = 12;
    const minX = Math.min(...xs) - pad;
    const minY = Math.min(...ys) - pad;
    const w = Math.max(...xs) + pad - minX;
    const h = Math.max(...ys) + pad - minY;
    const size = Math.max(w, h);
    const ox = minX - (size - w) / 2;
    const oy = minY - (size - h) / 2;
    return {
        d,
        crossings,
        viewBox: `${fmt(ox)} ${fmt(oy)} ${fmt(size)} ${fmt(size)}`,
        size,
    };
}

export const knot = build();

// Short straight segment along the over-strand, centred on a crossing.
export function patch(c: Crossing, half: number): string {
    return `M${fmt(c.x - c.dx * half)},${fmt(c.y - c.dy * half)} L${fmt(c.x + c.dx * half)},${fmt(c.y + c.dy * half)}`;
}
