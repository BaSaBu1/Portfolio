import type { APIRoute } from "astro";
import { join } from "node:path";
import sharp from "sharp";
import { ogSvg } from "../lib/icons";

export const GET: APIRoute = async () => {
    const portrait = await sharp(join(process.cwd(), "src/assets/portrait.png"))
        .resize(470, 630, { fit: "cover", position: "north" })
        .flatten({ background: "#e9e3d8" })
        .toBuffer();
    const png = await sharp(Buffer.from(ogSvg()))
        .composite([{ input: portrait, left: 731, top: 0 }])
        .png()
        .toBuffer();
    return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
