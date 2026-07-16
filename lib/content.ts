/**
 * Evergreen copy + structured data for every section.
 * NO pricing, schedules, availability, offers, plan comparisons (brief §9).
 * Transactional intent always routes to the app.
 *
 * Image paths are centralized here so any asset can be swapped in one place.
 */

// All imagery now served from ImageKit (assets folder mirrors the old
// public/assets names 1:1). Base for the migrated placeholders:
const IK = "https://ik.imagekit.io/adityakamarouthu/Onshorelabs/Airborne/assets";

const REMOTE = {
  aerial:
    "https://ik.imagekit.io/adityakamarouthu/Onshorelabs/Airborne/imgi_2_aerial-fitness-BO_QLCAn.jpg?updatedAt=1784050504447",
  pilates:
    "https://ik.imagekit.io/adityakamarouthu/Onshorelabs/Airborne/imgi_7_mat-pilates-DhJwisHP.png?updatedAt=1784050504763",
  functional:
    "https://ik.imagekit.io/adityakamarouthu/Onshorelabs/Airborne/imgi_5_functional-training-BavPHi1S.png?updatedAt=1784050504756",
  dance:
    "https://ik.imagekit.io/adityakamarouthu/Onshorelabs/Airborne/imgi_4_dance-fitness-Cj_A_O1r.png?updatedAt=1784050504111",
  app1: "https://ik.imagekit.io/adityakamarouthu/Onshorelabs/Airborne/IMG_3969.PNG",
  app2: "https://ik.imagekit.io/adityakamarouthu/Onshorelabs/Airborne/IMG_3970.PNG",
  app3: "https://ik.imagekit.io/adityakamarouthu/Onshorelabs/Airborne/IMG_3971.PNG",
  appMockup:
    "https://ik.imagekit.io/adityakamarouthu/Onshorelabs/Airborne/mockups/Shot-2.png",
} as const;

export const IMG = {
  hero: `${IK}/hero-aerial.jpg`,
  brand: REMOTE.aerial,
  aerialSignature: `${IK}/aerial-signature.jpg`,
  aerialDetail: `${IK}/aerial-detail.jpg`,
  adults: `${IK}/adults.jpg`,
  kids: `${IK}/kids.jpg`,
  facilities: `${IK}/facilities.jpg`,
  studioLowerParel: `${IK}/studio-lowerparel.jpg`,
  studioMazgaon: `${IK}/studio-mazgaon.jpg`,
  appShotA: REMOTE.app1,
  appShotB: REMOTE.app2,
  appShotC: REMOTE.app3,
  // Pre-rendered 3-phone device mockup (real frames, transparent bg).
  appMockup: REMOTE.appMockup,
  finalCta: `${IK}/final-cta.jpg`,
  formats: {
    silkHoop: `${IK}/format-silk-hoop.jpg`,
    pilates: REMOTE.pilates,
    functional: REMOTE.functional,
    dance: REMOTE.dance,
    trampoline: `${IK}/format-trampoline.jpg`,
    yoga: `${IK}/format-yoga.jpg`,
    kidsAerial: `${IK}/format-kids-aerial.jpg`,
  },
  community: [
    `${IK}/community-1.jpg`,
    `${IK}/community-2.jpg`,
    `${IK}/community-3.jpg`,
    `${IK}/community-4.jpg`,
    `${IK}/community-5.jpg`,
    `${IK}/community-6.jpg`,
  ],
} as const;

export const heroContent = {
  eyebrow: "Aerial-led boutique fitness · Mumbai",
  title: ["Discover", "Fitness Against", "Gravity"],
  subtitle:
    "Mumbai's premium boutique fitness studio for aerial fitness, movement, strength, and confidence.",
  primaryCta: "Download the App",
  secondaryCta: "Explore Airborne",
  qrLabel: "Scan to download the Airborne app",
};

