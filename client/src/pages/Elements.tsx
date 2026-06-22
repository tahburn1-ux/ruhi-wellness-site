/**
 * RUHI WELLNESS — Elements Page
 * Premium light theme: flip cards, animated reveals, quiz
 */
import { useEffect, useRef, useState } from "react";
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

const ELEMENTS = [
  {
    num: "I", name: "Light", label: "Element I",
    img: "/manus-storage/element-i-light_9cc13ced.webp",
    price: "£180", duration: "45–60 minutes",
    tagline: "Brighten. Replenish. Defend.",
    topBenefits: ["Strengthens daily immune defence", "Brightens and refreshes the complexion"],
    benefits: ["Strengthens daily immune defence", "Brightens and refreshes the complexion", "Replenishes hydration at a cellular level", "Supports collagen production"],
    contains: [
      { name: "Vitamin C (ascorbic acid)", note: "the brightening core, fuelling collagen synthesis" },
      { name: "Zinc", note: "vitamin C's natural partner, supporting skin repair and immune signalling" },
      { name: "Electrolyte blend", note: "sodium, potassium, magnesium — rehydrates at a cellular level" },
      { name: "Saline base", note: "" },
    ],
    why: "Zinc and vitamin C work the same pathway — both essential to collagen formation, so pairing them does more than either alone.",
    aftercare: "Drink water for the rest of the day; avoid alcohol for 24 hours; light bruising is normal and fades within a few days.",
  },
  {
    num: "II", name: "Motion", label: "Element II",
    img: "/manus-storage/element-ii-motion_b08cc3cc.webp",
    price: "£180", duration: "45–60 minutes",
    tagline: "Energise. Focus. Recover.",
    topBenefits: ["Boosts natural energy levels", "Supports mental clarity and focus"],
    benefits: ["Boosts natural energy levels", "Supports mental clarity and focus", "Aids recovery after exercise or travel", "Combats fatigue from a demanding week"],
    contains: [
      { name: "Vitamin B12 (methylcobalamin)", note: "the energy catalyst behind focus and natural vitality" },
      { name: "B-complex (B6, folate)", note: "B12 can't be metabolised efficiently without these" },
      { name: "Taurine", note: "supports endurance and recovery" },
      { name: "Saline base", note: "" },
    ],
    why: "B12 alone is incomplete — B6 and folate are what your body uses to put it to work; taurine is added specifically for recovery.",
    aftercare: "Drink water for the rest of the day; avoid alcohol for 24 hours; light bruising is normal and fades within a few days.",
  },
  {
    num: "III", name: "Glow", label: "Element III",
    img: "/manus-storage/element-iii-glow_eea91e01.webp",
    price: "£200", duration: "45–60 minutes",
    tagline: "Clarify. Illuminate. Renew.",
    topBenefits: ["Visibly brightens and evens skin tone", "Supports a luminous, lit-from-within complexion"],
    benefits: ["Visibly brightens and evens skin tone", "Supports a luminous, lit-from-within complexion", "Antioxidant support against everyday environmental stress", "A noticeable lift before an event"],
    contains: [
      { name: "Vitamin C", note: "regenerates glutathione, extending its effect" },
      { name: "Glutathione", note: "the master antioxidant, clarifying skin from within" },
      { name: "Alpha lipoic acid", note: "protects and recycles glutathione" },
      { name: "Saline base", note: "" },
    ],
    why: "Vitamin C actively regenerates spent glutathione, and alpha lipoic acid protects both from breaking down too quickly — each ingredient makes the others work harder.",
    aftercare: "Drink water for the rest of the day; avoid alcohol for 24 hours; light bruising is normal and fades within a few days.",
  },
  {
    num: "IV", name: "Pure", label: "Element IV",
    img: "/manus-storage/element-iv-pure_63be4c60.webp",
    price: "£180", duration: "45–60 minutes",
    tagline: "Reset. Detox. Restore.",
    topBenefits: ["Supports natural detoxification", "Promotes mental clarity and a sense of reset"],
    benefits: ["Supports natural detoxification", "Promotes mental clarity and a sense of reset", "Reduces feelings of sluggishness", "A clean foundation after indulgence or stress"],
    contains: [
      { name: "Glutathione (high-strength)", note: "supports the body's own detox pathways" },
      { name: "Magnesium", note: "eases tension that comes with a true reset" },
      { name: "Saline base", note: "" },
    ],
    why: "Intentionally minimal — no B-vitamins competing for attention, just glutathione and the one mineral that helps the body relax into the reset, not stimulate it.",
    aftercare: "Drink water for the rest of the day; avoid alcohol for 24 hours; light bruising is normal and fades within a few days.",
  },
];

