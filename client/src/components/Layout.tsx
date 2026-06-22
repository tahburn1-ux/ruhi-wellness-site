/**
 * RUHI WELLNESS — Layout
 * Premium: custom cursor, scroll-aware nav, luxury dark footer
 */
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";

/* ── Custom cursor (desktop only) ── */
function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    let mx = -200, my = -200;
    let rx = -200, ry = -200;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };

    const tick = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      if (dotRef.current) dotRef.current.style.transform = `translate(calc(${mx}px - 50%), calc(${my}px - 50%))`;
      if (ringRef.current) ringRef.current.style.transform = `translate(calc(${rx}px - 50%), calc(${ry}px - 50%))`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    const grow = () => { if (ringRef.current) { ringRef.current.style.width = "52px"; ringRef.current.style.height = "52px"; } };
    const shrink = () => { if (ringRef.current) { ringRef.current.style.width = "32px"; ringRef.current.style.height = "32px"; } };

    const targets = document.querySelectorAll("a, button, [role=button]");
    targets.forEach(el => { el.addEventListener("mouseenter", grow); el.addEventListener("mouseleave", shrink); });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed", top: 0, left: 0, width: 6, height: 6,
          borderRadius: "50%", background: "oklch(0.62 0.10 75)",
          pointerEvents: "none", zIndex: 9999,
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed", top: 0, left: 0, width: 32, height: 32,
          borderRadius: "50%", border: "1px solid oklch(0.62 0.10 75 / 0.55)",
          pointerEvents: "none", zIndex: 9998,
          transition: "width 200ms cubic-bezier(0.23,1,0.32,1), height 200ms cubic-bezier(0.23,1,0.32,1)",
        }}
      />
    </>
  );
}