export const brandIntro = {
  eyebrow: "More than a workout",
  title: "A new way to move.",
  body:
    "Airborne is a premium boutique studio built around movement, strength, confidence, and community. Aerial fitness is our signature, and it opens into a full world of formats for adults and children, each led by expert coaches in an environment designed to feel calm, safe, and unmistakably premium.",
  pillars: [
    { k: "Expert-led", v: "Coaches who progress you safely, at your pace." },
    { k: "Multi-format", v: "Aerial, Pilates, functional, dance, yoga and more." },
    { k: "Adults & kids", v: "Thoughtful programs for every age and level." },
    { k: "Community", v: "A studio that feels like somewhere you belong." },
  ],
};

export const signatureAerial = {
  eyebrow: "Our signature",
  title: "Aerial Fitness, Elevated",
  body:
    "Suspended from silks and hoops, aerial fitness builds real strength, flexibility, and control while you learn to move with the ground beneath you and the air around you. It looks extraordinary. It feels like flying. And it starts from the very first, fully guided session.",
  points: [
    {
      k: "Beginners welcome",
      v: "No experience needed. Every journey starts on the ground with a coach beside you.",
    },
    {
      k: "Adults & children",
      v: "Dedicated adult and kids aerial programs, each paced for the age and level.",
    },
    {
      k: "Strength & flexibility",
      v: "Serious full-body conditioning, not just beautiful shapes in the air.",
    },
    {
      k: "Safety first",
      v: "Inspected rigging, small batches, and coaches trained to keep you secure.",
    },
  ],
  cta: "Begin Your Airborne Journey",
};

// Dedicated /aerial page. Evergreen, no pricing/schedules — CTAs route to app.
export const aerialPage = {
  hero: {
    eyebrow: "Our signature discipline",
    title: ["Aerial Fitness,", "Elevated"],
    lede:
      "Suspended from silks and hoops, aerial fitness builds real strength, flexibility, and control while you learn to move with the ground beneath you and the air around you. It looks extraordinary. It feels like flying. And it starts from the very first, fully guided session.",
  },
  disciplines: {
    eyebrow: "Two ways to fly",
    title: "Silk & Hoop",
    body:
      "Every Airborne aerialist trains across two apparatus, each teaching the body something the other can't.",
    items: [
      {
        name: "Aerial Silk",
        line: "Two lengths of fabric become wraps, climbs, and dramatic drops. Silk builds grip strength, body awareness, and the confidence to trust your own line.",
        img: IMG.aerialSignature,
      },
      {
        name: "Aerial Hoop",
        line: "A steel ring suspended in the air. Hoop rewards control and shapes, teaching you to hold, balance, and flow through poses with precision and grace.",
        img: IMG.aerialDetail,
      },
    ],
  },
  gains: {
    eyebrow: "What you'll build",
    title: "Strength you can see. Confidence you can feel.",
    body:
      "Aerial is serious full-body conditioning disguised as something beautiful. Here's what shows up, session after session.",
    items: [
      { k: "Full-body strength", v: "Every hold recruits your back, core, and grip — real strength, not just shapes." },
      { k: "Flexibility & mobility", v: "Active, controlled range that carries into everything else you do." },
      { k: "Body control", v: "Learn precisely where your body is in space, and how to move it with intent." },
      { k: "Confidence", v: "Do something you once thought impossible. It changes how you carry yourself." },
    ],
  },
  journey: {
    eyebrow: "From zero",
    title: "You start on the ground.",
    body:
      "No experience needed. Every member begins fully guided, close to the floor, building the basics before we ever ask for height.",
    steps: [
      { n: "01", k: "Ground basics", v: "Grip, posture, and your first supported wraps — feet never far from the floor." },
      { n: "02", k: "Guided height", v: "Climbs and holds introduced only once your body is ready, coach beside you." },
      { n: "03", k: "Your first pose", v: "Piece the fundamentals together into a shape that felt impossible on day one." },
    ],
  },
  safety: {
    eyebrow: "Safety first",
    title: "Held to a standard you can trust.",
    points: [
      "Rigging inspected and load-rated before every session",
      "Small-batch classes — real eyes on you, always",
      "Coaches trained to spot and progress you safely",
      "Crash mats and supported progressions throughout",
    ],
  },
  cta: "Begin Your Airborne Journey",
};

