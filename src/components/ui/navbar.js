"use client";

import { useEffect, useMemo, useState } from "react";
import { anniversaryData } from "@/data/anniversary";

const navLinks = [
  { label: "Home", href: "#opening" },
  { label: "About", href: "#about" },
  { label: "Letter", href: "#letter" },
  { label: "Our Story", href: "#story" },
  { label: "Memories", href: "#memories" },
  { label: "Reasons", href: "#reasons" },
  { label: "Future", href: "#future" },
  { label: "Mini Game", href: "#mini-game" },
  { label: "End", href: "#end" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#opening");

  const sectionIds = useMemo(
    () => navLinks.map((link) => link.href.replace("#", "")),
    [],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          const topEntry = visibleEntries[0];
          setActiveHash(`#${topEntry.target.id}`);
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.2, 0.35, 0.5, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section));

    const handleHashChange = () => {
      if (window.location.hash) {
        setActiveHash(window.location.hash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [sectionIds]);

  const handleNavClick = (href) => {
    setActiveHash(href);
    setMenuOpen(false);
  };

  return (
    <>
      <header className={`site-navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          <a
            href="#opening"
            className={`brand ${activeHash === "#opening" ? "is-active-brand" : ""}`}
            onClick={() => handleNavClick("#opening")}
          >
            {anniversaryData.siteTitle}
          </a>

          <nav className="nav-links nav-links-desktop">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link ${activeHash === link.href ? "is-active" : ""}`}
                onClick={() => handleNavClick(link.href)}
                aria-current={activeHash === link.href ? "page" : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className={`hamburger-button ${menuOpen ? "is-open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        className={`mobile-menu-overlay ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`mobile-menu-panel ${menuOpen ? "open" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mobile-menu-header">
            <span className="mobile-menu-title">
              {anniversaryData.siteTitle}
            </span>
            <button
              type="button"
              className="mobile-menu-close"
              aria-label="Close mobile menu"
              onClick={() => setMenuOpen(false)}
            >
              ×
            </button>
          </div>

          <nav className="mobile-menu-links">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`mobile-menu-link ${
                  activeHash === link.href ? "is-active" : ""
                }`}
                onClick={() => handleNavClick(link.href)}
                aria-current={activeHash === link.href ? "page" : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
