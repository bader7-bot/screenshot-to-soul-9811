import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";

const WHATSAPP = "https://wa.me/21600000000"; // TODO: replace with real number
const EMAIL = "hello@example.com"; // TODO: replace with real email

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bader Kchin — Freelance Web Designer for Restaurants & Hospitality" },
      { name: "description", content: "Independent web designer crafting premium, conversion-focused websites for restaurants, hospitality and modern businesses." },
      { property: "og:title", content: "Bader Kchin — We Build Digital Experiences" },
      { property: "og:description", content: "Premium websites for restaurants, hospitality and modern businesses." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
  { n: "01", name: "KURO", cat: "Restaurant Website Design", desc: "Luxury Japanese restaurant website with elegant typography and immersive sushi photography.", url: "https://preview--screenshot-to-screen-94.lovable.app/", shot: null as string | null },
  { n: "02", name: "EL BRIJA – GOLDEN TABLE", cat: "Restaurant Website Design", desc: "Premium Tunisian restaurant website with sophisticated golden aesthetics and traditional architecture.", url: "https://preview--el-brija-golden-table.lovable.app/", shot: null as string | null },
  { n: "03", name: "LA DAURADE", cat: "Seafood Restaurant Website", desc: "Mediterranean restaurant website inspired by Port El Kantaoui and its beautiful marina.", url: "https://preview--pixel-perfect-replica-6062.lovable.app/", shot: null as string | null },
];

const services = [
  ["Restaurant Website Design", "Menus, reservations and atmosphere — designed to turn visitors into guests."],
  ["Barber Shop Websites", "Sharp, bookable websites that reflect the craft of your chair."],
  ["Business Websites", "Clear, credible websites that present what you do with confidence."],
  ["Responsive Web Design", "Every layout refined for desktop, tablet and mobile."],
  ["WhatsApp Integration", "One tap from your website to a conversation with you."],
  ["Website Redesign", "Turn an outdated website into a modern, elegant experience."],
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
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")), { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Eyebrow({ n, children }: { n: string; children: string }) {
  return (
    <div className="mb-10 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-gold">
      <span>{n}</span><span className="h-px w-12 bg-gold" /><span>{children}</span>
    </div>
  );
}

