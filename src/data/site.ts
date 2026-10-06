// All site content lives here. Edit text in this file; layout lives in src/components.

export const person = {
    name: "Batsambuu Batbold",
    first: "Batsambuu",
    last: "Batbold",
    script: "ᠪᠠᠲᠤᠰᠠᠮᠪᠤᠤ",
    tagline: "I solve problems — on paper, in data, and in code.",
    meta: "Mathematics & Computer Science, Macalester College ’27 · from Khövsgöl, Mongolia",
    seeking:
        "Applying to PhD Programs for Fall 2027 · Open to Quantitative, Data, and Software roles.",
    email: "batsambuub2425@gmail.com",
};

export const links = {
    github: "https://github.com/BaSaBu1",
    linkedin: "https://www.linkedin.com/in/batsambuu-batbold/",
    instagram: "https://www.instagram.com/_.basabu._/",
    mosaic: "https://mosaic-palettes.vercel.app/gallery/batsambuu",
    imo: "https://www.imo-official.org/team_r.aspx?code=MNG&year=2021",
    topolens: "https://huggingface.co/spaces/BaSaBu/TDA-Viz",
};

// Paths are relative to the site base (public/ folder).
export const resumes = [
    {
        label: "Math & Data",
        detail: "Quantitative · statistics · research",
        file: "Batsambuu_Batbold_Math_Data_Resume.pdf",
    },
    {
        label: "Software",
        detail: "Software engineering · full stack",
        file: "Batsambuu_Batbold_CS_SWE_Resume.pdf",
    },
];

export const portraitCaption = "Fig. 1. The author.";

export const facts = [
    { value: "IMO Bronze", label: "International Mathematical Olympiad, 2021" },
    { value: "3.96 GPA", label: "Mathematics & Computer Science, Macalester" },
    {
        value: "1st Place",
        label: "ASA DataFest 2025, data analysis competition",
    },
    {
        value: "Published",
        label: "Symposium on Computational Geometry (SoCG), 2026",
    },
];

export type WorkImage = "khumath" | "mapgen" | "mosaic" | "topolens" | "art2vec" | "nba2k";

export type WorkItem = {
    title: string;
    kicker: string;
    problem: string;
    metrics: { value: string; label: string }[];
    stack: string[];
    href: string;
    image: WorkImage;
    imageAlt: string;
};

