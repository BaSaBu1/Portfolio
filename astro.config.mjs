import { defineConfig } from "astro/config";

export default defineConfig({
    site: "https://basabu1.github.io",
    base: "/Portfolio",
    trailingSlash: "ignore",
    image: {
        domains: ["mosaic-palettes.vercel.app"],
    },
});
