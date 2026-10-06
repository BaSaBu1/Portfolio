// Alkh khee (hammer pattern) geometry, shared by the dividers and the notes thumbnail.
// The band is split into two interlocking combs of hammers: upright T's rising from the
// bottom and inverted T's hanging from the top. The line is the single boundary between
// them. One period is 20 units wide (head 15, stem 5), 20 units tall.
export const ALKH_PERIOD = 20;

const period: [number, number][] = [
    [-2.5, 2.5], [12.5, 2.5], [12.5, 10], [7.5, 10], [7.5, 17.5],
    [22.5, 17.5], [22.5, 10], [17.5, 10], [17.5, 2.5],
];

// Path for a pattern tile: the tile is shifted so no vertical stroke touches a tile edge,
// keeping the repeat seamless; neighbouring periods are drawn too and clipped by the tile.
export const alkhTilePath = [-ALKH_PERIOD, 0, ALKH_PERIOD]
    .map((dx) => "M" + period.map(([x, y]) => `${x + dx},${y}`).join(" L"))
    .join(" ");
