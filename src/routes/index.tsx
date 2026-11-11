import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import kuroShot from "@/assets/kuro-screenshot.png.asset.json";
import elBrijaShot from "@/assets/el-brija-screenshot.png.asset.json";
import laDauradeShot from "@/assets/la-daurade-screenshot.png.asset.json";

// TODO(manual): replace with the real WhatsApp number (international format, digits only).
const WHATSAPP_NUMBER = "21600000000";
// TODO(manual): replace with the real contact email.
const EMAIL = "hello@example.com";

const WHATSAPP = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hello, I'd like to talk about a website for my business.",
)}`;

const TITLE = "NEXORA Studio — Web Design for Restaurants, Hotels & Small Businesses";
const DESCRIPTION =
  "Independent web design studio creating premium, mobile-friendly websites for restaurants, hotels, barbershops and small businesses. Browse demo concepts and get in touch.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "NEXORA Studio" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

const nav = [
  ["About", "#about"],
  ["Work", "#work"],
  ["Services", "#services"],
  ["Why Me", "#why"],
  ["Contact", "#contact"],
] as const;

const projects = [
  {
    n: "01",
    name: "KURO",
    cat: "Restaurant Website Design",
    desc: "Luxury Japanese restaurant website with elegant typography and immersive sushi photography.",
    url: "https://preview--pixel-perfect-replica-6062.lovable.app/",
    shot: kuroShot.url,
    alt: "Homepage of the KURO demo concept: a dark, luxury Japanese restaurant website",
  },
  {
    n: "02",
    name: "EL BRIJA – GOLDEN TABLE",
    cat: "Restaurant Website Design",
    desc: "Premium Tunisian restaurant website with sophisticated golden aesthetics and traditional architecture.",
    url: "https://preview--el-brija-golden-table.lovable.app/",
    shot: elBrijaShot.url,
    alt: "Homepage of the El Brija Golden Table demo concept: a Tunisian restaurant website with golden styling",
  },
  {
    n: "03",
    name: "LA DAURADE",
    cat: "Seafood Restaurant Website",
    desc: "Mediterranean restaurant website inspired by Port El Kantaoui and its beautiful marina.",
    url: "https://preview--screenshot-to-screen-94.lovable.app/",
    shot: laDauradeShot.url,
    alt: "Homepage of the La Daurade demo concept: a Mediterranean seafood restaurant website",
  },
];

const services = [
  [
    "Restaurant Website Design",
    "Menus, location and reservation or call buttons — designed to turn visitors into guests.",
  ],
  [
    "Barber Shop Websites",
    "Sharp, mobile-first websites with services, hours and an easy way to book your chair.",
  ],
  [
    "Business Websites",
    "Clear, credible websites that present what you do, who you are and how to reach you.",
  ],
  [
    "Responsive Web Design",
    "Every layout refined for desktop, tablet and mobile, so it feels right on any screen.",
  ],
  [
    "WhatsApp Integration",
    "A direct WhatsApp button on your website, so customers are one tap from a conversation.",
  ],
  [
    "Website Redesign",
    "Turn an outdated website into a modern, elegant experience while keeping what already works.",
  ],
];

const why = [
  ["Modern designs", "Editorial layouts and refined typography, never generic templates."],
  ["Mobile-friendly websites", "Built for the phone first, where most of your visitors are."],
  ["Fast delivery", "A focused process using modern AI-assisted development tools."],
  ["Personalized approach", "You work directly with me, from first idea to launch."],
  ["Affordable solutions", "Premium quality at a price that suits independent businesses."],
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    if (typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Eyebrow({ n, children }: { n: string; children: string }) {
  return (
    <p className="mb-8 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-gold sm:mb-10">
      <span>{n}</span>
      <span className="h-px w-12 bg-gold" aria-hidden />
      <span>{children}</span>
    </p>
  );
}

const btnPrimary =
  "inline-flex items-center justify-center bg-gold px-8 py-4 text-center text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 active:translate-y-0";
const btnGhost =
  "inline-flex items-center justify-center border border-border px-8 py-4 text-center text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:text-gold active:translate-y-0";

function Index() {
  useReveal();
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  // Mobile menu: close on Escape / when resizing to desktop, and lock page scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `Name: ${f.get("name")}\nEmail: ${f.get("email")}\n\n${f.get("message")}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("New project enquiry")}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-gold focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 sm:py-5">
          <a
            href="#top"
            className="font-display text-2xl tracking-wide"
            onClick={() => setOpen(false)}
          >
            NEXORA <span className="italic text-gold">Studio</span>
          </a>
          <nav aria-label="Primary" className="hidden gap-10 text-sm text-muted-foreground md:flex">
            {nav.map(([l, h]) => (
              <a key={h} href={h} className="transition-colors duration-300 hover:text-gold">
                {l}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="hidden border border-gold px-5 py-2 text-xs uppercase tracking-[0.2em] text-gold transition-all duration-300 hover:bg-gold hover:text-primary-foreground md:inline-block"
          >
            Start a project
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="-mr-2 px-2 py-2 text-xs uppercase tracking-[0.2em] md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
        {open && (
          <nav
            id="mobile-nav"
            aria-label="Mobile"
            className="animate-menu flex h-[calc(100dvh-65px)] flex-col gap-6 overflow-y-auto border-t border-border bg-background px-6 py-8 md:hidden"
          >
            {nav.map(([l, h]) => (
              <a key={h} href={h} onClick={() => setOpen(false)} className="font-display text-4xl">
                {l}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className={`${btnPrimary} mt-4`}>
              Let's Work Together
            </a>
          </nav>
        )}
      </header>

      <main id="main" className="page-enter">
        {/* HERO */}
        <section
          id="top"
          aria-labelledby="hero-title"
          className="grain-bg relative flex min-h-[100svh] items-end px-5 pb-20 pt-36 sm:px-6 sm:pb-24 sm:pt-40"
        >
          <div className="mx-auto w-full max-w-7xl">
            <p className="animate-rise mb-8 text-xs uppercase tracking-[0.35em] text-gold">
              Independent Web Design Studio
            </p>
            <h1
              id="hero-title"
              className="animate-rise text-balance font-display text-6xl font-medium leading-[0.95] tracking-tight sm:text-8xl lg:text-[9.5rem]"
              style={{ animationDelay: ".1s" }}
            >
              We build
              <br />
              <span className="italic text-gold">digital</span> experiences.
            </h1>
            <div
              className="animate-rise mt-10 flex flex-col justify-between gap-10 sm:mt-12 md:flex-row md:items-end"
              style={{ animationDelay: ".3s" }}
            >
              <p className="max-w-md text-pretty text-lg font-light leading-relaxed text-muted-foreground">
                Premium websites for restaurants, hotels, barbershops and modern small businesses.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <a href="#work" className={btnPrimary}>
                  Explore Our Work
                </a>
                <a href="#contact" className={btnGhost}>
                  Let's Work Together
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section
          id="about"
          aria-labelledby="about-title"
          className="scroll-mt-20 border-t border-border px-5 py-24 sm:px-6 sm:py-32"
        >
          <div className="reveal mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
            <Eyebrow n="01">About</Eyebrow>
            <div>
              <h2
                id="about-title"
                className="text-balance font-display text-3xl leading-snug sm:text-5xl"
              >
                I'm an independent freelance web designer creating{" "}
                <span className="italic text-gold">modern, elegant</span> and conversion-focused
                websites.
              </h2>
              <p className="mt-8 max-w-2xl text-pretty text-lg font-light leading-relaxed text-muted-foreground sm:mt-10">
                I combine a refined eye for design with modern AI-assisted development tools to
                deliver polished websites quickly — without compromising on detail. Every project is
                shaped around your brand, your guests and the results you want to see.
              </p>
            </div>
          </div>
        </section>

        {/* WORK */}
        <section
          id="work"
          aria-labelledby="work-title"
          className="scroll-mt-20 border-t border-border px-5 py-24 sm:px-6 sm:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <Eyebrow n="02">Selected Work</Eyebrow>
                <h2 id="work-title" className="font-display text-5xl sm:text-7xl">
                  Demo <span className="italic text-gold">concepts</span>
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                These are independent demo concepts designed to showcase my approach — not
                commissioned client work.
              </p>
            </div>
            <div className="mt-14 space-y-20 sm:mt-20 md:space-y-32">
              {projects.map((p, i) => (
                <article
                  key={p.n}
                  className="reveal group grid items-center gap-8 md:grid-cols-12 md:gap-10"
                >
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open the ${p.name} demo concept in a new tab`}
                    className={`relative block aspect-[16/10] overflow-hidden border border-border bg-card shadow-[0_30px_80px_-30px] shadow-black/60 transition-all duration-700 group-hover:-translate-y-2 group-hover:border-gold/40 md:col-span-7 ${i % 2 ? "md:order-2" : ""}`}
                  >
                    <img
                      src={p.shot}
                      alt={p.alt}
                      width={1600}
                      height={1000}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-0" />
                    <span className="absolute left-4 top-4 bg-background/80 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-gold backdrop-blur">
                      Demo Concept
                    </span>
                    <span
                      aria-hidden
                      className="absolute bottom-4 right-4 translate-y-2 bg-background/85 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-foreground opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      View ↗
                    </span>
                  </a>
                  <div className="md:col-span-5">
                    <span
                      className="font-display text-6xl text-gold/40 transition-colors duration-500 group-hover:text-gold/70"
                      aria-hidden
                    >
                      {p.n}
                    </span>
                    <p className="mt-4 text-xs uppercase tracking-[0.3em] text-gold">{p.cat}</p>
                    <h3 className="mt-3 text-balance font-display text-4xl transition-colors duration-500 group-hover:text-gold sm:text-5xl">
                      {p.name}
                    </h3>
                    <p className="mt-5 text-pretty font-light leading-relaxed text-muted-foreground">
                      {p.desc}
                    </p>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex items-center gap-3 border border-gold/60 px-6 py-3 text-xs uppercase tracking-[0.25em] text-gold transition-all duration-500 hover:-translate-y-0.5 hover:bg-gold hover:text-primary-foreground"
                    >
                      View Live Demo <span aria-hidden>↗</span>
                      <span className="sr-only"> of {p.name} (opens in a new tab)</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <div className="reveal mt-24 flex flex-col items-start justify-between gap-8 border border-border bg-card/40 p-8 sm:mt-32 sm:p-12 md:flex-row md:items-center">
              <div>
                <h3 className="text-balance font-display text-3xl sm:text-4xl">
                  Want a website like these{" "}
                  <span className="italic text-gold">for your business?</span>
                </h3>
                <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-muted-foreground">
                  Tell me about your restaurant, hotel, barbershop or small business and we'll shape
                  a website around it.
                </p>
              </div>
              <a href="#contact" className={`${btnPrimary} shrink-0`}>
                Let's Work Together
              </a>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section
          id="services"
          aria-labelledby="services-title"
          className="scroll-mt-20 border-t border-border px-5 py-24 sm:px-6 sm:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="reveal">
              <Eyebrow n="03">Services</Eyebrow>
              <h2 id="services-title" className="font-display text-5xl sm:text-7xl">
                What I <span className="italic text-gold">offer</span>
              </h2>
            </div>
            <ul className="mt-14 grid border-l border-t border-border sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
              {services.map(([t, d], i) => (
                <li
                  key={t}
                  className="reveal group border-b border-r border-border p-8 transition-colors duration-500 hover:bg-card sm:p-10"
                  style={{ transitionDelay: `${(i % 3) * 80}ms` }}
                >
                  <span className="text-xs text-gold">0{i + 1}</span>
                  <h3 className="mt-6 text-balance font-display text-3xl transition-colors duration-300 group-hover:text-gold sm:mt-8">
                    {t}
                  </h3>
                  <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">
                    {d}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* WHY */}
        <section
          id="why"
          aria-labelledby="why-title"
          className="scroll-mt-20 border-t border-border px-5 py-24 sm:px-6 sm:py-32"
        >
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="reveal">
              <Eyebrow n="04">Why Work With Me</Eyebrow>
              <h2 id="why-title" className="font-display text-5xl">
                Designed with <span className="italic text-gold">care</span>.
              </h2>
            </div>
            <ul>
              {why.map(([t, d]) => (
                <li
                  key={t}
                  className="reveal group flex flex-col gap-2 border-b border-border py-7 sm:flex-row sm:items-baseline sm:justify-between sm:py-8"
                >
                  <h3 className="font-display text-3xl transition-all duration-500 group-hover:translate-x-2 group-hover:text-gold">
                    {t}
                  </h3>
                  <p className="max-w-xs text-sm font-light text-muted-foreground">{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          aria-labelledby="contact-title"
          className="grain-bg scroll-mt-20 border-t border-border px-5 py-24 sm:px-6 sm:py-32"
        >
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:gap-20">
            <div className="reveal">
              <Eyebrow n="05">Contact</Eyebrow>
              <h2
                id="contact-title"
                className="text-balance font-display text-5xl leading-tight sm:text-7xl"
              >
                Let's build something <span className="italic text-gold">great</span>.
              </h2>
              <p className="mt-8 max-w-md font-light leading-relaxed text-muted-foreground">
                Tell me about your business and what you have in mind. I'll get back to you
                personally.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:mt-12 sm:flex-row">
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                  Chat on WhatsApp
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className={`${btnGhost} break-all normal-case tracking-[0.1em]`}
                >
                  {EMAIL}
                </a>
              </div>
            </div>
            <form onSubmit={onSubmit} className="reveal space-y-8">
              {[
                ["name", "Your name", "text", "name"],
                ["email", "Email address", "email", "email"],
              ].map(([n, l, t, ac]) => (
                <label key={n} className="block">
                  <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    {l}
                  </span>
                  <input
                    required
                    name={n}
                    type={t}
                    autoComplete={ac}
                    className="mt-3 w-full border-b border-input bg-transparent py-3 text-lg outline-none transition-colors focus:border-gold"
                  />
                </label>
              ))}
              <label className="block">
                <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  Your project
                </span>
                <textarea
                  required
                  name="message"
                  rows={4}
                  className="mt-3 w-full resize-none border-b border-input bg-transparent py-3 text-lg outline-none transition-colors focus:border-gold"
                />
              </label>
              <button
                type="submit"
                className="w-full bg-foreground py-5 text-xs font-medium uppercase tracking-[0.25em] text-background transition-colors duration-300 hover:bg-gold"
              >
                Let's Build Something Great
              </button>
              <p role="status" aria-live="polite" className="min-h-5 text-sm text-gold">
                {sent && "Your email app should now open with your message ready to send."}
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-5 py-10 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <span className="font-display text-lg text-foreground">
            NEXORA <span className="italic text-gold">Studio</span>
          </span>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.map(([l, h]) => (
              <a key={h} href={h} className="transition-colors hover:text-gold">
                {l}
              </a>
            ))}
          </nav>
          <span>
            © {new Date().getFullYear()} · Independent web design · Projects shown are demo concepts
          </span>
        </div>
      </footer>
    </div>
  );
}