// Bespoke section unique to /classes — how a class actually runs.
export const classesFlow = {
  eyebrow: "How it works",
  title: "Every class, the same care.",
  body:
    "Formats differ, the standard doesn't. Here's the shape of a session, whichever discipline you walk in for.",
  steps: [
    { n: "01", k: "Warm & mobilise", v: "Coaches open every session by prepping the body — no cold starts, no shortcuts." },
    { n: "02", k: "Guided work", v: "Small groups mean real corrections. You're coached, not just counted." },
    { n: "03", k: "Progress & cool", v: "Push a little further than last time, then close with mobility and breath." },
  ],
  levels: {
    title: "Meet yourself where you are.",
    items: [
      { k: "Beginner", v: "New to it all. Fundamentals, slow and supported." },
      { k: "Improver", v: "Basics locked. Building strength, range, and vocabulary." },
      { k: "Advanced", v: "Refining, combining, and chasing the shapes you love." },
    ],
  },
};

// Bespoke /kids page — age bands, gains, and parent reassurance.
export const kidsPage = {
  hero: {
    eyebrow: "For the youngest flyers",
    title: ["Confidence,", "built in the air"],
    lede:
      "Dedicated kids aerial and movement programs focused on coordination, discipline, and joyful movement — always safe, always supported, always encouraging.",
  },
  ages: {
    eyebrow: "Age-right programs",
    title: "The right challenge, at every age.",
    body:
      "Children aren't small adults. Each band is paced for how kids grow, focus, and play.",
    bands: [
      { age: "4–6", k: "Little Flyers", v: "Play-led movement that builds balance, listening, and a love of being active." },
      { age: "7–10", k: "Junior Aerial", v: "First supported wraps and climbs, with big wins in confidence and coordination." },
      { age: "11–15", k: "Youth Aerial", v: "Real strength, discipline, and skill — shapes and sequences they're proud of." },
    ],
  },
  gains: {
    eyebrow: "What kids take home",
    title: "More than a class.",
    items: [
      { k: "Confidence", v: "Doing the 'impossible' rewires how a child sees themselves." },
      { k: "Coordination", v: "Whole-body control that shows up in every other sport and skill." },
      { k: "Focus & discipline", v: "Learning to try, adjust, and try again — patiently." },
      { k: "Joyful fitness", v: "Movement that feels like play, so the habit actually sticks." },
    ],
  },
  parents: {
    eyebrow: "For parents",
    title: "Safe hands, every session.",
    points: [
      "Coaches trained specifically for teaching children",
      "Rigging inspected and load-rated before every class",
      "Small batches — every child seen, every step of the way",
      "CCTV-secured studios and a calm, supervised environment",
    ],
    note: "Trials, age placement, and schedules all live in the Airborne app.",
  },
  cta: "Book a Kids Trial",
};

// Bespoke section unique to /studios — what a first visit feels like.
export const studioVisit = {
  eyebrow: "Your first visit",
  title: "Arrive as a guest. Leave as a regular.",
  body:
    "We've thought about the whole arc of a session, not just the hour on the apparatus.",
  steps: [
    { n: "01", k: "Arrive early", v: "Come 10 minutes ahead. Store your things, meet your coach, settle in." },
    { n: "02", k: "Change & prep", v: "Showers, changing rooms, and shoe racks — everything you need on site." },
    { n: "03", k: "Move", v: "Your class, in a clean, air-conditioned, CCTV-secured space." },
    { n: "04", k: "Reset & go", v: "Freshen up and head back into Mumbai lighter than you came." },
  ],
};

