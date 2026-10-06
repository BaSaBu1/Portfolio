/// <reference types="astro/client" />

declare module "wawoff2" {
    export function decompress(input: Uint8Array): Promise<Uint8Array>;
    const wawoff2: { decompress: typeof decompress };
    export default wawoff2;
}

declare namespace App {
    interface Locals {
        // footnote ids in the order they appear on the current page
        notes?: import("./data/site").NoteId[];
    }
}
