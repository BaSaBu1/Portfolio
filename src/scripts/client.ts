const root = document.documentElement;
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

/* ---------- header: hide on scroll down, show on scroll up ---------- */

const header = document.querySelector<HTMLElement>("[data-header]");
const menu = document.querySelector<HTMLElement>("[data-menu]");
const menuBtn = document.querySelector<HTMLButtonElement>("[data-menu-btn]");
let lastY = window.scrollY;

function onScrollHeader() {
    if (!header) return;
    const y = window.scrollY;
    const menuOpen = menuBtn?.getAttribute("aria-expanded") === "true";
    const hide = y > lastY && y > 200 && !menuOpen;
    header.classList.toggle("is-hidden", hide);
    header.classList.toggle("is-scrolled", y > 8);
    root.style.setProperty(
        "--sticky-top",
        hide ? "12px" : `calc(var(--header-h) + 12px)`,
    );
    lastY = Math.max(0, y);
}

/* ---------- mobile menu sheet ---------- */

function setMenu(open: boolean) {
    if (!menu || !menuBtn) return;
    menu.hidden = !open;
    menuBtn.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("is-locked", open);
    if (open) header?.classList.remove("is-hidden");
}

menuBtn?.addEventListener("click", () =>
    setMenu(menuBtn.getAttribute("aria-expanded") !== "true"),
);
menu?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
matchMedia("(min-width: 1024px)").addEventListener("change", (e) => {
    if (e.matches) setMenu(false);
});

/* ---------- résumé menus: close on outside click / Esc ---------- */

const resumeMenus = [...document.querySelectorAll<HTMLDetailsElement>("[data-resume]")];

document.addEventListener("click", (e) => {
    for (const d of resumeMenus) if (d.open && !d.contains(e.target as Node)) d.open = false;
});

document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    for (const d of resumeMenus) {
        if (d.open) {
            d.open = false;
            d.querySelector("summary")?.focus();
        }
    }
    if (menuBtn?.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        menuBtn.focus();
    }
});

/* ---------- active nav link ---------- */

const navLinks = [...document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]")];
// Every section on the page, in page order (not menu order), so the current one is
// simply the last section whose top has passed the reading line. Sections without a
// menu link (e.g. Journey) highlight nothing.
const sections = [...document.querySelectorAll<HTMLElement>("main section[id]")];

function onScrollNav() {
    const line = window.innerHeight * 0.35;
    let current: HTMLElement | undefined;
    for (const s of sections) if (s.getBoundingClientRect().top <= line) current = s;
    navLinks.forEach((a) =>
        a.classList.toggle("is-active", !!current && a.hash === `#${current.id}`),
    );
}

/* ---------- reveal + draw-in when elements enter the viewport ---------- */

const observed = document.querySelectorAll("[data-reveal], [data-observe]");
if ("IntersectionObserver" in window) {
    const watch = (els: Element[], rootMargin: string) => {
        const io = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    entry.target.classList.add("is-in");
                    io.unobserve(entry.target);
                }
            },
            { rootMargin, threshold: 0.15 },
        );
        els.forEach((el) => io.observe(el));
    };
    const all = [...observed];
    // data-observe="late": wait until the element is well inside the screen (the seal
    // should stamp where people are looking, not at the bottom edge)
    const late = all.filter((el) => el.getAttribute("data-observe") === "late");
    watch(all.filter((el) => !late.includes(el)), "0px 0px -12% 0px");
    watch(late, "0px 0px -8% 0px");
} else {
    observed.forEach((el) => el.classList.add("is-in"));
}

/* ---------- journey: scroll position turns the globe and draws the route ---------- */

const journey = document.querySelector<HTMLElement>("[data-journey]");
let onScrollJourney = () => {};