// Bespoke section unique to /why — the standards behind the brand.
export const whyPromise = {
  eyebrow: "Our promise",
  title: "The Airborne standard.",
  body:
    "Premium isn't a finish. It's a set of decisions we make on every rig, every batch, every session.",
  standards: [
    { k: "Coach-to-member ratio", v: "Small batches by design, so attention is on you — never lost in a crowd." },
    { k: "Certified coaching", v: "Trained, certified instructors who tailor progressions to your body." },
    { k: "Inspected rigging", v: "Load-rated equipment, checked before every single session." },
    { k: "Considered spaces", v: "Two studios built to feel calm, clean, and unmistakably premium." },
  ],
};

export const formats = {
  eyebrow: "The complete studio",
  title: "More Ways to Move",
  body:
    "Aerial is where Airborne begins, not where it ends. Explore the full range of formats, each held to the same premium standard.",
  items: [
    {
      name: "Aerial Silk & Hoop",
      line: "Signature suspended work that builds grace and raw strength.",
      img: IMG.formats.silkHoop,
      feature: true,
    },
    {
      name: "Mat Pilates",
      line: "Precise, controlled work for a strong, mobile core.",
      img: IMG.formats.pilates,
    },
    {
      name: "Functional Training",
      line: "Move better in everyday life with strength that carries over.",
      img: IMG.formats.functional,
    },
    {
      name: "Dance Fitness",
      line: "Expressive, high-energy sessions that never feel like a chore.",
      img: IMG.formats.dance,
    },
    {
      name: "Trampoline Fitness",
      line: "Low-impact, high-joy cardio that lifts more than your heart rate.",
      img: IMG.formats.trampoline,
    },
    {
      name: "Yoga",
      line: "Breath, balance, and stillness to close the loop on movement.",
      img: IMG.formats.yoga,
    },
    {
      name: "Kids Aerial Fitness",
      line: "Confidence and coordination, built through safe, supported play.",
      img: IMG.formats.kidsAerial,
    },
  ],
  cta: "Explore in the App",
};

export const adultsKids = {
  eyebrow: "For every age",
  title: "Built for adults. Loved by kids.",
  adults: {
    label: "Adults",
    img: IMG.adults,
    line: "Strength, flexibility, and confidence, at a pace that meets you where you are.",
    points: [
      "Strength & conditioning",
      "Flexibility & mobility",
      "Confidence & self-expression",
      "Beginner-friendly progression",
    ],
  },
  kids: {
    label: "Kids",
    img: IMG.kids,
    line: "Coordination, discipline, and joyful movement in a safe, supportive space.",
    points: [
      "Confidence & coordination",
      "Discipline & focus",
      "Safe, guided movement",
      "Encouraging, expert instruction",
    ],
  },
};

export const whyAirborne = {
  eyebrow: "Why Airborne",
  title: "Premium in every detail.",
  body:
    "The difference is in how it feels: expert coaching, real safety standards, and small batches, inside two beautifully considered Mumbai studios.",
  reasons: [
    { k: "Expert-led coaching", v: "Certified coaches who tailor every session." },
    { k: "Safety-first aerial", v: "Inspected equipment and careful, guided progression." },
    { k: "Beginner-friendly", v: "Programs designed to start you from zero." },
    { k: "Small-batch classes", v: "Attention on you, never lost in a crowd." },
    { k: "Premium environment", v: "Studios that feel calm, clean, and considered." },
    { k: "Adults & kids", v: "Thoughtful programming across every age." },
    { k: "Multiple formats", v: "Aerial, Pilates, functional, dance, yoga and more." },
    { k: "Two Mumbai studios", v: "Lower Parel and Mazgaon, close to you." },
  ],
};

