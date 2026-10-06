// Build-time Mongolian script → SVG paths, so the seal and the vertical name are real
// shapes (no web font needed). Text is shaped with HarfBuzz (Noto Sans Mongolian, OFL),
// then turned 90° clockwise into a top-to-bottom column, the way Mongol bichig is written.
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import * as hb from "harfbuzzjs";
import wawoff2 from "wawoff2";

const FONT = "node_modules/@fontsource/noto-sans-mongolian/files/noto-sans-mongolian-mongolian-400-normal.woff2";

let fontPromise: Promise<hb.Font> | undefined;

function loadFont() {
    fontPromise ??= (async () => {
        const woff2 = await readFile(join(process.cwd(), FONT));
        const ttf: Uint8Array = await wawoff2.decompress(woff2);
        const data = ttf.buffer.slice(ttf.byteOffset, ttf.byteOffset + ttf.byteLength) as ArrayBuffer;
        return new hb.Font(new hb.Face(new hb.Blob(data)));
    })();
    return fontPromise;
}

export interface ScriptPath {
    d: string;
    width: number; // across the column (font units)
    height: number; // down the column (font units)
}

const fmt = (n: number) => Number(n.toFixed(1)).toString();

export async function verticalScript(text: string): Promise<ScriptPath> {
    const font = await loadFont();
    const buffer = new hb.Buffer();
    buffer.addText(text);
    buffer.guessSegmentProperties();
    hb.shape(font, buffer);

    // Collect absolute outline points: x along the line, y up (font units).
    type Cmd = { op: string; pts: [number, number][] };
    const cmds: Cmd[] = [];
    let pen = 0;
    const positions = buffer.getGlyphPositions();
    buffer.getGlyphInfos().forEach((glyph, i) => {
        const p = positions[i];
        const ox = pen + p.xOffset;
        const oy = p.yOffset;
        const d = font.glyphToPath(glyph.codepoint);
        for (const [, op, args] of d.matchAll(/([MLQCZ])([^MLQCZ]*)/g)) {
            const nums = (args.match(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi) ?? []).map(Number);
            const pts: [number, number][] = [];
            for (let k = 0; k + 1 < nums.length; k += 2) pts.push([nums[k] + ox, nums[k + 1] + oy]);
            cmds.push({ op, pts });
        }
        pen += p.xAdvance;
    });

    // Rotate 90° clockwise: the line runs downward, glyph tops face right.
    // In SVG terms that is simply (x, y_up) -> (y_up, x).
    const all = cmds.flatMap((c) => c.pts);
    const minY = Math.min(...all.map((p) => p[1]));
    const maxY = Math.max(...all.map((p) => p[1]));
    const minX = Math.min(...all.map((p) => p[0]));
    const maxX = Math.max(...all.map((p) => p[0]));
    const d = cmds
        .map((c) => c.op + c.pts.map(([x, y]) => `${fmt(y - minY)},${fmt(x - minX)}`).join(" "))
        .join("");

    return { d, width: maxY - minY, height: maxX - minX };
}
