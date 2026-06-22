/**
 * RUHI WELLNESS — Contact Page
 * Premium light theme: luxury form, animated reveals
 */
import { useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";
import { toast } from "sonner";

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

const inputStyle: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "0.9rem",
  color: "oklch(0.18 0.012 60)",
  border: "1px solid oklch(0.88 0.008 75)",
  background: "oklch(0.99 0.004 80)",
  fontWeight: 300,
  outline: "none",
  transition: "border-color 200ms",
  width: "100%",
  padding: "1rem 1.1rem",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "0.6rem",
  fontWeight: 500,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "oklch(0.52 0.010 65)",
  display: "block",
  marginBottom: "0.5rem",
};

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Message sent. We'll be in touch shortly.");
  };

  return (
    <Layout>
      {/* Page header */}
      <section className="pt-36 pb-16 md:pt-48 md:pb-20" style={{ background: "var(--ivory)" }}>
        <div className="container max-w-4xl">
          <Reveal>
            <p className="eyebrow mb-6">Get in touch</p>
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
              We're<br />
              <em style={{ fontStyle: "italic", color: "oklch(0.62 0.10 75)" }}>here.</em>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Content */}
      <section className="pb-28 md:pb-40" style={{ background: "var(--ivory)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 max-w-5xl">

            {/* Contact form */}
            <div className="lg:col-span-7">
              <Reveal>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 300,
                    fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                    color: "oklch(0.16 0.012 60)",
                    marginBottom: "2rem",
                    lineHeight: 1.1,
                  }}
                >
                  Send a message
                </h2>

                {submitted ? (
                  <div
                    className="p-10 text-center"
                    style={{
                      background: "var(--ivory-deep)",
                      border: "1px solid oklch(0.88 0.008 75)",
                      animation: "fadeIn 500ms cubic-bezier(0.23,1,0.32,1)",
                    }}
                  >
                    <div
                      style={{
                        width: 56, height: 56,
                        borderRadius: "50%",
                        border: "1px solid oklch(0.62 0.10 75 / 0.4)",
                        background: "oklch(0.62 0.10 75 / 0.06)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        margin: "0 auto 1.5rem",
                      }}
                    >
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: "oklch(0.62 0.10 75)" }}>✓</span>
                    </div>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.5rem", color: "oklch(0.16 0.012 60)", marginBottom: "0.5rem" }}>
                      Message received
                    </p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.88rem", color: "oklch(0.45 0.010 65)" }}>
                      We'll be in touch within a few hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {([
                      { label: "Your name", value: name, setter: setName, type: "text" },
                      { label: "Email address", value: email, setter: setEmail, type: "email" },
                    ] as { label: string; value: string; setter: (v: string) => void; type: string }[]).map(({ label, value, setter, type }) => (
                      <div key={label}>
                        <label style={labelStyle}>{label} *</label>
                        <input
                          type={type}
                          value={value}
                          onChange={(e) => setter(e.target.value)}
                          required
                          style={inputStyle}
                          onFocus={(e) => (e.currentTarget.style.borderColor = "oklch(0.62 0.10 75)")}
                          onBlur={(e) => (e.currentTarget.style.borderColor = "oklch(0.88 0.008 75)")}
                        />
                      </div>
                    ))}
                    <div>
                      <label style={labelStyle}>Message *</label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows={6}
                        style={{ ...inputStyle, resize: "none" }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "oklch(0.62 0.10 75)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "oklch(0.88 0.008 75)")}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn-gold"
                      disabled={!name || !email || !message}
                      style={{ opacity: name && email && message ? 1 : 0.4, width: "100%", justifyContent: "center" }}
                    >
                      Send message →
                    </button>
                  </form>
                )}
              </Reveal>
            </div>

            {/* Direct details */}
            <div className="lg:col-span-5">
              <Reveal delay={120}>
                <div
                  className="p-8 md:p-10"
                  style={{
                    background: "var(--ivory-deep)",
                    border: "1px solid oklch(0.88 0.008 75)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Corner accent */}
                  <div style={{ position: "absolute", top: 0, right: 0, width: 50, height: 50, borderLeft: "1px solid oklch(0.62 0.10 75 / 0.25)", borderBottom: "1px solid oklch(0.62 0.10 75 / 0.25)" }} />

                  <h2
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 300,
                      fontSize: "1.8rem",
                      color: "oklch(0.16 0.012 60)",
                      marginBottom: "2rem",
                      lineHeight: 1.1,
                    }}
                  >
                    Direct contact
                  </h2>

                  <div className="space-y-6">
                    {[
                      { label: "Phone", value: "+44 20 1234 5678", href: "tel:+442012345678" },
                      { label: "Email", value: "hello@ruhiwellness.co.uk", href: "mailto:hello@ruhiwellness.co.uk" },
                      { label: "WhatsApp", value: "Message us on WhatsApp", href: "https://wa.me/442012345678" },
                    ].map(({ label, value, href }) => (
                      <div key={label}>
                        <p style={labelStyle}>{label}</p>
                        <a
                          href={href}
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 300,
                            fontSize: "0.92rem",
                            color: "oklch(0.28 0.010 62)",
                            textDecoration: "none",
                            transition: "color 200ms",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.62 0.10 75)")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.28 0.010 62)")}
                        >
                          {value}
                        </a>
                      </div>
                    ))}

                    <div style={{ borderTop: "1px solid oklch(0.88 0.008 75)", paddingTop: "1.5rem" }}>
                      <p style={labelStyle}>Opening hours</p>
                      <ul className="space-y-2">
                        {[
                          { day: "Mon – Fri", hours: "7:00 am – 9:00 pm" },
                          { day: "Saturday", hours: "8:00 am – 8:00 pm" },
                          { day: "Sunday", hours: "9:00 am – 6:00 pm" },
                        ].map(({ day, hours }) => (
                          <li key={day} className="flex justify-between" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.85rem", color: "oklch(0.35 0.010 62)" }}>
                            <span>{day}</span>
                            <span style={{ color: "oklch(0.52 0.010 65)" }}>{hours}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ borderTop: "1px solid oklch(0.88 0.008 75)", paddingTop: "1.5rem" }}>
                      <p style={labelStyle}>Coverage</p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.85rem", color: "oklch(0.42 0.010 65)", lineHeight: 1.7 }}>
                        We travel to homes, offices, hotels, and select partner locations across London. For events and corporate bookings, contact us directly.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