const QUIZ_QUESTIONS = [
  { q: "What does your body need most right now?", options: [{ label: "Energy and focus", value: "motion" }, { label: "Glowing skin", value: "glow" }, { label: "A full reset", value: "pure" }, { label: "Immune support and hydration", value: "light" }] },
  { q: "How would you describe your past week?", options: [{ label: "Exhausting — work or travel", value: "motion" }, { label: "Stressful — I need to reset", value: "pure" }, { label: "I have an event coming up", value: "glow" }, { label: "I've been under the weather", value: "light" }] },
  { q: "What matters most to you right now?", options: [{ label: "Looking my best", value: "glow" }, { label: "Feeling sharp and energised", value: "motion" }, { label: "Cleansing and detoxing", value: "pure" }, { label: "Strengthening my defences", value: "light" }] },
];

const ELEMENT_MAP: Record<string, typeof ELEMENTS[0]> = { light: ELEMENTS[0], motion: ELEMENTS[1], glow: ELEMENTS[2], pure: ELEMENTS[3] };

function ElementCard({ el, index }: { el: typeof ELEMENTS[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <Reveal delay={index * 80}>
      <div className="flex flex-col">
        {/* Flip card */}
        <div
          className="relative cursor-pointer"
          style={{ perspective: "1200px", aspectRatio: "3/5" }}
          onClick={() => setFlipped(!flipped)}
        >
          <div
            className="w-full h-full"
            style={{
              transformStyle: "preserve-3d",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
              transition: "transform 700ms cubic-bezier(0.23,1,0.32,1)",
            }}
          >
            {/* Front */}
            <div className="absolute inset-0" style={{ backfaceVisibility: "hidden", overflow: "hidden" }}>
              <img
                src={el.img}
                alt={el.name}
                className="w-full h-full object-cover"
                style={{ transition: "transform 600ms cubic-bezier(0.23,1,0.32,1)" }}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6"
                style={{ background: "linear-gradient(to top, oklch(0.10 0.010 60 / 0.80) 0%, transparent 55%)" }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.78 0.08 78)", marginBottom: "0.35rem" }}>
                  {el.label}
                </p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: "oklch(0.97 0.005 80)", lineHeight: 1, marginBottom: "0.5rem" }}>
                  {el.name}
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", color: "oklch(0.72 0.005 78)", fontWeight: 300 }}>
                  Tap to see what's inside
                </p>
              </div>
            </div>

            {/* Back — cream/ivory/gold, full information */}
            <div
              className="absolute inset-0 overflow-y-auto"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                background: "oklch(0.985 0.008 78)",
                border: "1px solid oklch(0.88 0.008 75)",
              }}
            >
              {/* Gold top accent line */}
              <div style={{ height: 3, background: "linear-gradient(to right, oklch(0.62 0.10 75), oklch(0.78 0.08 78))" }} />
              <div className="p-5 flex flex-col gap-4">
                {/* Header */}
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.55rem", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "oklch(0.62 0.10 75)", marginBottom: "0.25rem" }}>
                    {el.label}
                  </p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.8rem", color: "oklch(0.16 0.012 60)", lineHeight: 1, marginBottom: "0.3rem" }}>
                    {el.name}
                  </p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", color: "oklch(0.55 0.010 65)", fontWeight: 300, fontStyle: "italic" }}>
                    {el.tagline}
                  </p>
                </div>

                {/* Price + duration */}
                <div className="flex items-center justify-between py-3" style={{ borderTop: "1px solid oklch(0.88 0.008 75)", borderBottom: "1px solid oklch(0.88 0.008 75)" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 300, color: "oklch(0.62 0.10 75)" }}>{el.price}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "oklch(0.52 0.010 65)", letterSpacing: "0.08em" }}>{el.duration}</span>
                </div>

                {/* Benefits */}
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.52 0.010 65)", marginBottom: "0.5rem" }}>Benefits</p>
                  <ul className="space-y-1.5">
                    {el.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "oklch(0.32 0.010 62)", fontWeight: 300, lineHeight: 1.4 }}>
                        <span style={{ color: "oklch(0.62 0.10 75)", marginTop: "1px", flexShrink: 0, fontSize: "0.6rem" }}>◆</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contains */}
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.52 0.010 65)", marginBottom: "0.5rem" }}>Contains</p>
                  <ul className="space-y-1.5">
                    {el.contains.map((c) => (
                      <li key={c.name} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "oklch(0.32 0.010 62)", fontWeight: 300, lineHeight: 1.4 }}>
                        <span style={{ fontWeight: 500, color: "oklch(0.22 0.012 60)" }}>{c.name}</span>
                        {c.note && <span style={{ color: "oklch(0.52 0.010 65)" }}> — {c.note}</span>}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Why this combination */}
                <div style={{ background: "oklch(0.96 0.012 76)", padding: "0.75rem", borderLeft: "2px solid oklch(0.62 0.10 75)" }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.62 0.10 75)", marginBottom: "0.4rem" }}>Why this combination</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", lineHeight: 1.6, color: "oklch(0.35 0.010 62)", fontWeight: 300 }}>{el.why}</p>
                </div>

                {/* Aftercare */}
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.52 0.010 65)", marginBottom: "0.4rem" }}>Aftercare</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", lineHeight: 1.6, color: "oklch(0.42 0.010 65)", fontWeight: 300 }}>{el.aftercare}</p>
                </div>

                {/* CTA */}
                <Link href="/book">
                  <span className="btn-gold" style={{ fontSize: "0.58rem", display: "block", textAlign: "center", padding: "0.7rem 1rem" }}>Book {el.name} →</span>
                </Link>

                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem", color: "oklch(0.62 0.10 75)", letterSpacing: "0.1em", textAlign: "center", cursor: "pointer" }}>Tap to flip back</p>
              </div>
            </div>
          </div>
        </div>

        {/* Full details toggle */}
        <div className="mt-5">
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.62rem",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "oklch(0.62 0.10 75)",
              paddingBottom: "2px",
              background: "none",
              border: "none",
              borderBottom: "1px solid oklch(0.62 0.10 75)",
              cursor: "pointer",
            } as React.CSSProperties}
          >
            {expanded ? "Hide details ↑" : "See full details ↓"}
          </button>

          {expanded && (
            <div
              className="mt-6 space-y-6"
              style={{
                animation: "fadeIn 400ms cubic-bezier(0.23,1,0.32,1)",
              }}
            >
              {/* Contains */}
              <div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.52 0.010 65)", marginBottom: "0.75rem" }}>Contains</p>
                <ul className="space-y-2">
                  {el.contains.map((c) => (
                    <li key={c.name} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "oklch(0.30 0.010 62)", fontWeight: 300, lineHeight: 1.5 }}>
                      <span style={{ fontWeight: 500 }}>{c.name}</span>
                      {c.note && <span style={{ color: "oklch(0.52 0.010 65)" }}> — {c.note}</span>}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Why */}
              <div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.52 0.010 65)", marginBottom: "0.75rem" }}>Why this combination</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", lineHeight: 1.7, color: "oklch(0.35 0.010 62)", fontWeight: 300 }}>{el.why}</p>
              </div>

              {/* Benefits */}
              <div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.52 0.010 65)", marginBottom: "0.75rem" }}>Benefits</p>
                <ul className="space-y-2">
                  {el.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "oklch(0.35 0.010 62)", fontWeight: 300 }}>
                      <span style={{ color: "oklch(0.62 0.10 75)", marginTop: "2px", flexShrink: 0 }}>—</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* What to expect */}
              <div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.52 0.010 65)", marginBottom: "0.75rem" }}>What to expect</p>
                <ol className="space-y-2">
                  {["Practitioner arrives at your home, office, or partner location, fully set up", "Short consultation to confirm fit", "Line placed — a light pinch", "Relax for 45–60 minutes", "Line removed, site checked"].map((step, i) => (
                    <li key={i} className="flex items-start gap-3" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "oklch(0.35 0.010 62)", fontWeight: 300 }}>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "oklch(0.62 0.10 75)", flexShrink: 0, marginTop: "-1px" }}>{i + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Aftercare */}
              <div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.52 0.010 65)", marginBottom: "0.75rem" }}>Aftercare</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", lineHeight: 1.7, color: "oklch(0.35 0.010 62)", fontWeight: 300 }}>{el.aftercare}</p>
              </div>

              <Link href="/book">
                <span className="btn-gold" style={{ fontSize: "0.62rem", display: "inline-block" }}>Book {el.name} — {el.price} →</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}

