/**
 * RUHI WELLNESS — Home Page
 * $10k design: cinematic hero, parallax, animated counters, luxury sections
 * Video: https://files.manuscdn.com/user_upload_by_module/session_file/310519663782515919/tzLgHYPnfYuQyEGM.mp4
 * Images: element-i-light, element-ii-motion, element-iii-glow, element-iv-pure
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";

/* ── Scroll-triggered fade ── */
function Reveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "scale";
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cls = direction === "left" ? "slide-left" : direction === "right" ? "slide-right" : direction === "scale" ? "scale-reveal" : "fade-up";
    el.classList.add(cls);
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("visible"), delay);
          obs.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, direction]);
  return <div ref={ref} className={className}>{children}</div>;
}

/* ── Animated counter ── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        obs.unobserve(el);
        let start = 0;
        const step = Math.ceil(to / 60);
        const timer = setInterval(() => {
          start += step;
          if (start >= to) { setVal(to); clearInterval(timer); }
          else setVal(start);
        }, 24);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

const ELEMENTS = [
  { num: "I",   name: "Light",  label: "Element I",   img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663782515919/wOtwAoSfKoTSzqtE.webp",   price: "£180", duration: "45–60 min", tagline: "Brighten. Replenish. Defend." },
  { num: "II",  name: "Motion", label: "Element II",  img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663782515919/ysDzLZcXoXmeRToh.webp", price: "£180", duration: "45–60 min", tagline: "Energise. Focus. Recover." },
  { num: "III", name: "Glow",   label: "Element III", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663782515919/qDHqbpPQlXRTOYuV.webp",  price: "£200", duration: "45–60 min", tagline: "Clarify. Illuminate. Renew." },
  { num: "IV",  name: "Pure",   label: "Element IV",  img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663782515919/xepOswMXHrmVxDWh.webp",   price: "£180", duration: "45–60 min", tagline: "Reset. Detox. Restore." },
];

const TESTIMONIALS = [
  { quote: "I was nervous about my first drip but my practitioner came to my flat and made it feel completely normal. I felt the difference by the next morning.", author: "Sarah", element: "Element I" },
  { quote: "I book Motion before every long-haul flight. The energy difference is remarkable — no more three-day recovery.", author: "James", element: "Element II" },
  { quote: "Glow has become part of my pre-event routine. My skin looks noticeably brighter within 24 hours.", author: "Priya", element: "Element III" },
];

const STATS = [
  { value: 4, suffix: "", label: "Expertly formulated elements" },
  { value: 100, suffix: "%", label: "Qualified practitioners" },
  { value: 60, suffix: " min", label: "Session duration" },
  { value: 24, suffix: "h", label: "Confirmation turnaround" },
];

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Auto-rotate testimonials
  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial((p) => (p + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, []);

  // Hero entrance
  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Subtle parallax on hero text
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onScroll = () => {
      const y = window.scrollY;
      hero.style.transform = `translateY(${y * 0.28}px)`;
      hero.style.opacity = `${1 - y / 700}`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Layout>
      {/* ══════════════════════════════════════════
          HERO — full-screen brand film
      ══════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[640px] flex items-end overflow-hidden">
        {/* Video */}
        <video
          ref={videoRef}
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663782515919/tzLgHYPnfYuQyEGM.mp4"
          style={{ filter: "brightness(0.88)" }}
        />

        {/* Multi-layer gradient */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to top, oklch(0.09 0.010 60 / 0.92) 0%, oklch(0.09 0.010 60 / 0.45) 45%, oklch(0.09 0.010 60 / 0.10) 100%)",
        }} />

        {/* Vignette edges */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at center, transparent 40%, oklch(0.06 0.008 60 / 0.5) 100%)",
        }} />

        {/* Hero content */}
        <div
          ref={heroRef}
          className="relative z-10 container pb-24 md:pb-32"
          style={{ willChange: "transform, opacity" }}
        >
          <div
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 1.2s cubic-bezier(0.23,1,0.32,1), transform 1.2s cubic-bezier(0.23,1,0.32,1)",
            }}
          >
            <p
              className="eyebrow mb-8"
              style={{ color: "oklch(0.78 0.08 78)", "--tw-eyebrow-line": "oklch(0.78 0.08 78)" } as React.CSSProperties}
            >
              Ruhi Wellness
            </p>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(3.5rem, 10vw, 9rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                color: "oklch(0.97 0.005 80)",
                marginBottom: "1.5rem",
              }}
            >
              Wellness,<br />
              <em style={{ fontStyle: "italic", color: "oklch(0.84 0.08 78)" }}>restored.</em>
            </h1>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: "1.05rem",
                color: "oklch(0.78 0.005 78)",
                letterSpacing: "0.06em",
                marginBottom: "2.5rem",
                maxWidth: "28ch",
              }}
            >
              Four elements. One ritual.
            </p>
            <Link href="/book">
              <span className="btn-gold" style={{ fontSize: "0.65rem" }}>Book your element →</span>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{
            opacity: heroLoaded ? 0.6 : 0,
            transition: "opacity 1.5s 1s",
          }}
        >
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.78 0.005 78)" }}>
            Scroll
          </span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, oklch(0.78 0.005 78), transparent)" }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          BRAND PHILOSOPHY
      ══════════════════════════════════════════ */}
      <section className="py-28 md:py-40" style={{ background: "var(--ivory)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow mb-8">The Ruhi philosophy</p>
              </Reveal>
              <Reveal delay={100}>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 300,
                    fontSize: "clamp(2.4rem, 5vw, 5rem)",
                    lineHeight: 1.08,
                    color: "oklch(0.16 0.012 60)",
                    marginBottom: "2rem",
                  }}
                >
                  Wellness is not<br />
                  <em style={{ fontStyle: "italic", color: "oklch(0.62 0.10 75)" }}>one thing.</em>
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: "1.05rem",
                    lineHeight: 1.8,
                    color: "oklch(0.42 0.010 65)",
                    maxWidth: "52ch",
                  }}
                >
                  Some days call for light. Some for motion, glow, or stillness. Ruhi gives you four elements, so you choose what your body needs — delivered directly to you by a qualified practitioner.
                </p>
              </Reveal>
            </div>

            {/* Decorative gold line + stat */}
            <div className="lg:col-span-5">
              <Reveal delay={300} direction="right">
                <div
                  className="p-10 md:p-12"
                  style={{
                    background: "var(--ivory-deep)",
                    border: "1px solid oklch(0.88 0.008 75)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Decorative corner */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0, right: 0,
                      width: 80, height: 80,
                      borderLeft: "1px solid oklch(0.62 0.10 75 / 0.3)",
                      borderBottom: "1px solid oklch(0.62 0.10 75 / 0.3)",
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      fontWeight: 300,
                      fontSize: "1.4rem",
                      lineHeight: 1.5,
                      color: "oklch(0.35 0.010 62)",
                      marginBottom: "1.5rem",
                    }}
                  >
                    "A practitioner comes to you. You choose the element. We handle everything else."
                  </p>
                  <Link href="/elements">
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.65rem",
                        fontWeight: 500,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "oklch(0.62 0.10 75)",
                        borderBottom: "1px solid oklch(0.62 0.10 75)",
                        paddingBottom: "2px",
                      }}
                    >
                      Explore the elements →
                    </span>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════ */}
      <section
                style={{ background: "oklch(0.96 0.012 76)",
          borderTop: "1px solid oklch(0.88 0.008 75)",
          borderBottom: "1px solid oklch(0.88 0.008 75)",
        }}
      >
        <div className="container py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 60}>
                <div className="text-center">
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 300,
                      fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                    color: "oklch(0.62 0.10 75)",
                    lineHeight: 1,
                    marginBottom: "0.5rem",
                    }}
                  >
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 300,
                      fontSize: "0.72rem",
                      letterSpacing: "0.1em",
                    color: "oklch(0.48 0.010 65)",
                    textTransform: "uppercase",
                    }}
                  >
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ELEMENTS PREVIEW
      ══════════════════════════════════════════ */}
      <section className="py-28 md:py-40" style={{ background: "var(--ivory)" }}>
        <div className="container">
          <Reveal className="mb-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="eyebrow mb-5">Our formulations</p>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 300,
                    fontSize: "clamp(2.4rem, 4vw, 4.5rem)",
                    lineHeight: 1.05,
                    color: "oklch(0.16 0.012 60)",
                  }}
                >
                  The four elements
                </h2>
              </div>
              <Link href="/elements">
                <span
                  className="hidden md:inline-block"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "oklch(0.62 0.10 75)",
                    borderBottom: "1px solid oklch(0.62 0.10 75)",
                    paddingBottom: "2px",
                  }}
                >
                  See full details →
                </span>
              </Link>
            </div>
          </Reveal>

          {/* Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            {ELEMENTS.map((el, i) => (
              <Reveal key={el.num} delay={i * 90} direction="scale">
                <Link href="/elements">
                  <div
                    className="group relative overflow-hidden"
                    style={{ aspectRatio: "3/5", cursor: "pointer" }}
                  >
                    <img
                      src={el.img}
                      alt={`${el.label} — ${el.name}`}
                      className="w-full h-full object-cover"
                      style={{ transition: "transform 800ms cubic-bezier(0.23,1,0.32,1)" }}
                    />
                    {/* Always-on gradient */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(to top, oklch(0.10 0.010 60 / 0.78) 0%, transparent 55%)",
                      }}
                    />
                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100"
                      style={{
                        background: "oklch(0.62 0.10 75 / 0.08)",
                        transition: "opacity 400ms",
                      }}
                    />
                    {/* Text */}
                    <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.58rem",
                          fontWeight: 500,
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: "oklch(0.78 0.08 78)",
                          marginBottom: "0.4rem",
                        }}
                      >
                        {el.label}
                      </p>
                      <p
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontWeight: 300,
                          fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
                          color: "oklch(0.97 0.005 80)",
                          lineHeight: 1,
                          marginBottom: "0.5rem",
                        }}
                      >
                        {el.name}
                      </p>
                      <p
                        className="opacity-0 group-hover:opacity-100"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 300,
                          fontSize: "0.72rem",
                          color: "oklch(0.82 0.005 78)",
                          transition: "opacity 300ms 50ms",
                        }}
                      >
                        {el.price} · {el.duration}
                      </p>
                    </div>

                    {/* Hover scale */}
                    <style>{`
                      .group:hover img { transform: scale(1.06); }
                    `}</style>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 md:hidden">
            <Link href="/elements">
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.62 0.10 75)", borderBottom: "1px solid oklch(0.62 0.10 75)", paddingBottom: "2px" }}>
                See full details →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS — dark panel
      ══════════════════════════════════════════ */}
      <section
        className="py-28 md:py-36"
        style={{ background: "oklch(0.975 0.010 78)" }}
      >
        <div className="container max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow mb-14" style={{ color: "oklch(0.62 0.10 75)", justifyContent: "center", display: "flex" }}>
              Client stories
            </p>
          </Reveal>

          {/* Quote rotator */}
          <div className="relative" style={{ minHeight: 200 }}>
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{
                  opacity: i === activeTestimonial ? 1 : 0,
                  transform: i === activeTestimonial ? "translateY(0)" : "translateY(16px)",
                  transition: "opacity 700ms cubic-bezier(0.23,1,0.32,1), transform 700ms cubic-bezier(0.23,1,0.32,1)",
                  pointerEvents: i === activeTestimonial ? "auto" : "none",
                }}
              >
                {/* Large quote mark */}
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "5rem",
                    lineHeight: 0.5,
                    color: "oklch(0.62 0.10 75 / 0.3)",
                    display: "block",
                    marginBottom: "1rem",
                  }}
                >
                  "
                </span>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
                    lineHeight: 1.5,
                  color: "oklch(0.22 0.012 60)",
                  marginBottom: "2rem",
                  maxWidth: "52ch",
                  }}
                >
                  {t.quote}
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "oklch(0.52 0.010 65)",
                  }}
                >
                  — {t.author}, {t.element}
                </p>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-10">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                style={{
                  width: i === activeTestimonial ? "2rem" : "0.4rem",
                  height: "2px",
                  background: i === activeTestimonial ? "oklch(0.62 0.10 75)" : "oklch(0.82 0.008 75)",
                  border: "none",
                  transition: "all 400ms cubic-bezier(0.23,1,0.32,1)",
                }}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FREE CONSULTATION BANNER
      ══════════════════════════════════════════ */}
      <section
        className="py-24 md:py-32"
        style={{ background: "var(--ivory-deep)" }}
      >
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <p className="eyebrow mb-6">Free consultation</p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "clamp(2rem, 4vw, 3.8rem)",
                  lineHeight: 1.1,
                  color: "oklch(0.16 0.012 60)",
                  marginBottom: "1.5rem",
                }}
              >
                Not sure which element<br />
                <em style={{ fontStyle: "italic", color: "oklch(0.62 0.10 75)" }}>is right for you?</em>
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  color: "oklch(0.42 0.010 65)",
                  marginBottom: "2.5rem",
                  maxWidth: "44ch",
                }}
              >
                Book a free 15-minute call with a Ruhi practitioner before you commit to anything.
              </p>
              <Link href="/book">
                <span className="btn-outline-gold">Book a free consultation →</span>
              </Link>
            </Reveal>

            {/* Decorative element grid */}
            <Reveal delay={150} direction="right">
              <div className="grid grid-cols-2 gap-3">
                {ELEMENTS.map((el) => (
                  <div
                    key={el.num}
                    className="group overflow-hidden"
                    style={{ aspectRatio: "1/1", position: "relative" }}
                  >
                    <img
                      src={el.img}
                      alt={el.name}
                      className="w-full h-full object-cover"
                      style={{ transition: "transform 600ms cubic-bezier(0.23,1,0.32,1)" }}
                    />
                    <div
                      className="absolute inset-0 flex items-end p-4"
                      style={{ background: "linear-gradient(to top, oklch(0.10 0.010 60 / 0.65) 0%, transparent 55%)" }}
                    >
                      <p
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontWeight: 300,
                          fontSize: "1.2rem",
                          color: "oklch(0.97 0.005 80)",
                        }}
                      >
                        {el.name}
                      </p>
                    </div>
                    <style>{`.group:hover img { transform: scale(1.05); }`}</style>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          UPCOMING
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ background: "var(--ivory)" }}>
        <div className="container max-w-4xl">
          <Reveal>
            <p className="eyebrow mb-6">What's on</p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(2rem, 3.5vw, 3.5rem)",
                color: "oklch(0.16 0.012 60)",
                marginBottom: "3rem",
              }}
            >
              Upcoming at Ruhi
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <div
              className="flex flex-col md:flex-row md:items-center gap-6 py-8"
              style={{ borderTop: "1px solid oklch(0.88 0.008 75)", borderBottom: "1px solid oklch(0.88 0.008 75)" }}
            >
              {/* Date block */}
              <div
                className="shrink-0 flex flex-col items-center justify-center"
                style={{
                  width: 72, height: 72,
                  border: "1px solid oklch(0.62 0.10 75)",
                  background: "oklch(0.62 0.10 75 / 0.05)",
                }}
              >
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.8rem", lineHeight: 1, color: "oklch(0.62 0.10 75)" }}>12</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.62 0.10 75)" }}>July</span>
              </div>

              <div className="flex-1">
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.5rem", color: "oklch(0.16 0.012 60)", marginBottom: "0.4rem" }}>
                  Summer Glow Pop-Up
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.85rem", color: "oklch(0.48 0.010 65)", lineHeight: 1.6 }}>
                  Element III at a special rate. Limited appointments. London venue TBC.
                </p>
              </div>

              <Link href="/book">
                <span className="btn-outline-gold shrink-0" style={{ fontSize: "0.62rem", padding: "0.7rem 1.4rem" }}>
                  Reserve a spot →
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          BOOKING CTA — full-width dark
      ══════════════════════════════════════════ */}
      <section
        className="py-28 md:py-40 relative overflow-hidden"
        style={{ background: "oklch(0.96 0.012 76)" }}
      >
        {/* Background texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(ellipse at 70% 50%, oklch(0.62 0.10 75 / 0.12) 0%, transparent 60%)",
          }}
        />
        <div className="container relative z-10 text-center max-w-2xl">
          <Reveal>
            <p className="eyebrow mb-8" style={{ color: "oklch(0.62 0.10 75)", justifyContent: "center" }}>
              Reserve your ritual
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(2.8rem, 6vw, 6rem)",
                lineHeight: 0.95,
                color: "oklch(0.16 0.012 60)",
                marginBottom: "2rem",
                letterSpacing: "-0.01em",
              }}
            >
              Your element<br />
              <em style={{ fontStyle: "italic", color: "oklch(0.62 0.10 75)" }}>is waiting.</em>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: "1rem",
                color: "oklch(0.48 0.010 65)",
                marginBottom: "3rem",
              }}
            >
              Administered by a qualified practitioner, at your door, in 45–60 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book">
                <span className="btn-gold">Book now →</span>
              </Link>
              <Link href="/elements">
                <span className="btn-outline-gold">
                  Explore elements
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