export const work: WorkItem[] = [
    {
        title: "KHU Math",
        kicker: "Education platform · Live",
        problem:
            "Students in rural Mongolia have limited resources to prepare for math olympiads, so I built a free platform for them: problem archives, courses, live contests, automatic grading, and leaderboards.",
        metrics: [
            { value: "1,300+", label: "visitors in one day" },
            { value: "300+", label: "problems" },
            { value: "100+", label: "registered users" },
        ],
        stack: ["Next.js", "TypeScript", "PostgreSQL", "Supabase"],
        href: "https://khu-math.vercel.app/",
        image: "khumath",
        imageAlt: "KHU Math platform interface",
    },
    {
        title: "From Chaos to Continents",
        kicker: "Published · SoCG 2026",
        problem:
            "A procedural terrain generator that builds continents from Voronoi diagrams and Perlin noise. It was accepted as a multimedia contribution to the Symposium on Computational Geometry.",
        metrics: [
            { value: "50,000+", label: "polygons per world" },
            { value: "40%", label: "faster after NumPy vectorization" },
        ],
        stack: ["Python", "NumPy", "Streamlit", "Blender"],
        href: "https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.SoCG.2026.101",
        image: "mapgen",
        imageAlt: "Procedurally generated 3D terrain rendered in Blender",
    },
    {
        title: "Mosaic",
        kicker: "Photography platform · Live",
        problem:
            "I wanted a home for my photos, so I built one: a gallery platform with serverless image processing on Cloudflare R2, automatic color-palette extraction, EXIF parsing, and on-demand loading for full-resolution images.",
        metrics: [
            { value: "152", label: "photos hosted" },
            { value: "12", label: "galleries" },
        ],
        stack: ["Next.js", "TypeScript", "PostgreSQL", "Cloudflare R2"],
        href: "https://mosaic-palettes.vercel.app/",
        image: "mosaic",
        imageAlt: "Mosaic gallery page with photo collections",
    },
    {
        title: "TopoLens",
        kicker: "Research software · 2026",
        problem:
            "A web app I built for our research group to explore persistent-homology cycles, the “holes” where scientific concepts surround a gap but never connect, in a network built from 70 million papers.",
        metrics: [
            { value: "5,700+", label: "cycles to explore" },
            { value: "~15%", label: "fewer edge crossings in layouts" },
        ],
        stack: ["FastAPI", "React", "Three.js", "pytest"],
        href: "https://huggingface.co/spaces/BaSaBu/TDA-Viz",
        image: "topolens",
        imageAlt: "TopoLens persistence diagram and 3D view of one cycle",
    },
    {
        title: "Art2Vec",
        kicker: "Data story · 2026",
        problem:
            "I wanted to see how art movements relate to each other, so I modeled 16,000+ paintings as networks, found communities with Louvain, and built a k-nearest-neighbor recommender with a scrollytelling site.",
        metrics: [
            { value: "16,000+", label: "paintings analyzed" },
            { value: "kNN", label: "content-based recommender" },
        ],
        stack: ["Python", "Scikit-learn", "NetworkX", "React"],
        href: "https://art2vec.vercel.app/",
        image: "art2vec",
        imageAlt: "Art2Vec interactive art-history analysis interface",
    },
];

export const moreWork = [
    {
        label: "NBA 2K rating predictor",
        href: "https://basabu1-nba-2k-rating-predictor-app-yhrvyq.streamlit.app/",
    },
    {
        label: "Power diagrams",
        href: "https://basabu1.github.io/Power-Diagram/",
    },
    {
        label: "3D convex hull (CGAL)",
        href: "https://github.com/BaSaBu1/3D-Convex-Hull-CGAL-",
    },
    {
        label: "Art gallery problem",
        href: "https://github.com/BaSaBu1/Art-Gallery-Problem",
    },
];

export type ExperienceItem = {
    date: string;
    current?: boolean;
    role: string;
    org: string;
    text: string;
    link?: { label: string; href: string };
};

// Newest first, by start date.
export const experience: ExperienceItem[] = [
    {
        date: "Summer 2026",
        role: "Research Assistant & Software Developer",
        org: "Macalester College",
        text: "Built TopoLens, a website for exploring gaps in a network of scientific concepts from 70 million papers, and wrote layout algorithms for networks with 10,000+ nodes.",
        link: { label: "Open TopoLens", href: links.topolens },
    },
    {
        date: "Dec 2025 – Jan 2026",
        role: "Mathematics Domain Expert",
        org: "Mercor · Frontier AI",
        text: "Wrote original competition-level problems to test AI models, and checked their proofs for logical errors.",
    },
    {
        date: "Summer 2025",
        role: "Teaching Assistant",
        org: "Delgermurun Secondary School",
        text: "Coached students for the International Math Contest for Juniors (one won a Silver Medal) and made a Quarto site of interactive lessons.",
        link: { label: "Lessons", href: "https://basabu1.github.io/Lessons/" },
    },
    {
        date: "2024 – Present",
        current: true,
        role: "Undergraduate Preceptor",
        org: "Macalester College",
        text: "Help 30+ students a semester in Computational Linear Algebra, Linear Algebra, Probability, and Intro to CS.",
    },
    {
        date: "2019 – Present",
        current: true,
        role: "Full-Stack Developer & Organizer",
        org: "Young Mathematicians of Khuvsgul",
        text: "Built and maintain the KHU Math platform; organize free math camps and weekly online contests for 30+ rural students.",
        link: { label: "KHU Math", href: "https://khu-math.vercel.app/" },
    },
];