export const facilities = {
  eyebrow: "The studio experience",
  title: "Considered, clean, and calm.",
  body:
    "Every touchpoint is designed to feel premium, from the moment you arrive to the moment you leave lighter than you came.",
  items: [
    "Air conditioning",
    "Shower",
    "Changing room",
    "Washroom",
    "Shoe racks",
    "Wi-Fi",
    "CCTV secured",
    "Clean, safe environment",
  ],
};

export const locations = {
  eyebrow: "Two studios",
  title: "Come find us in Mumbai.",
  facilityTags: ["AC", "Showers", "Changing room", "Wi-Fi", "CCTV"],
  cta: "Open in Google Maps",
};

export const appDownload = {
  eyebrow: "One app for everything",
  title: "Your Airborne Journey, In One App",
  body:
    "The website is where you fall for Airborne. The app is where you live it. Explore memberships, browse schedules, book your sessions, and manage everything in one place.",
  capabilities: [
    "Explore memberships",
    "View live schedules",
    "Book sessions",
    "Join waitlists",
    "Manage your membership",
    "Access member offers",
    "Track upcoming sessions",
  ],
  cta: "Download the App",
  microcopy: "Free to download · iOS and Android",
};

export const community = {
  eyebrow: "The Airborne community",
  title: "Movement, shared.",
  body:
    "Real members, real moments. A glimpse of what it feels like to move with us.",
  // PLACEHOLDER testimonials — clearly isolated, easy to replace before launch.
  // Do not present as verified quotes at public launch until confirmed (brief §10).
  testimonials: [
    {
      quote:
        "I walked in convinced I was too stiff and too scared. Six weeks later I'm upside down and grinning.",
      who: "Member · Lower Parel",
      placeholder: true,
    },
    {
      quote:
        "It's the only workout my daughter and I both look forward to. Different classes, same studio we love.",
      who: "Member · Mazgaon",
      placeholder: true,
    },
    {
      quote:
        "The coaching is genuinely premium. Small groups, real attention, and I've never felt safer trying something this new.",
      who: "Member · Lower Parel",
      placeholder: true,
    },
  ],
};

export const faqs = {
  eyebrow: "Good to know",
  title: "Questions, answered.",
  items: [
    {
      q: "Do I need previous aerial experience?",
      a: "Not at all. Most of our members start with zero experience. Every session is fully guided and begins from the ground up.",
    },
    {
      q: "Is aerial fitness suitable for beginners?",
      a: "Yes. Our beginner programs are built specifically for first-timers, progressing you safely and at your own pace.",
    },
    {
      q: "Is aerial fitness safe?",
      a: "Safety is central to everything we do: inspected rigging, small-batch classes, and coaches trained to keep you secure at every step.",
    },
    {
      q: "What should I wear?",
      a: "Comfortable, fitted activewear that covers the backs of your knees and underarms works best for aerial. Bring water and an open mind.",
    },
    {
      q: "Are classes available for children?",
      a: "Yes. We run dedicated kids aerial and movement programs focused on confidence, coordination, and safe, supported play.",
    },
    {
      q: "Where are the studios located?",
      a: "We have two Mumbai studios, in Lower Parel and Mazgaon. You'll find addresses and directions on the Studios page.",
    },
    {
      q: "How do I book a class or a trial?",
      a: "Booking, trials, schedules, and memberships all live in the Airborne app. Download it to book your first session in a few taps.",
    },
    {
      q: "Where can I view memberships and schedules?",
      a: "Everything current, memberships, schedules, availability and offers, is managed in the Airborne app so it's always up to date.",
    },
  ],
};

export const finalCta = {
  title: "Ready to Move Differently?",
  body:
    "Download the Airborne app and book your first session. Mumbai is waiting to see you fly.",
  cta: "Download the App",
  qrLabel: "Scan to download",
};

export const footer = {
  brandLine:
    "Mumbai's premium boutique fitness studio, aerial-led, for movement, strength, and confidence.",
};
