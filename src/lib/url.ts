const base = import.meta.env.BASE_URL.replace(/\/$/, "");

// Resolve a path against the site base (e.g. "/Portfolio").
export const url = (path = "") => `${base}/${path.replace(/^\//, "")}`;
