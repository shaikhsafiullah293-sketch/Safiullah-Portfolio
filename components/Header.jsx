"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "Home",       href: "#home"       },
  { label: "Skills",     href: "#skills"     },
  { label: "Services",   href: "#services"   },
  { label: "Projects",   href: "#projects"   },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact"    },
];

export const Header = () => {
  const [dark,      setDark]      = useState(false);
  const [mounted,   setMounted]   = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [active,    setActive]    = useState("home");
  const [scrolled,  setScrolled]  = useState(false);

  // ── Theme init ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setDark(false);
      document.documentElement.classList.remove("dark");
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark, mounted]);

  // ── Scroll shadow + active section detection ───────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = NAV_ITEMS.map((n) => n.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Smooth scroll ──────────────────────────────────────────────────────────
  const handleNav = useCallback((e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // ── Close mobile menu on resize to md ─────────────────────────────────────
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ── Prevent body scroll when menu open ────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // ── SSR flicker guard ──────────────────────────────────────────────────────
  if (!mounted) {
    return (
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl opacity-0">
        <div className="h-[60px] rounded-full bg-white/60 backdrop-blur-xl border border-black/10" />
      </header>
    );
  }

  return (
    <>
      {/* ── Main pill header ── */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
        <div
          className={`flex items-center justify-between gap-4 px-5 py-3 rounded-full
            backdrop-blur-xl border transition-all duration-300
            bg-white/70 dark:bg-black/50
            border-black/10 dark:border-white/10
            ${scrolled
              ? "shadow-[0_8px_32px_rgba(124,58,237,0.18)] dark:shadow-[0_8px_32px_rgba(124,58,237,0.25)]"
              : "shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
            }`}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNav(e, "#home")}
            className="text-xl font-bold bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent tracking-tight pl-1 shrink-0
              dark:from-violet-400 dark:via-fuchsia-400 dark:to-cyan-400"
          >
            Safiullah
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {NAV_ITEMS.map(({ label, href }) => {
              const id = href.replace("#", "");
              const isActive = active === id;
              return (
                <a
                  key={label}
                  href={href}
                  onClick={(e) => handleNav(e, href)}
                  className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200
                    ${isActive
                      ? "text-violet-700 dark:text-violet-300"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
                    }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="pill"
                      className="absolute inset-0 rounded-full bg-violet-100 dark:bg-violet-500/20 border border-violet-200 dark:border-violet-500/30"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right side: theme toggle + hamburger */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Theme toggle */}
            <button
              onClick={() => setDark(!dark)}
              aria-label="Toggle theme"
              className="p-2.5 rounded-full cursor-pointer transition-all duration-300
                bg-gradient-to-br from-violet-500/15 to-cyan-500/15
                border border-black/10 dark:border-white/10
                hover:border-violet-400/50 hover:shadow-[0_0_16px_rgba(124,58,237,0.35)]"
            >
              {dark
                ? <Sun  className="w-4 h-4 text-yellow-400" />
                : <Moon className="w-4 h-4 text-violet-600" />
              }
            </button>

            {/* Hamburger — mobile/tablet only */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="md:hidden p-2.5 rounded-full cursor-pointer transition-all duration-300
                bg-gradient-to-br from-violet-500/15 to-cyan-500/15
                border border-black/10 dark:border-white/10
                hover:border-violet-400/50"
            >
              {menuOpen
                ? <X    className="w-4 h-4 text-slate-700 dark:text-white" />
                : <Menu className="w-4 h-4 text-slate-700 dark:text-white" />
              }
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile / tablet full-screen menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Slide-down drawer */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0,   scale: 1    }}
              exit={{   opacity: 0, y: -24, scale: 0.97 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm md:hidden
                rounded-3xl border overflow-hidden
                bg-white/90 dark:bg-[#0f0f18]/95
                border-slate-200 dark:border-white/10
                shadow-[0_20px_60px_rgba(124,58,237,0.2)]
                backdrop-blur-2xl"
            >
              {/* Gradient top accent */}
              <div className="h-0.5 w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500" />

              <nav className="flex flex-col p-4 gap-1">
                {NAV_ITEMS.map(({ label, href }, i) => {
                  const id = href.replace("#", "");
                  const isActive = active === id;
                  return (
                    <motion.a
                      key={label}
                      href={href}
                      onClick={(e) => handleNav(e, href)}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                        ${isActive
                          ? "bg-violet-50 dark:bg-violet-500/15 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-500/30"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                        }`}
                    >
                      <span>{label}</span>
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-500 dark:bg-violet-400" />
                      )}
                    </motion.a>
                  );
                })}
              </nav>

              {/* Footer inside menu */}
              <div className="px-4 pb-4">
                <div className="h-px w-full bg-slate-100 dark:bg-white/[0.06] mb-4" />
                <p className="text-center text-xs text-slate-400 dark:text-white/30">
                  © {new Date().getFullYear()} Safiullah · All rights reserved
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};