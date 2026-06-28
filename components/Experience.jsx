"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  School,
  SquarePlay,
  Newspaper,
  Image as ImageIcon,
  Hammer,
  Users,
  Search,
  Compass,
} from "lucide-react";

// ── Reuse the same FloatingIcon wrapper from Banner / Skills / Projects ─────
const FloatingIcon = ({
  children,
  className,
  duration = 8,
  delay = 0,
  x = 30,
  y = 30,
}) => (
  <motion.div
    className={`absolute ${className}`}
    animate={{ x: [0, x, -x, 0], y: [0, -y, y, 0], rotate: [0, 15, -10, 0] }}
    transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

// ── Learning source chips for the "Multiple Learning Sources" entry ────────
const LEARNING_SOURCES = [
  { label: "YouTube Tutorials", icon: SquarePlay, color: "#FF0000" },
  { label: "Web Articles & Blogs", icon: Newspaper, color: "#06b6d4" },
  { label: "Pinterest for Inspiration", icon: ImageIcon, color: "#E60023" },
  { label: "Practice", icon: Hammer, color: "#a855f7" },
  { label: "Social Media Learning", icon: Users, color: "#ec4899" },
  { label: "Research on Google", icon: Search, color: "#10a37f" },
  { label: "Explored More Platforms", icon: Compass, color: "#7c3aed" },
];

// ── Timeline data ─────────────────────────────────────────────────────────────
const TIMELINE = [
  {
    id: 1,
    icon: School,
    eyebrow: "2018",
    title: "Matriculation",
    subtitle: "The Excellent Grammar High School, Shikarpur",
    note: "At the age of 16.",
    type: "simple",
  },
  {
    id: 2,
    icon: GraduationCap,
    eyebrow: "Present",
    title: "College",
    subtitle: "C&S Govt Degree College",
    note: "Now studying in college.",
    type: "simple",
  },
  {
    id: 3,
    icon: Compass,
    eyebrow: "Self-Taught",
    title: "Multiple Learning Sources",
    subtitle: "I learned through different platforms, not just one course.",
    type: "sources",
    sources: LEARNING_SOURCES,
  },
];

// ── Single timeline card ──────────────────────────────────────────────────────
function TimelineCard({ item, index }) {
  const isLeft = index % 2 === 0;
  const Icon = item.icon;

  return (
    <div className="relative flex items-center justify-center md:justify-between">
      {/* ── Desktop: alternating left/right ── */}
      <div
        className={`hidden md:block md:w-[calc(50%-2.5rem)] ${
          isLeft ? "md:order-1 md:text-right" : "md:order-3"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <Card item={item} align={isLeft ? "right" : "left"} />
        </motion.div>
      </div>

      {/* ── Center node ── */}
      <div className="absolute left-1/2 top-0 z-10 hidden -translate-x-1/2 md:block md:order-2">
        <Node icon={Icon} />
      </div>
      <div className="hidden md:block md:w-10 md:order-2" />

      {/* ── Mobile: single column with left rail node ── */}
      <div className="flex w-full gap-4 md:hidden">
        <div className="flex flex-col items-center pt-1">
          <Node icon={Icon} small />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex-1 pb-10"
        >
          <Card item={item} align="left" />
        </motion.div>
      </div>
    </div>
  );
}

// ── Center node (icon medallion on the line) ──────────────────────────────────
function Node({ icon: Icon, small = false }) {
  return (
    <div
      className={`relative flex items-center justify-center rounded-full border-2 border-violet-400/60 bg-white text-violet-600 shadow-[0_0_0_4px_rgba(124,58,237,0.12)] dark:border-violet-400/50 dark:bg-[#0a0a0f] dark:text-violet-300 dark:shadow-[0_0_0_4px_rgba(124,58,237,0.18)] ${
        small ? "h-9 w-9" : "h-12 w-12"
      }`}
    >
      <Icon className={small ? "h-4 w-4" : "h-5 w-5"} />
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-violet-500/15 dark:bg-violet-400/15" />
    </div>
  );
}

// ── Card content (shared between mobile / desktop) ─────────────────────────────
function Card({ item, align }) {
  return (
    <div
      className={`inline-block w-full rounded-2xl border border-black/[0.08] bg-black/[0.02] p-5 text-left backdrop-blur-sm transition-colors hover:border-violet-400/30 dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:border-violet-400/30 md:w-auto md:max-w-md ${
        align === "right" ? "md:text-right" : "md:text-left"
      }`}
    >
      <span
        className={`mb-2 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-700 dark:border-violet-400/20 dark:bg-violet-400/[0.08] dark:text-violet-300 ${
          align === "right" ? "md:flex-row-reverse" : ""
        }`}
      >
        {item.eyebrow}
      </span>

      <h3 className="text-xl font-bold text-gray-900 dark:text-white md:text-2xl">
        {item.title}
      </h3>
      <p className="mt-1.5 text-sm font-medium text-gray-600 dark:text-white/60">
        {item.subtitle}
      </p>
      {item.note && (
        <p className="mt-1 text-xs text-gray-500 dark:text-white/40">{item.note}</p>
      )}

      {item.type === "sources" && (
        <div
          className={`mt-4 flex flex-wrap gap-2 ${
            align === "right" ? "md:justify-end" : "md:justify-start"
          }`}
        >
          {item.sources.map(({ label, icon: SrcIcon, color }, i) => (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
              whileHover={{ y: -2, scale: 1.04 }}
              className="flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-white/80"
            >
              <SrcIcon className="h-3.5 w-3.5" style={{ color }} />
              {label}
            </motion.span>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Experience section ───────────────────────────────────────────────────
const Experience = () => {
  return (
    <section
      id="experience"
      className="relative w-full overflow-hidden bg-white text-gray-900 transition-colors duration-300 dark:bg-[#0a0a0f] dark:text-white"
    >
      {/* ── Background treatment — matches Banner / Skills / Projects ── */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#7c3aed14,transparent_55%),radial-gradient(ellipse_at_bottom_right,#06b6d412,transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top_left,#7c3aed22,transparent_55%),radial-gradient(ellipse_at_bottom_right,#06b6d420,transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse at center, black 35%, transparent 78%)",
          }}
        />
        <motion.div
          className="absolute top-[-10%] left-[-8%] h-[440px] w-[440px] rounded-full bg-violet-600/10 blur-3xl dark:bg-violet-600/20"
          animate={{ x: [0, 50, -30, 0], y: [0, -30, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-8%] h-[400px] w-[400px] rounded-full bg-cyan-500/8 blur-3xl dark:bg-cyan-500/15"
          animate={{ x: [0, -40, 30, 0], y: [0, 30, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ── Floating decorative elements ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Graduation cap outline — top left */}
        <FloatingIcon className="top-[8%] left-[5%] text-violet-500/30 dark:text-violet-400/40" duration={12} delay={0} x={20} y={26}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M22 10L12 5 2 10l10 5 10-5z" />
            <path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
          </svg>
        </FloatingIcon>

        {/* Open book — top right */}
        <FloatingIcon className="top-[10%] right-[6%] text-cyan-500/30 dark:text-cyan-300/45" duration={11} delay={0.6} x={18} y={22}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M2 5c2.5-1.2 6-1.2 8 0v14c-2-1.2-5.5-1.2-8 0V5z" />
            <path d="M22 5c-2.5-1.2-6-1.2-8 0v14c2-1.2 5.5-1.2 8 0V5z" />
          </svg>
        </FloatingIcon>

        {/* Calendar / milestone marker — mid left */}
        <FloatingIcon className="top-[42%] left-[4%] text-fuchsia-500/30 dark:text-fuchsia-300/40" duration={14} delay={1} x={20} y={28}>
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="16" y1="2" x2="16" y2="6" />
          </svg>
        </FloatingIcon>

        {/* Lightbulb / learning — bottom left */}
        <FloatingIcon className="bottom-[18%] left-[6%] text-cyan-600/30 dark:text-cyan-400/40" duration={13} delay={1.2} x={22} y={20}>
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 18h6" />
            <path d="M10 22h4" />
            <path d="M12 2a7 7 0 0 0-4 12.7c.4.4.5.9.5 1.3h7c0-.4.1-.9.5-1.3A7 7 0 0 0 12 2z" />
          </svg>
        </FloatingIcon>

        {/* Pencil / writing — bottom right */}
        <FloatingIcon className="bottom-[14%] right-[7%] text-violet-500/30 dark:text-violet-300/45" duration={10} delay={0.4} x={18} y={24}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 19l7-7 3 3-7 7-3-3z" />
            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          </svg>
        </FloatingIcon>

        {/* Dashed orbit ring — mid right */}
        <motion.div
          className="absolute top-[55%] right-[8%]"
          animate={{ rotate: 360 }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        >
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="26" stroke="#22d3ee" strokeWidth="1" strokeDasharray="4 6" opacity="0.35" />
          </svg>
        </motion.div>

        {/* Pulsing dot — top centre */}
        <motion.div
          className="absolute top-[22%] left-[48%]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="17" stroke="#7c3aed" strokeWidth="1.3" />
            <circle cx="20" cy="20" r="4" fill="#7c3aed" opacity="0.5" />
          </svg>
        </motion.div>
      </div>

      {/* ── Section content ── */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 md:py-32">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-violet-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-violet-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-500 dark:bg-violet-400" />
            My Journey
          </span>
          <h2 className="mt-4 text-4xl font-extrabold md:text-5xl lg:text-6xl">
            Experience &{" "}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent dark:from-violet-400 dark:via-fuchsia-400 dark:to-cyan-400">
              Education
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-600 md:text-lg dark:text-white/50">
            From the classroom to self-taught design — here's the path that got
            me here.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center vertical line — desktop */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-violet-500/10 via-violet-500/40 to-cyan-500/10 dark:from-violet-400/10 dark:via-violet-400/40 dark:to-cyan-400/10 md:block" />
          {/* Left rail line — mobile */}
          <div className="absolute left-[18px] top-0 h-full w-px bg-gradient-to-b from-violet-500/10 via-violet-500/40 to-cyan-500/10 dark:from-violet-400/10 dark:via-violet-400/40 dark:to-cyan-400/10 md:hidden" />

          <div className="flex flex-col gap-12 md:gap-16">
            {TIMELINE.map((item, i) => (
              <TimelineCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom divider fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white pointer-events-none dark:to-[#0a0a0f]" />
    </section>
  );
};

export default Experience;