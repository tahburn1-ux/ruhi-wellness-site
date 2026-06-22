/**
 * RUHI WELLNESS — The Science Page
 * Premium light theme: credibility statements, luxury layout, animated reveals
 */
import { useEffect, useRef } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("fade-up");
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setTimeout(() => el.classList.add("visible"), delay); obs.unobserve(el); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className={className}>{children}</div>;
}

const SCIENCE_ITEMS = [
  {
    num: "I",
    name: "Light",
    img: "/manus-storage/element-i-light_9cc13ced.webp",
    tagline: "Immune support & hydration",
    statement: "Vitamin C and zinc are well known to support the same processes in the body that keep skin and the immune system functioning well, which is why they're traditionally paired in nutrition science.",
    ingredients: ["Vitamin C", "Zinc", "B-Complex", "Magnesium", "Saline"],
  },
  {
    num: "II",
    name: "Motion",
    img: "/manus-storage/element-ii-motion_b08cc3cc.webp",
    tagline: "Energy & recovery",
    statement: "Vitamin B12 doesn't work in isolation — the body relies on a small group of B vitamins working together to convert nutrients into usable energy, which is the thinking behind this formulation.",
    ingredients: ["B12", "B-Complex", "Magnesium", "Amino acids", "Saline"],
  },
  {
    num: "III",
    name: "Glow",
    img: "/manus-storage/element-iii-glow_eea91e01.webp",
    tagline: "Skin radiance",
    statement: "Vitamin C and glutathione are widely studied for the way they support and renew each other in the body, allowing both to remain effective for longer than either would alone.",
    ingredients: ["Glutathione", "Vitamin C", "Biotin", "Zinc", "Saline"],
  },
  {
    num: "IV",
    name: "Pure",
    img: "/manus-storage/element-iv-pure_63be4c60.webp",
    tagline: "Detox & clarity",
    statement: "Glutathione is often described as the body's master antioxidant, playing a central role in the systems the body already uses to manage everyday oxidative stress.",
    ingredients: ["Glutathione", "Vitamin C", "Saline"],
  },
];

export default function TheScience() {
  return (
    <Layout>
      {/* Page header */}
      <section className="pt-36 pb-16 md:pt-48 md:pb-20" style={{ background: "var(--ivory)" }}>
        <div className="container max-w-4xl">
          <Reveal>
            <p className="eyebrow mb-6">Formulation rationale</p>
          </Reveal>
          <Reveal delay={100}>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(3.5rem, 8vw, 8rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                color: "oklch(0.16 0.012 60)",
                marginBottom: "1.5rem",
              }}
            >
              The thinking<br />
              <em style={{ fontStyle: "italic", color: "oklch(0.62 0.10 75)" }}>behind every drip.</em>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "1.05rem", color: "oklch(0.42 0.010 65)", lineHeight: 1.7, maxWidth: "52ch" }}>
              We don't guess at combinations. Every formulation is built on how these nutrients actually work together in the body.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Science statements */}
      <section className="pb-24 md:pb-36" style={{ background: "var(--ivory)" }}>
        <div className="container max-w-5xl">
          {SCIENCE_ITEMS.map((item, i) => (
            <Reveal key={item.num} delay={i * 80}>
              <div
                className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 py-16 ${i < SCIENCE_ITEMS.length - 1 ? "border-b" : ""}`}
                style={{ borderColor: "oklch(0.88 0.008 75)" }}
              >
                {/* Image */}
                <div className="md:col-span-3 flex md:justify-start">
                  <div
                    style={{
                      width: 130,
                      height: 180,
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <img
                      src={item.img}
                      alt={`Element ${item.num} — ${item.name}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
                    />
                  </div>
                </div>

                {/* Text */}
                <div className="md:col-span-9">
                  <div className="flex items-center gap-4 mb-4">
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.62 0.10 75)" }}>
                      Element {item.num}
                    </p>
                    <div style={{ height: 1, flex: 1, background: "oklch(0.88 0.008 75)" }} />
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 300, letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(0.55 0.010 65)" }}>
                      {item.tagline}
                    </p>
                  </div>

                  <h2
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 300,
                      fontSize: "clamp(2rem, 4vw, 3.5rem)",
                      color: "oklch(0.16 0.012 60)",
                      marginBottom: "1.2rem",
                      lineHeight: 1,
                    }}
                  >
                    {item.name}
                  </h2>

                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      fontWeight: 300,
                      fontSize: "clamp(1.05rem, 2vw, 1.3rem)",
                      color: "oklch(0.35 0.010 65)",
                      lineHeight: 1.65,
                      marginBottom: "1.8rem",
                      maxWidth: "60ch",
                    }}
                  >
                    "{item.statement}"
                  </p>

                  {/* Ingredients */}
                  <div className="flex flex-wrap gap-2">
                    {item.ingredients.map((ing) => (
                      <span
                        key={ing}
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 300,
                          fontSize: "0.72rem",
                          letterSpacing: "0.08em",
                          color: "oklch(0.45 0.010 65)",
                          border: "1px solid oklch(0.88 0.008 75)",
                          padding: "0.3rem 0.8rem",
                        }}
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12" style={{ background: "var(--ivory-deep)", borderTop: "1px solid oklch(0.88 0.008 75)" }}>
        <div className="container max-w-4xl">
          <Reveal>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.78rem", color: "oklch(0.52 0.010 65)", lineHeight: 1.8 }}>
              <strong style={{ fontWeight: 500, color: "oklch(0.35 0.010 62)" }}>Disclaimer:</strong> This page reflects general nutritional understanding and is not medical advice. Individual results vary. Speak to your doctor if you have any health concerns before booking.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32" style={{ background: "oklch(0.96 0.012 76)" }}>
        <div className="container max-w-2xl text-center">
          <Reveal>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(2.2rem, 4vw, 4rem)",
                lineHeight: 1.05,
                color: "oklch(0.16 0.012 60)",
                marginBottom: "1.5rem",
              }}
            >
              Questions about<br />
              <em style={{ fontStyle: "italic", color: "oklch(0.62 0.10 75)" }}>what's in your drip?</em>
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "1rem", color: "oklch(0.48 0.010 65)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
              Speak to a practitioner — free, no commitment.
            </p>
            <Link href="/book"><span className="btn-gold">Book a free consultation →</span></Link>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