function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    if (step < QUIZ_QUESTIONS.length - 1) { setAnswers(newAnswers); setStep(step + 1); }
    else {
      const tally: Record<string, number> = {};
      newAnswers.forEach((a) => { tally[a] = (tally[a] || 0) + 1; });
      const winner = Object.entries(tally).sort((a, b) => b[1] - a[1])[0][0];
      setResult(winner);
    }
  };

  const reset = () => { setStep(0); setAnswers([]); setResult(null); };
  const resultEl = result ? ELEMENT_MAP[result] : null;

  return (
    <div
      className="p-8 md:p-14"
      style={{
        background: "var(--ivory-deep)",
        border: "1px solid oklch(0.88 0.008 75)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Corner accent */}
      <div style={{ position: "absolute", top: 0, left: 0, width: 60, height: 60, borderRight: "1px solid oklch(0.62 0.10 75 / 0.3)", borderBottom: "1px solid oklch(0.62 0.10 75 / 0.3)" }} />
      <div style={{ position: "absolute", bottom: 0, right: 0, width: 60, height: 60, borderLeft: "1px solid oklch(0.62 0.10 75 / 0.3)", borderTop: "1px solid oklch(0.62 0.10 75 / 0.3)" }} />

      <p className="eyebrow mb-5">Find your element</p>
      <h3
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: "oklch(0.16 0.012 60)", marginBottom: "2rem", lineHeight: 1.1 }}
      >
        Which one is right for me?
      </h3>

      {!result ? (
        <div>
          {/* Progress bar */}
          <div className="flex gap-1 mb-6">
            {QUIZ_QUESTIONS.map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1, height: 2,
                  background: i <= step ? "oklch(0.62 0.10 75)" : "oklch(0.88 0.008 75)",
                  transition: "background 300ms",
                }}
              />
            ))}
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.62 0.10 75)", marginBottom: "0.75rem" }}>
            Question {step + 1} of {QUIZ_QUESTIONS.length}
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)", color: "oklch(0.16 0.012 60)", marginBottom: "2rem" }}>
            {QUIZ_QUESTIONS[step].q}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {QUIZ_QUESTIONS[step].options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleAnswer(opt.value)}
                className="text-left p-5 group"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.9rem",
                  color: "oklch(0.28 0.010 62)",
                  border: "1px solid oklch(0.88 0.008 75)",
                  background: "oklch(0.99 0.004 80)",
                  fontWeight: 300,
                  transition: "all 200ms cubic-bezier(0.23,1,0.32,1)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.62 0.10 75)"; (e.currentTarget as HTMLElement).style.background = "oklch(0.62 0.10 75 / 0.04)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.88 0.008 75)"; (e.currentTarget as HTMLElement).style.background = "oklch(0.99 0.004 80)"; }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8 items-start" style={{ animation: "fadeIn 500ms cubic-bezier(0.23,1,0.32,1)" }}>
          <img src={resultEl!.img} alt={resultEl!.name} className="w-36 h-52 object-cover shrink-0" style={{ border: "1px solid oklch(0.88 0.008 75)" }} />
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.62 0.10 75)", marginBottom: "0.5rem" }}>
              Your recommended element
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2rem, 4vw, 3rem)", color: "oklch(0.16 0.012 60)", marginBottom: "0.5rem", lineHeight: 1 }}>
              {resultEl!.label} — {resultEl!.name}
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "oklch(0.42 0.010 65)", fontWeight: 300, fontStyle: "italic", marginBottom: "1.5rem" }}>
              {resultEl!.tagline}
            </p>
            <ul className="space-y-2 mb-8">
              {resultEl!.topBenefits.map((b) => (
                <li key={b} className="flex items-start gap-2" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "oklch(0.35 0.010 62)", fontWeight: 300 }}>
                  <span style={{ color: "oklch(0.62 0.10 75)", flexShrink: 0 }}>—</span> {b}
                </li>
              ))}
            </ul>
            <div className="flex gap-4 flex-wrap">
              <Link href="/book">
                <span className="btn-gold" style={{ fontSize: "0.62rem" }}>Book {resultEl!.name} — {resultEl!.price} →</span>
              </Link>
              <button onClick={reset} className="btn-outline-gold" style={{ fontSize: "0.62rem" }}>
                Retake quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Elements() {
  return (
    <Layout>
      {/* Page header */}
      <section className="pt-36 pb-16 md:pt-48 md:pb-20" style={{ background: "var(--ivory)" }}>
        <div className="container max-w-4xl">
          <Reveal>
            <p className="eyebrow mb-6">Our formulations</p>
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
              The four<br />
              <em style={{ fontStyle: "italic", color: "oklch(0.62 0.10 75)" }}>elements.</em>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "1.05rem", color: "oklch(0.42 0.010 65)", lineHeight: 1.7, maxWidth: "44ch" }}>
              Tap each element to see what's inside. Every formulation is administered by a qualified practitioner at your door.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Element cards */}
      <section className="pb-24 md:pb-36" style={{ background: "var(--ivory)" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {ELEMENTS.map((el, i) => (
              <ElementCard key={el.num} el={el} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="pb-24 md:pb-36" style={{ background: "var(--ivory)" }}>
        <div className="container max-w-3xl">
          <Reveal>
            <Quiz />
          </Reveal>
        </div>
      </section>

      {/* Free consultation */}
      <section className="py-24 md:py-32" style={{ background: "oklch(0.96 0.012 76)" }}>
        <div className="container max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow mb-6" style={{ color: "oklch(0.62 0.10 75)", justifyContent: "center", display: "flex" }}>Free consultation</p>
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
              Not sure which element<br />
              <em style={{ fontStyle: "italic", color: "oklch(0.62 0.10 75)" }}>is right for you?</em>
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "1rem", color: "oklch(0.48 0.010 65)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
              Book a free 15-minute call with a Ruhi practitioner before you commit to anything.
            </p>
            <Link href="/book">
              <span className="btn-gold">Book a free consultation →</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
