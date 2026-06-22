/**
 * RUHI WELLNESS — FAQ Page
 * Premium light theme: animated accordion, luxury layout
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

const FAQ_SECTIONS = [
  {
    category: "General",
    items: [
      { q: "What is IV therapy?", a: "IV (intravenous) therapy delivers vitamins, minerals, and other nutrients directly into the bloodstream via a small cannula. Because it bypasses the digestive system, nutrients are absorbed at a much higher rate than oral supplements — making it an efficient way to support hydration, energy, immunity, and skin health." },
      { q: "Is IV therapy right for me?", a: "Most healthy adults can benefit from IV therapy. If you have any underlying health conditions, are pregnant, or are taking medication, we recommend speaking to your GP before booking. Our practitioners will also conduct a short consultation before every appointment." },
    ],
  },
  {
    category: "Safety",
    items: [
      { q: "Who administers the drip?", a: "Every Ruhi practitioner is a fully qualified nurse or paramedic with specific training in IV cannulation and infusion therapy. You'll see their credentials before your appointment." },
      { q: "Is it safe?", a: "IV therapy is a well-established clinical procedure. Our practitioners follow strict hygiene protocols, use single-use sterile equipment, and conduct a health check before every session. Side effects are rare — mild bruising at the cannula site is the most common and resolves within a few days." },
      { q: "What if I feel unwell during the session?", a: "Your practitioner is trained to respond to any adverse reactions. Sessions can be paused or stopped at any time. We carry appropriate emergency equipment to every appointment." },
    ],
  },
  {
    category: "The elements",
    items: [
      { q: "What's the difference between the four elements?", a: "Each element is formulated for a specific purpose. Element I (Light) focuses on immune support and hydration. Element II (Motion) targets energy and recovery. Element III (Glow) is our skin-brightening formulation built around glutathione. Element IV (Pure) is a minimal reset drip for detox and clarity. See the Elements page for full ingredient details." },
      { q: "Can I book more than one element at a time?", a: "We recommend one element per session. If you're unsure which is right for you, book a free 15-minute consultation and a practitioner will advise based on your goals." },
      { q: "How often can I have a drip?", a: "Most clients book every 2–4 weeks, though this varies by element and individual. Your practitioner will advise on the right frequency for you." },
    ],
  },
  {
    category: "Booking & cancellation",
    items: [
      { q: "How do I book?", a: "Use the Book Now page to select your element, date, time, and location. We'll confirm your appointment within 2 hours. For first-timers, we recommend booking a free consultation first." },
      { q: "What is your cancellation policy?", a: "We ask for at least 24 hours' notice to cancel or reschedule. Cancellations with less than 24 hours' notice may incur a £30 late cancellation fee to cover the practitioner's travel." },
      { q: "When do I pay?", a: "Payment is taken at the time of your appointment, after your session. We accept all major cards and bank transfer." },
    ],
  },
  {
    category: "Aftercare",
    items: [
      { q: "What should I do after my session?", a: "Drink plenty of water for the rest of the day. Avoid alcohol for 24 hours. Light bruising at the cannula site is normal and fades within a few days. If you experience anything unusual, contact us immediately." },
      { q: "When will I feel the effects?", a: "Many clients notice a difference within a few hours. Energy and hydration benefits tend to be felt most quickly; skin benefits from Glow typically become visible over 24–48 hours." },
    ],
  },
  {
    category: "The mobile clinic",
    items: [
      { q: "Where do you come?", a: "We travel to your home, office, hotel room, or select partner locations including gyms and wellness studios across London. If you're unsure whether we cover your area, contact us before booking." },
      { q: "Do I need to prepare anything?", a: "Just a comfortable place to sit or lie down for 45–60 minutes. Your practitioner will bring everything else — all equipment, sterile supplies, and a full setup." },
      { q: "Can you come to events?", a: "Yes. We offer bespoke packages for private events, corporate wellness days, and pop-ups. Get in touch via the Contact page to discuss." },
    ],
  },
];

function AccordionItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (bodyRef.current) setHeight(bodyRef.current.scrollHeight);
  }, [a]);

  return (
    <div
      style={{
        borderBottom: "1px solid oklch(0.88 0.008 75)",
        transition: "background 200ms",
      }}
    >
      <button
        className="w-full flex items-center justify-between py-5 text-left group"
        onClick={() => setOpen(!open)}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            color: open ? "oklch(0.62 0.10 75)" : "oklch(0.18 0.012 60)",
            paddingRight: "2rem",
            transition: "color 250ms",
            lineHeight: 1.3,
          }}
        >
          {q}
        </span>
        <span
          style={{
            flexShrink: 0,
            width: 28, height: 28,
            border: `1px solid ${open ? "oklch(0.62 0.10 75)" : "oklch(0.88 0.008 75)"}`,
            borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: open ? "oklch(0.62 0.10 75)" : "oklch(0.52 0.010 65)",
            fontSize: "1.1rem",
            lineHeight: 1,
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            transition: "all 300ms cubic-bezier(0.23,1,0.32,1)",
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          overflow: "hidden",
          maxHeight: open ? `${height}px` : "0",
          transition: "max-height 400ms cubic-bezier(0.23,1,0.32,1)",
        }}
      >
        <div ref={bodyRef}>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: "0.9rem",
              lineHeight: 1.8,
              color: "oklch(0.42 0.010 65)",
              paddingBottom: "1.5rem",
              maxWidth: "68ch",
            }}
          >
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <Layout>
      {/* Page header */}
      <section className="pt-36 pb-16 md:pt-48 md:pb-20" style={{ background: "var(--ivory)" }}>
        <div className="container max-w-4xl">
          <Reveal>
            <p className="eyebrow mb-6">Support</p>
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
              Questions,<br />
              <em style={{ fontStyle: "italic", color: "oklch(0.62 0.10 75)" }}>answered.</em>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "1.05rem", color: "oklch(0.42 0.010 65)", lineHeight: 1.7, maxWidth: "44ch" }}>
              Everything you need to know before your first Ruhi session.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="pb-24 md:pb-36" style={{ background: "var(--ivory)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
            {/* Category nav — sticky on desktop */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-28">
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(0.52 0.010 65)", marginBottom: "1.2rem" }}>
                  Categories
                </p>
                <ul className="space-y-3">
                  {FAQ_SECTIONS.map((s) => (
                    <li key={s.category}>
                      <a
                        href={`#${s.category.toLowerCase().replace(/\s+/g, "-")}`}
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 300,
                          fontSize: "0.88rem",
                          color: "oklch(0.42 0.010 65)",
                          textDecoration: "none",
                          transition: "color 200ms",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.62 0.10 75)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.42 0.010 65)")}
                      >
                        {s.category}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Accordion */}
            <div className="lg:col-span-9">
              {FAQ_SECTIONS.map((section, si) => (
                <Reveal key={section.category} delay={si * 50} className="mb-14">
                  <div id={section.category.toLowerCase().replace(/\s+/g, "-")}>
                    <p
                      className="eyebrow mb-6"
                      style={{ color: "oklch(0.62 0.10 75)" }}
                    >
                      {section.category}
                    </p>
                    <div>
                      {section.items.map((item, i) => (
                        <AccordionItem key={item.q} q={item.q} a={item.a} index={i} />
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
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
              Still have<br />
              <em style={{ fontStyle: "italic", color: "oklch(0.62 0.10 75)" }}>questions?</em>
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "1rem", color: "oklch(0.48 0.010 65)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
              Speak to a practitioner — free, no commitment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book"><span className="btn-gold">Book a free consultation →</span></Link>
              <Link href="/contact"><span className="btn-outline-gold">Contact us</span></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