const NAV_LINKS = [
  { label: "Elements", href: "/elements" },
  { label: "The Science", href: "/the-science" },
  { label: "Book Now", href: "/book" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const isHome = location === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const opaque = scrolled || !isHome;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--ivory)" }}>
      <CustomCursor />

      {/* ── NAV ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: opaque ? "oklch(0.985 0.006 80 / 0.96)" : "transparent",
          backdropFilter: opaque ? "blur(20px) saturate(1.4)" : "none",
          borderBottom: opaque ? "1px solid oklch(0.88 0.008 75 / 0.7)" : "none",
          transition: "background 500ms cubic-bezier(0.23,1,0.32,1), border-color 500ms, backdrop-filter 500ms",
        }}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/">
            <img
              src="/manus-storage/ruhi-logo-transparent_e4237816.png"
              alt="Ruhi Wellness"
              style={{
                height: "52px",
                width: "auto",
                objectFit: "contain",
                transition: "opacity 400ms",
                filter: opaque ? "none" : "brightness(0) invert(1)",
              }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className="relative group"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: "0.65rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: opaque
                      ? (location === link.href ? "oklch(0.62 0.10 75)" : "oklch(0.32 0.010 62)")
                      : "oklch(0.88 0.005 80)",
                    transition: "color 300ms",
                  }}
                >
                  {link.label}
                  <span
                    style={{
                      position: "absolute",
                      bottom: "-3px",
                      left: 0,
                      height: "1px",
                      background: "oklch(0.62 0.10 75)",
                      width: location === link.href ? "100%" : "0%",
                      transition: "width 300ms cubic-bezier(0.23,1,0.32,1)",
                    }}
                    className="group-hover:!w-full"
                  />
                </span>
              </Link>
            ))}
            <Link href="/book">
              <span className="btn-gold" style={{ fontSize: "0.62rem", padding: "0.65rem 1.6rem" }}>
                Book Now
              </span>
            </Link>
          </nav>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 flex flex-col gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-5 h-px"
                style={{
                  background: opaque ? "oklch(0.16 0.012 60)" : "oklch(0.97 0.005 80)",
                  transition: "all 300ms",
                  transform:
                    menuOpen && i === 0 ? "rotate(45deg) translate(3px, 3px)" :
                    menuOpen && i === 2 ? "rotate(-45deg) translate(3px, -3px)" : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className="md:hidden overflow-hidden"
          style={{
            maxHeight: menuOpen ? "380px" : "0",
            background: "oklch(0.985 0.006 80 / 0.98)",
            backdropFilter: "blur(20px)",
            transition: "max-height 400ms cubic-bezier(0.23,1,0.32,1)",
            borderBottom: menuOpen ? "1px solid oklch(0.88 0.008 75)" : "none",
          }}
        >
          <nav className="container py-6 flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: "0.65rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: location === link.href ? "oklch(0.62 0.10 75)" : "oklch(0.32 0.010 62)",
                    display: "block",
                    paddingBottom: "1rem",
                    borderBottom: "1px solid oklch(0.92 0.006 80)",
                  }}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <Link href="/book">
              <span className="btn-gold text-center block" style={{ fontSize: "0.62rem" }}>Book Now</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="flex-1">{children}</main>

      {/* ── FOOTER ── */}
      <footer style={{ background: "oklch(0.96 0.012 76)", borderTop: "1px solid oklch(0.88 0.008 75)" }}>
        {/* Marquee strip */}
        <div
          className="overflow-hidden py-4"
          style={{ borderBottom: "1px solid oklch(0.88 0.008 75)", borderTop: "1px solid oklch(0.88 0.008 75)" }}
        >
          <div className="marquee-track">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="px-8 text-xs tracking-widest uppercase shrink-0"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, color: "oklch(0.55 0.008 68)" }}
              >
                Ruhi Wellness &nbsp;·&nbsp; IV Therapy &nbsp;·&nbsp; Mobile Clinic &nbsp;·&nbsp; London &nbsp;·&nbsp;
              </span>
            ))}
          </div>
        </div>

        <div className="container py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Brand */}
            <div className="md:col-span-4">
              <img
                src="/manus-storage/ruhi-logo-transparent_e4237816.png"
                alt="Ruhi Wellness"
                style={{ height: "80px", width: "auto", objectFit: "contain", marginBottom: "1.25rem" }}
              />
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "1.6rem",
                  lineHeight: 1.3,
                  color: "oklch(0.42 0.010 65)",
                  marginBottom: "1.5rem",
                  maxWidth: "22ch",
                  fontStyle: "italic",
                }}
              >
                "Wellness is not one thing."
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: "0.8rem",
                  color: "oklch(0.48 0.008 65)",
                  lineHeight: 1.7,
                }}
              >
                Premium IV therapy delivered to your door across London.
              </p>
            </div>

            {/* Spacer */}
            <div className="md:col-span-1" />

            {/* Navigate */}
            <div className="md:col-span-2">
              <p
                className="eyebrow mb-5"
                style={{ color: "oklch(0.62 0.10 75)" }}
              >
                Navigate
              </p>
              <ul className="space-y-3">
                {[
                  { label: "Elements", href: "/elements" },
                  { label: "Book Now", href: "/book" },
                  { label: "FAQ", href: "/faq" },
                  { label: "The Science", href: "/the-science" },
                  { label: "Contact", href: "/contact" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 300,
                          fontSize: "0.82rem",
                          color: "oklch(0.42 0.010 65)",
                          transition: "color 200ms",
                        }}
                        className="hover:!text-[oklch(0.62_0.10_75)]"
                      >
                        {l.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="md:col-span-2">
              <p className="eyebrow mb-5" style={{ color: "oklch(0.62 0.10 75)" }}>Contact</p>
              <ul className="space-y-3">
                {[
                  { label: "+44 20 1234 5678", href: "tel:+442012345678" },
                  { label: "hello@ruhiwellness.co.uk", href: "mailto:hello@ruhiwellness.co.uk" },
                  { label: "WhatsApp us", href: "https://wa.me/442012345678" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 300,
                        fontSize: "0.82rem",
                        color: "oklch(0.42 0.010 65)",
                        textDecoration: "none",
                        transition: "color 200ms",
                      }}
                      className="hover:!text-[oklch(0.62_0.10_75)]"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hours */}
            <div className="md:col-span-3">
              <p className="eyebrow mb-5" style={{ color: "oklch(0.62 0.10 75)" }}>Hours</p>
              <ul className="space-y-2">
                {[
                  { day: "Mon – Fri", hours: "7:00 am – 9:00 pm" },
                  { day: "Saturday", hours: "8:00 am – 8:00 pm" },
                  { day: "Sunday", hours: "9:00 am – 6:00 pm" },
                ].map(({ day, hours }) => (
                  <li
                    key={day}
                    className="flex justify-between gap-4 text-sm"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, color: "oklch(0.42 0.010 65)" }}
                  >
                    <span>{day}</span>
                    <span style={{ color: "oklch(0.55 0.010 65)" }}>{hours}</span>
                  </li>
                ))}
              </ul>
              <p
                className="mt-4 text-xs"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, color: "oklch(0.55 0.010 65)", fontStyle: "italic" }}
              >
                Mobile clinic — we come to you.
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="mt-14 pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
            style={{ borderTop: "1px solid oklch(0.88 0.008 75)" }}
          >
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.72rem", color: "oklch(0.52 0.008 65)" }}>
              © {new Date().getFullYear()} Ruhi Wellness Ltd. All rights reserved.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.72rem", color: "oklch(0.52 0.008 65)" }}>
              Not medical advice. Always consult a qualified practitioner.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