export const education = {
    schools: [
        {
            school: "Macalester College",
            place: "St. Paul, Minnesota",
            detail: "B.A. Mathematics & Computer Science · GPA 3.96/4.0",
            date: "2023 – 2027 (expected)",
        },
        {
            school: "United World College Maastricht",
            place: "Maastricht, Netherlands",
            detail: "IB Diploma 43/45 · Bilingual Diploma",
            date: "2021 – 2023",
        },
    ],
    coursework: [
        "Probability",
        "Statistical Machine Learning",
        "Computational Linear Algebra",
        "Network Science",
        "Data Structures & Algorithms",
        "AI Robotics",
    ],
    interests: "Applied mathematics: using math to solve concrete problems.",
};

export const awards = {
    feature: {
        title: "Bronze Medal",
        event: "International Mathematical Olympiad",
        year: "2021",
        text: "Placed in the top 250. Mongolia finished 11th, its best team result so far. Honorable Mention the year before.",
        href: links.imo,
    },
    list: [
        {
            year: "2026",
            title: "1st Place, Konhauser Problemfest",
            text: "Team contest across five colleges; Macalester’s first win since 2018.",
        },
        {
            year: "2025",
            title: "1st Place, ASA DataFest",
            text: "Geospatial data analysis in R, presented to a panel of judges.",
        },
        {
            year: "2025, 2026",
            title: "1st Place ×2, Macalester Programming Contest",
            text: "Algorithmic problems in C++.",
        },
        {
            year: "2018 – 2021",
            title: "National Mathematical Olympiad",
            text: "One silver and two bronze medals.",
        },
        {
            year: "2020 – 2021",
            title: "Presidential Award, Mongolia",
            text: "Given to members of the national mathematics team.",
        },
    ],
};

export const pullquote =
    "In short, I’m rooted in nomadic traditions, shaped by Soviet echoes, guided by Asian philosophy, all while embracing a Western mindset.";

export const journeyIntro =
    "I grew up in Mörön, in northern Mongolia, and started liking math through logic games in seventh grade. Since then, each move has taken me a little farther from home, and a little further in what I know.";

export type JourneyStop = {
    name: string;
    region: string;
    coords: [number, number]; // [longitude, latitude]
    years: string;
    text: string;
};

export const journey: JourneyStop[] = [
    {
        name: "Mörön",
        region: "Khövsgöl, Mongolia",
        coords: [100.16, 49.64],
        years: "2003 – 2019",
        text: "A small town in northern Mongolia, a full day’s drive from the capital. This is where logic games in seventh grade got me into math.",
    },
    {
        name: "Ulaanbaatar",
        region: "Mongolia",
        coords: [106.92, 47.92],
        years: "2019 – 2021",
        text: "A silver medal at the national olympiad came with a scholarship, so I moved to the capital alone and lived through Covid there. In 2021, a bronze at the IMO.",
    },
    {
        name: "Maastricht",
        region: "Netherlands",
        coords: [5.69, 50.85],
        years: "2021 – 2023",
        text: "United World College. I learned English here, finished the IB, and made friends from six continents.",
    },
    {
        name: "St. Paul",
        region: "Minnesota, USA",
        coords: [-93.17, 44.94],
        years: "2023 – 2027",
        text: "Macalester College: mathematics, computer science, and a lot of subjects I never expected to like.",
    },
];