if (journey && !reducedMotion.matches) {
    const steps = [...journey.querySelectorAll<HTMLElement>("[data-step]")];
    const tabs = [...journey.querySelectorAll<HTMLButtonElement>("[data-stop]")];
    const kmOut = journey.querySelector<HTMLElement>("[data-km]");
    const legKm: number[] = JSON.parse(journey.dataset.legs ?? "[]");
    const format = new Intl.NumberFormat("en-US");
    let renderGlobe: ((p: number) => void) | undefined;
    journey.classList.add("is-live");

    // p runs from 0 (first stop) to steps.length - 1 (last stop)
    const draw = (p: number) => {
        const km = legKm.reduce((sum, leg, i) => sum + leg * Math.min(1, Math.max(0, p - i)), 0);
        renderGlobe?.(p);
        if (kmOut) kmOut.textContent = format.format(Math.round(km / 10) * 10);
    };
    const setActive = (active: number) => {
        steps.forEach((s, i) => s.classList.toggle("is-active", i === active));
        tabs.forEach((t, i) => t.setAttribute("aria-selected", String(i === active)));
    };

    /* Phones and tablets: tap or swipe through the stops; the globe turns to each one
       (passing through the stops in between) instead of being driven by scrolling. */
    const tapMode = matchMedia("(max-width: 1023px)");
    let tapP = 0;
    let tapTarget = 0;
    let tween = 0;
    const goTo = (index: number) => {
        tapTarget = Math.max(0, Math.min(steps.length - 1, index));
        setActive(tapTarget);
        cancelAnimationFrame(tween);
        const from = tapP;
        const duration = Math.min(1600, 650 + 450 * Math.abs(tapTarget - from));
        const start = performance.now();
        const frame = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            tapP = from + (tapTarget - from) * eased;
            draw(tapP);
            if (t < 1) tween = requestAnimationFrame(frame);
        };
        tween = requestAnimationFrame(frame);
    };
    tabs.forEach((tab, i) => tab.addEventListener("click", () => goTo(i)));
    const stepList = journey.querySelector<HTMLElement>(".steps");
    let touchX: number | null = null;
    stepList?.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
    stepList?.addEventListener(
        "touchend",
        (e) => {
            if (touchX === null || !tapMode.matches) return;
            const dx = e.changedTouches[0].clientX - touchX;
            touchX = null;
            if (Math.abs(dx) > 45) goTo(tapTarget + (dx < 0 ? 1 : -1));
        },
        { passive: true },
    );
    const applyMode = () => {
        journey.classList.toggle("is-tap", tapMode.matches);
        if (tapMode.matches) {
            setActive(tapTarget);
            draw(tapP);
        } else onScrollJourney();
    };
    tapMode.addEventListener("change", applyMode);

    // The globe code (d3-geo + land data) loads only when the section gets close.
    const loader = new IntersectionObserver(
        async ([entry]) => {
            if (!entry.isIntersecting) return;
            loader.disconnect();
            const { mountGlobe } = await import("./globe");
            renderGlobe = mountGlobe(journey);
            if (tapMode.matches) draw(tapP);
            else onScrollJourney();
        },
        { rootMargin: "120% 0px" },
    );
    loader.observe(journey);

    onScrollJourney = () => {
        if (tapMode.matches) return;
        const anchor = window.innerHeight * (window.innerWidth < 1024 ? 0.62 : 0.5);
        const centers = steps.map((s) => {
            const r = s.getBoundingClientRect();
            return r.top + Math.min(r.height, window.innerHeight) * 0.35;
        });

        // progress runs from 0 (first stop) to steps.length - 1 (last stop)
        let p = 0;
        if (anchor >= centers[centers.length - 1]) p = centers.length - 1;
        else
            for (let i = 0; i < centers.length - 1; i++) {
                if (anchor >= centers[i] && anchor < centers[i + 1]) {
                    p = i + (anchor - centers[i]) / (centers[i + 1] - centers[i]);
                    break;
                }
            }

        draw(p);
        setActive(Math.min(steps.length - 1, Math.round(p)));
    };
    applyMode();
}

/* ---------- one rAF-throttled scroll loop ---------- */

let ticking = false;
function update() {
    ticking = false;
    onScrollHeader();
    onScrollNav();
    onScrollJourney();
}
window.addEventListener(
    "scroll",
    () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
        }
    },
    { passive: true },
);
window.addEventListener("resize", update);
update();