function Index() {
  useReveal();
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `Name: ${f.get("name")}\nEmail: ${f.get("email")}\n\n${f.get("message")}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("New project enquiry")}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#top" className="font-display text-2xl tracking-wide">Bader <span className="italic text-gold">Kchin</span></a>
          <nav className="hidden gap-10 text-sm text-muted-foreground md:flex">
            {nav.map(([l, h]) => <a key={h} href={h} className="transition-colors hover:text-gold">{l}</a>)}
          </nav>
          <a href="#contact" className="hidden border border-gold px-5 py-2 text-xs uppercase tracking-[0.2em] text-gold transition-all hover:bg-gold hover:text-primary-foreground md:inline-block">Start a project</a>
          <button onClick={() => setOpen(!open)} className="text-xs uppercase tracking-[0.2em] md:hidden" aria-label="Menu">{open ? "Close" : "Menu"}</button>
        </div>
        {open && (
          <nav className="flex flex-col gap-5 border-t border-border px-6 py-6 md:hidden">
            {nav.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="font-display text-2xl">{l}</a>)}
          </nav>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="grain-bg relative flex min-h-screen items-end px-6 pb-24 pt-40">
        <div className="mx-auto w-full max-w-7xl">
          <p className="animate-rise mb-8 text-xs uppercase tracking-[0.35em] text-gold">Independent Web Design Studio</p>
          <h1 className="animate-rise font-display text-6xl font-medium leading-[0.95] tracking-tight sm:text-8xl lg:text-[9.5rem]" style={{ animationDelay: ".1s" }}>
            We build<br /><span className="italic text-gold">digital</span> experiences.
          </h1>
          <div className="animate-rise mt-12 flex flex-col justify-between gap-10 md:flex-row md:items-end" style={{ animationDelay: ".3s" }}>
            <p className="max-w-md text-lg font-light text-muted-foreground">Premium websites for restaurants, hospitality and modern businesses.</p>
            <div className="flex flex-wrap gap-4">
              <a href="#work" className="bg-gold px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground transition-all hover:-translate-y-0.5 hover:opacity-90">Explore Our Work</a>
              <a href="#contact" className="border border-border px-8 py-4 text-xs uppercase tracking-[0.2em] transition-all hover:border-gold hover:text-gold">Let's Work Together</a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-t border-border px-6 py-32">
        <div className="reveal mx-auto grid max-w-7xl gap-16 md:grid-cols-[1fr_2fr]">
          <Eyebrow n="01">About</Eyebrow>
          <div>
            <p className="font-display text-3xl leading-snug sm:text-5xl">
              I'm an independent freelance web designer creating <span className="italic text-gold">modern, elegant</span> and conversion-focused websites.
            </p>
            <p className="mt-10 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
              I combine a refined eye for design with modern AI-assisted development tools to deliver polished websites quickly — without compromising on detail. Every project is shaped around your brand, your guests and the results you want to see.
            </p>
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="border-t border-border px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow n="02">Selected Work</Eyebrow>
              <h2 className="font-display text-5xl sm:text-7xl">Demo <span className="italic text-gold">concepts</span></h2>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground">These are independent demo concepts designed to showcase my approach — not commissioned client work.</p>
          </div>
          <div className="mt-20 space-y-24 md:space-y-32">
            {projects.map((p, i) => (
              <article key={p.n} className="reveal group grid items-center gap-10 md:grid-cols-12">
                <div className={`relative aspect-[16/10] overflow-hidden border border-border bg-card shadow-[0_30px_80px_-30px] shadow-black/60 transition-all duration-700 group-hover:-translate-y-2 group-hover:border-gold/40 md:col-span-7 ${i % 2 ? "md:order-2" : ""}`}>
                  {p.shot ? (
                    <img src={p.shot} alt={`${p.name} website screenshot`} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-1000 group-hover:scale-105" />
                  ) : (
                    <iframe src={p.url} title={`${p.name} preview`} loading="lazy" tabIndex={-1} className="pointer-events-none absolute left-0 top-0 h-[250%] w-[250%] origin-top-left scale-[0.4] transition-transform duration-1000 group-hover:scale-[0.42]" />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-0" />
                  <span className="absolute left-4 top-4 bg-background/80 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-gold backdrop-blur">Demo Concept</span>
                </div>
                <div className="md:col-span-5">
                  <span className="font-display text-6xl text-gold/40 transition-colors duration-500 group-hover:text-gold/70">{p.n}</span>
                  <p className="mt-4 text-xs uppercase tracking-[0.3em] text-gold">{p.cat}</p>
                  <h3 className="mt-3 font-display text-4xl transition-colors duration-500 group-hover:text-gold sm:text-5xl">{p.name}</h3>
                  <p className="mt-5 font-light leading-relaxed text-muted-foreground">{p.desc}</p>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-3 border border-gold/60 px-6 py-3 text-xs uppercase tracking-[0.25em] text-gold transition-all duration-500 hover:-translate-y-0.5 hover:bg-gold hover:text-primary-foreground">
                    View Live Website <span aria-hidden>↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="border-t border-border px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <div className="reveal"><Eyebrow n="03">Services</Eyebrow>
            <h2 className="font-display text-5xl sm:text-7xl">What I <span className="italic text-gold">offer</span></h2></div>
          <div className="mt-16 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
            {services.map(([t, d], i) => (
              <div key={t} className="reveal group border-b border-r border-border p-10 transition-colors hover:bg-card">
                <span className="text-xs text-gold">0{i + 1}</span>
                <h3 className="mt-8 font-display text-3xl transition-colors group-hover:text-gold">{t}</h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="border-t border-border px-6 py-32">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-[1fr_2fr]">
          <div className="reveal"><Eyebrow n="04">Why Work With Me</Eyebrow>
            <h2 className="font-display text-5xl">Designed with <span className="italic text-gold">care</span>.</h2></div>
          <ul>
            {why.map(([t, d]) => (
              <li key={t} className="reveal group flex flex-col gap-2 border-b border-border py-8 sm:flex-row sm:items-baseline sm:justify-between">
                <span className="font-display text-3xl transition-all group-hover:translate-x-2 group-hover:text-gold">{t}</span>
                <span className="max-w-xs text-sm font-light text-muted-foreground">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="grain-bg border-t border-border px-6 py-32">
        <div className="mx-auto grid max-w-7xl gap-20 lg:grid-cols-2">
          <div className="reveal">
            <Eyebrow n="05">Contact</Eyebrow>
            <h2 className="font-display text-5xl leading-tight sm:text-7xl">Let's build something <span className="italic text-gold">great</span>.</h2>
            <p className="mt-8 max-w-md font-light text-muted-foreground">Tell me about your business and what you have in mind. I'll get back to you personally.</p>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="bg-gold px-8 py-4 text-center text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground transition-all hover:-translate-y-0.5">Chat on WhatsApp</a>
              <a href={`mailto:${EMAIL}`} className="border border-border px-8 py-4 text-center text-xs uppercase tracking-[0.2em] transition-all hover:border-gold hover:text-gold">{EMAIL}</a>
            </div>
          </div>
          <form onSubmit={onSubmit} className="reveal space-y-8">
            {[["name", "Your name", "text"], ["email", "Email address", "email"]].map(([n, l, t]) => (
              <label key={n} className="block">
                <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{l}</span>
                <input required name={n} type={t} className="mt-3 w-full border-b border-input bg-transparent py-3 text-lg outline-none transition-colors focus:border-gold" />
              </label>
            ))}
            <label className="block">
              <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Your project</span>
              <textarea required name="message" rows={4} className="mt-3 w-full resize-none border-b border-input bg-transparent py-3 text-lg outline-none transition-colors focus:border-gold" />
            </label>
            <button type="submit" className="w-full bg-foreground py-5 text-xs font-medium uppercase tracking-[0.25em] text-background transition-colors hover:bg-gold">Let's Build Something Great</button>
            {sent && <p className="text-sm text-gold">Your email app should now open with your message ready to send.</p>}
          </form>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-xs text-muted-foreground sm:flex-row">
          <span className="font-display text-lg text-foreground">Bader <span className="italic text-gold">Kchin</span></span>
          <span>© {new Date().getFullYear()} · Independent web design</span>
        </div>
      </footer>
    </div>
  );
}
