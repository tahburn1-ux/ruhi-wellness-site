/**
 * RUHI WELLNESS — Book Now Page
 * Premium light theme: 4-step booking flow with luxury styling
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
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

const ELEMENTS_OPTIONS = [
  { value: "element-i-light",    label: "Element I",   sub: "Light",  price: "£180", duration: "45–60 min", img: "/manus-storage/element-i-light_9cc13ced.webp" },
  { value: "element-ii-motion",  label: "Element II",  sub: "Motion", price: "£180", duration: "45–60 min", img: "/manus-storage/element-ii-motion_b08cc3cc.webp" },
  { value: "element-iii-glow",   label: "Element III", sub: "Glow",   price: "£200", duration: "45–60 min", img: "/manus-storage/element-iii-glow_eea91e01.webp" },
  { value: "element-iv-pure",    label: "Element IV",  sub: "Pure",   price: "£180", duration: "45–60 min", img: "/manus-storage/element-iv-pure_63be4c60.webp" },
  { value: "consultation",       label: "Consultation", sub: "Free 15-min call", price: "Free", duration: "15 min", img: "" },
];

const TIME_SLOTS = ["07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"];

function getNext14Days() {
  const days = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
}
function formatDateValue(d: Date) { return d.toISOString().split("T")[0]; }

type BookingStep = "element" | "datetime" | "details" | "confirm";

const inputStyle: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "0.9rem",
  color: "oklch(0.18 0.012 60)",
  borderColor: "oklch(0.88 0.008 75)",
  background: "oklch(0.99 0.004 80)",
  fontWeight: 300,
  outline: "none",
  transition: "border-color 200ms",
  width: "100%",
  padding: "1rem 1.1rem",
  border: "1px solid oklch(0.88 0.008 75)",
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

export default function BookNow() {
  const [step, setStep] = useState<BookingStep>("element");
  const [selectedElement, setSelectedElement] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const days = getNext14Days();
  const steps: BookingStep[] = ["element", "datetime", "details", "confirm"];
  const currentStepIndex = steps.indexOf(step);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Booking request received. We'll confirm within 2 hours.");
  };

  const stepLabels = ["Choose element", "Date & time", "Your details", "Confirm"];

  return (
    <Layout>
      {/* Page header */}
      <section className="pt-36 pb-16 md:pt-48 md:pb-20" style={{ background: "var(--ivory)" }}>
        <div className="container max-w-3xl">
          <Reveal>
            <p className="eyebrow mb-6">Reserve your ritual</p>
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
              Book<br />
              <em style={{ fontStyle: "italic", color: "oklch(0.62 0.10 75)" }}>your element.</em>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* First-timer banner */}
      <section className="pb-10" style={{ background: "var(--ivory)" }}>
        <div className="container max-w-3xl">
          <Reveal>
            <div
              className="flex flex-col md:flex-row md:items-center gap-6 p-7 md:p-9"
              style={{
                background: "var(--ivory-deep)",
                border: "1px solid oklch(0.88 0.008 75)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", top: 0, right: 0, width: 50, height: 50, borderLeft: "1px solid oklch(0.62 0.10 75 / 0.25)", borderBottom: "1px solid oklch(0.62 0.10 75 / 0.25)" }} />
              <div className="flex-1">
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.4rem", color: "oklch(0.16 0.012 60)", marginBottom: "0.4rem" }}>
                  First time with Ruhi?
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.88rem", color: "oklch(0.45 0.010 65)", lineHeight: 1.6 }}>
                  Speak to a practitioner first, free of charge, then come back and book with confidence.
                </p>
              </div>
              <button
                className="btn-outline-gold shrink-0"
                style={{ fontSize: "0.62rem", padding: "0.7rem 1.4rem" }}
                onClick={() => {
                  setSelectedElement("consultation");
                  setStep("datetime");
                  toast.info("Free consultation selected. Choose your preferred time.");
                }}
              >
                Speak to a practitioner →
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Booking widget */}
      <section className="pb-28 md:pb-40" style={{ background: "var(--ivory)" }}>
        <div className="container max-w-3xl">
          <Reveal>
            {/* Progress steps */}
            {!submitted && (
              <div className="flex gap-0 mb-14">
                {steps.map((s, i) => (
                  <div key={s} className="flex-1">
                    <div
                      style={{
                        height: 2,
                        background: i <= currentStepIndex ? "oklch(0.62 0.10 75)" : "oklch(0.88 0.008 75)",
                        transition: "background 500ms cubic-bezier(0.23,1,0.32,1)",
                        marginBottom: "0.6rem",
                      }}
                    />
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.6rem",
                        fontWeight: i === currentStepIndex ? 500 : 300,
                        letterSpacing: "0.08em",
                        color: i <= currentStepIndex ? "oklch(0.62 0.10 75)" : "oklch(0.65 0.008 68)",
                        transition: "color 300ms",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")} — {stepLabels[i]}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {submitted ? (
              /* ── Success ── */
              <div className="text-center py-20" style={{ animation: "fadeIn 600ms cubic-bezier(0.23,1,0.32,1)" }}>
                <div
                  style={{
                    width: 72, height: 72,
                    borderRadius: "50%",
                    border: "1px solid oklch(0.62 0.10 75 / 0.4)",
                    background: "oklch(0.62 0.10 75 / 0.06)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 2rem",
                  }}
                >
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "oklch(0.62 0.10 75)" }}>✓</span>
                </div>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 300,
                    fontSize: "clamp(2rem, 4vw, 3.5rem)",
                    color: "oklch(0.16 0.012 60)",
                    marginBottom: "1rem",
                    lineHeight: 1.1,
                  }}
                >
                  Booking request<br />
                  <em style={{ fontStyle: "italic", color: "oklch(0.62 0.10 75)" }}>received.</em>
                </h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "1rem", color: "oklch(0.45 0.010 65)", lineHeight: 1.7, maxWidth: "38ch", margin: "0 auto 2.5rem" }}>
                  We'll confirm your appointment within 2 hours. Check your email for details.
                </p>
                <Link href="/"><span className="btn-outline-gold" style={{ fontSize: "0.62rem" }}>Return home</span></Link>
              </div>
            ) : (
              <div style={{ animation: "fadeIn 400ms cubic-bezier(0.23,1,0.32,1)" }} key={step}>

                {/* ── Step 1: Choose element ── */}
                {step === "element" && (
                  <div>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: "oklch(0.16 0.012 60)", marginBottom: "2rem", lineHeight: 1.1 }}>
                      Which element would you like?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {ELEMENTS_OPTIONS.map((opt) => {
                        const selected = selectedElement === opt.value;
                        return (
                          <button
                            key={opt.value}
                            onClick={() => setSelectedElement(opt.value)}
                            className="text-left flex items-center gap-4 p-5"
                            style={{
                              border: `1px solid ${selected ? "oklch(0.62 0.10 75)" : "oklch(0.88 0.008 75)"}`,
                              background: selected ? "oklch(0.62 0.10 75 / 0.05)" : "oklch(0.99 0.004 80)",
                              transition: "all 200ms cubic-bezier(0.23,1,0.32,1)",
                            }}
                          >
                            {opt.img && (
                              <img src={opt.img} alt={opt.sub} style={{ width: 48, height: 64, objectFit: "cover", flexShrink: 0 }} />
                            )}
                            <div>
                              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: selected ? "oklch(0.62 0.10 75)" : "oklch(0.52 0.010 65)", marginBottom: "0.2rem" }}>
                                {opt.label}
                              </p>
                              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.3rem", color: "oklch(0.16 0.012 60)", lineHeight: 1 }}>
                                {opt.sub}
                              </p>
                              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.72rem", color: "oklch(0.52 0.010 65)", marginTop: "0.3rem" }}>
                                {opt.price} · {opt.duration}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    <div className="mt-10 flex justify-end">
                      <button className="btn-gold" disabled={!selectedElement} onClick={() => setStep("datetime")} style={{ opacity: selectedElement ? 1 : 0.4 }}>
                        Continue →
                      </button>
                    </div>
                  </div>
                )}

                {/* ── Step 2: Date & time ── */}
                {step === "datetime" && (
                  <div>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: "oklch(0.16 0.012 60)", marginBottom: "2rem", lineHeight: 1.1 }}>
                      Choose your date & time
                    </h2>

                    <p style={labelStyle}>Available dates</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-10">
                      {days.map((d) => {
                        const val = formatDateValue(d);
                        const sel = selectedDate === val;
                        return (
                          <button
                            key={val}
                            onClick={() => setSelectedDate(val)}
                            className="p-3 text-center"
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.78rem",
                              color: sel ? "oklch(0.62 0.10 75)" : "oklch(0.28 0.010 62)",
                              border: `1px solid ${sel ? "oklch(0.62 0.10 75)" : "oklch(0.88 0.008 75)"}`,
                              background: sel ? "oklch(0.62 0.10 75 / 0.06)" : "oklch(0.99 0.004 80)",
                              fontWeight: sel ? 500 : 300,
                              transition: "all 200ms",
                            }}
                          >
                            {formatDate(d)}
                          </button>
                        );
                      })}
                    </div>

                    {selectedDate && (
                      <>
                        <p style={labelStyle}>Available times</p>
                        <div className="grid grid-cols-4 md:grid-cols-7 gap-2 mb-10">
                          {TIME_SLOTS.map((t) => {
                            const sel = selectedTime === t;
                            return (
                              <button
                                key={t}
                                onClick={() => setSelectedTime(t)}
                                className="p-2.5 text-center"
                                style={{
                                  fontFamily: "'DM Sans', sans-serif",
                                  fontSize: "0.78rem",
                                  color: sel ? "oklch(0.62 0.10 75)" : "oklch(0.28 0.010 62)",
                                  border: `1px solid ${sel ? "oklch(0.62 0.10 75)" : "oklch(0.88 0.008 75)"}`,
                                  background: sel ? "oklch(0.62 0.10 75 / 0.06)" : "oklch(0.99 0.004 80)",
                                  fontWeight: sel ? 500 : 300,
                                  transition: "all 200ms",
                                }}
                              >
                                {t}
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}

                    <div className="flex justify-between">
                      <button className="btn-outline-gold" style={{ fontSize: "0.62rem" }} onClick={() => setStep("element")}>← Back</button>
                      <button className="btn-gold" disabled={!selectedDate || !selectedTime} onClick={() => setStep("details")} style={{ opacity: selectedDate && selectedTime ? 1 : 0.4 }}>
                        Continue →
                      </button>
                    </div>
                  </div>
                )}

                {/* ── Step 3: Details ── */}
                {step === "details" && (
                  <div>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: "oklch(0.16 0.012 60)", marginBottom: "2rem", lineHeight: 1.1 }}>
                      Your details
                    </h2>
                    <div className="space-y-5">
                      {([
                        { label: "Full name", value: name, setter: setName, type: "text" },
                        { label: "Email address", value: email, setter: setEmail, type: "email" },
                        { label: "Phone number", value: phone, setter: setPhone, type: "tel" },
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
                        <label style={labelStyle}>Appointment address *</label>
                        <textarea
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          rows={3}
                          placeholder="Your home, office, or preferred location"
                          style={{ ...inputStyle, resize: "none" }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = "oklch(0.62 0.10 75)")}
                          onBlur={(e) => (e.currentTarget.style.borderColor = "oklch(0.88 0.008 75)")}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Notes or health information</label>
                        <textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          rows={3}
                          placeholder="Allergies, medical conditions, or anything else we should know"
                          style={{ ...inputStyle, resize: "none" }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = "oklch(0.62 0.10 75)")}
                          onBlur={(e) => (e.currentTarget.style.borderColor = "oklch(0.88 0.008 75)")}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between mt-10">
                      <button className="btn-outline-gold" style={{ fontSize: "0.62rem" }} onClick={() => setStep("datetime")}>← Back</button>
                      <button className="btn-gold" disabled={!name || !email || !phone || !address} onClick={() => setStep("confirm")} style={{ opacity: name && email && phone && address ? 1 : 0.4 }}>
                        Review booking →
                      </button>
                    </div>
                  </div>
                )}

                {/* ── Step 4: Confirm ── */}
                {step === "confirm" && (
                  <div>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: "oklch(0.16 0.012 60)", marginBottom: "2rem", lineHeight: 1.1 }}>
                      Confirm your booking
                    </h2>

                    <div
                      className="p-7 mb-8 space-y-4"
                      style={{ background: "var(--ivory-deep)", border: "1px solid oklch(0.88 0.008 75)" }}
                    >
                      {[
                        { label: "Element", value: (() => { const e = ELEMENTS_OPTIONS.find(e => e.value === selectedElement); return e ? `${e.label} — ${e.sub}` : ""; })() },
                        { label: "Date", value: selectedDate ? new Date(selectedDate + "T12:00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "" },
                        { label: "Time", value: selectedTime },
                        { label: "Name", value: name },
                        { label: "Email", value: email },
                        { label: "Phone", value: phone },
                        { label: "Address", value: address },
                        ...(notes ? [{ label: "Notes", value: notes }] : []),
                      ].map(({ label, value }) => (
                        <div key={label} className="flex gap-6">
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "oklch(0.52 0.010 65)", width: 72, flexShrink: 0, paddingTop: "2px" }}>
                            {label}
                          </span>
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "oklch(0.22 0.010 62)", fontWeight: 300, lineHeight: 1.5 }}>
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.78rem", color: "oklch(0.52 0.010 65)", lineHeight: 1.7, marginBottom: "2rem" }}>
                      By confirming, you agree that this is a booking request. We'll confirm availability and send a confirmation email within 2 hours. Payment is taken at the time of your appointment.
                    </p>

                    <div className="flex justify-between">
                      <button className="btn-outline-gold" style={{ fontSize: "0.62rem" }} onClick={() => setStep("details")}>← Back</button>
                      <button className="btn-gold" onClick={handleSubmit}>Confirm booking →</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