export const mosaicGalleries = [
    {
        title: "Home",
        subtitle: "Summer 2025, Mongolia",
        slug: "home",
        image: "https://mosaic-palettes.vercel.app/api/thumbnail/uploads/user_38s8YS315z3HS8dA9USWcCJ8VHA/photos/1a6d92a0-e656-4216-9365-737ef3d4fe4d.jpg?w=1080",
    },
    {
        title: "The Song of Hiawatha",
        subtitle: "Minnehaha Falls",
        slug: "minnehaha",
        image: "https://mosaic-palettes.vercel.app/api/thumbnail/uploads/user_38s8YS315z3HS8dA9USWcCJ8VHA/photos/ba7812a2-d189-4655-94dc-6d22c2570767.jpg?w=1080",
    },
    {
        title: "Friends around Campus",
        subtitle: "Squirrels, birds, and a bunny",
        slug: "friend-around-campus",
        image: "https://mosaic-palettes.vercel.app/api/thumbnail/uploads/user_38s8YS315z3HS8dA9USWcCJ8VHA/photos/3a50da33-6ef6-4c26-b42a-d29293412eaa.jpg?w=1080",
    },
    {
        title: "NYC",
        subtitle: "Knicks in 5, Summer 2026",
        slug: "nyc",
        image: "https://mosaic-palettes.vercel.app/api/thumbnail/uploads/user_38s8YS315z3HS8dA9USWcCJ8VHA/photos/d8442054-3444-473d-8700-8929c8152db7.jpg?w=1080",
    },
    {
        title: "Museums",
        subtitle: "History, art, and time",
        slug: "museums",
        image: "https://mosaic-palettes.vercel.app/api/thumbnail/uploads/user_38s8YS315z3HS8dA9USWcCJ8VHA/photos/c5bb2251-400f-469c-b9e8-6c710fddeaab.jpg?w=1080",
    },
    {
        title: "Como Park",
        subtitle: "Zoo animals and garden",
        slug: "como-park",
        image: "https://mosaic-palettes.vercel.app/api/thumbnail/uploads/user_38s8YS315z3HS8dA9USWcCJ8VHA/photos/db14c076-d341-4ad6-a823-fff34484323c.jpg?w=1080",
    },
];

export const photography = {
    text: "I like observing my surroundings and listening to the sounds of life. Photography helps me remember and store these moments. I’m always learning and experimenting, letting my art grow naturally as I experience the world.",
    stats: "12 galleries · 152 photos",
};

export const contact = {
    title: "Get in touch",
    text: "Whether you have an opportunity, a question, or just want to talk about math, my inbox is open.",
};

// Footnotes explaining the details. Each page lists the ids it uses in reading order
// (see Astro.locals.notes in src/pages), so the numbers run 1, 2, 3… like citations.
// `{km}` is replaced with the journey distance at build time.
export const notes = {
    name: {
        title: "Batsambuu, in Mongol bichig",
        text: "My name in Mongol bichig, the traditional Mongolian script, written top to bottom. Bat means firm and steadfast. Sambuu, which came into Mongolian from Tibetan, means good or excellent. Put together, roughly: steadfastly good. A lot to live up to, but I’m trying.",
    },
    ger: {
        title: "Toono and uni, the roof of a ger",
        text: "Behind my photo is the ceiling of a Mongolian ger, seen from inside looking up: the toono, the crown ring that is the ger’s window to the sky, and the uni, the roof poles that run out from it. Both are traditionally painted orange-red.",
    },
    alkh: {
        title: "Alkh khee, the hammer pattern",
        text: "A row of hammers locked into each other, usually read as strength and endurance. I like it because no piece holds on its own, and that’s been true of everything I’ve done so far: none of it happened without my family, teachers, and friends.",
    },
    seal: {
        title: "The red seal",
        text: "My name, Batu and Sambuu, carved in Mongol bichig in two columns, the way a tamga seal has long been pressed to sign a name.",
    },
    map: {
        title: "The map",
        text: "Great-circle distances between the places I’ve lived: about {km} km so far.",
    },
    knot: {
        title: "Ölzii, the endless knot",
        text: "One line with no beginning and no end, a Mongolian symbol of eternity and good fortune. It opens this page and closes it. I hope what I learn, and what I get to share with others, keeps going the same way.",
    },
};

export type NoteId = keyof typeof notes;
