import type { APIRoute } from "astro";
import sharp from "sharp";
import { iconSvg } from "../lib/icons";

export const GET: APIRoute = async () => {
    const png = await sharp(Buffer.from(iconSvg(180, false))).png().toBuffer();
    return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
