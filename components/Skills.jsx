"use client";

import React from "react";
import { motion } from "framer-motion";

// ── Reuse the same FloatingIcon wrapper from Banner ──────────────────────────
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

// ── Skill data ────────────────────────────────────────────────────────────────
const DESIGN_SKILLS = [
  { label: "Logo Design",        level: 92 },
  { label: "Poster Design",      level: 88 },
  { label: "Thumbnail Design",   level: 95 },
  { label: "Social Media Posts", level: 90 },
  { label: "Meta Ads Design",    level: 85 },
  { label: "Typography",         level: 80 },
];

// ── Tool cards — use /public/ image paths ─────────────────────────────────────
// Place the PNGs in your Next.js /public folder and update src paths if needed.
const TOOLS = [
  {
    name: "Photoshop",
    src: "/photoshop.png",
    color: "#31A8FF",
    glow: "rgba(49,168,255,0.25)",
    desc: "Photo editing & compositing",
  },
  {
    name: "Figma",
    src: "/figma.png",
    color: "#F24E1E",
    glow: "rgba(242,78,30,0.25)",
    desc: "UI & vector design",
  },
  {
    name: "ChatGPT",
    src: "/chat-gpt.png",
    color: "#10a37f",
    glow: "rgba(16,163,127,0.25)",
    desc: "AI copy & ideation",
  },
  {
    name: "Google Gemini",
    src: "/google-gemini.png",
    color: "#8B5CF6",
    glow: "rgba(139,92,246,0.25)",
    desc: "AI-powered creativity",
  },
  {
    name: "Canva",
    src: "/canva-icon.png",
    color: "#00C4CC",
    glow: "rgba(0,196,204,0.25)",
    desc: "Quick graphics & templates",
  },
];

// ── Animated skill bar ────────────────────────────────────────────────────────
function SkillBar({ label, level, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
      className="group"
    >
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-white/80 group-hover:text-black dark:group-hover:text-white transition-colors">
          {label}
        </span>
        <span className="text-xs font-semibold tabular-nums text-violet-600 dark:text-violet-400">
          {level}%
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-black/5 dark:bg-white/5 border border-black/[0.06] dark:border-white/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + index * 0.08, duration: 0.9, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #7c3aed, #06b6d4)",
            boxShadow: "0 0 8px rgba(124,58,237,0.5)",
          }}
        />
      </div>
    </motion.div>
  );
}

// ── Tool card ─────────────────────────────────────────────────────────────────
function ToolCard({ name, src, color, glow, desc, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.03 }}
      className="relative flex flex-col items-center gap-3 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] p-5 backdrop-blur-sm cursor-default transition-colors hover:border-black/20 dark:hover:border-white/20"
      style={{ boxShadow: `0 0 0 0 ${glow}` }}
    >
      {/* Glow on hover via inline style — framer handles the lift */}
      <div
        className="flex h-14 w-14 items-center justify-center rounded-xl"
        style={{ background: `${glow}`, border: `1px solid ${color}22` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={name}
          className="h-8 w-8 object-contain"
          style={{ filter: src.endsWith(".svg") ? "invert(1)" : undefined }}
        />
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-900 dark:text-white/90">{name}</p>
        <p className="mt-0.5 text-xs text-gray-500 dark:text-white/40">{desc}</p>
      </div>
      {/* Corner dot accent */}
      <span
        className="absolute top-3 right-3 h-1.5 w-1.5 rounded-full"
        style={{ background: color, boxShadow: `0 0 6px ${color}` }}
      />
    </motion.div>
  );
}

// ── Main Skills section ───────────────────────────────────────────────────────
const Skills = () => {
  return (
    <section
      id="skills"
      className="relative w-full overflow-hidden bg-white dark:bg-[#0a0a0f] text-gray-900 dark:text-white transition-colors duration-300"
    >
      {/* ── Same background treatment as Banner ── */}
      <div className="absolute inset-0 -z-10">
        {/* Radial gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,#7c3aed14,transparent_55%),radial-gradient(ellipse_at_top_right,#06b6d412,transparent_55%)] dark:bg-[radial-gradient(ellipse_at_bottom_left,#7c3aed22,transparent_55%),radial-gradient(ellipse_at_top_right,#06b6d420,transparent_55%)]" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
            color: "currentColor",
          }}
        />
        {/* Blobs */}
        <motion.div
          className="absolute bottom-[-10%] left-[-5%] h-[420px] w-[420px] rounded-full bg-violet-600/10 dark:bg-violet-600/20 blur-3xl"
          animate={{ x: [0, 50, -30, 0], y: [0, -30, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[-10%] right-[-5%] h-[380px] w-[380px] rounded-full bg-cyan-500/8 dark:bg-cyan-500/15 blur-3xl"
          animate={{ x: [0, -40, 30, 0], y: [0, 30, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ── Floating elements — unique to Skills section ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Ruler — top left */}
        <FloatingIcon className="top-[8%] left-[4%] text-violet-500/30 dark:text-violet-400/40" duration={12} delay={0} x={20} y={30}>
          <svg width="110" height="28" viewBox="0 0 110 28" fill="none" stroke="currentColor" strokeWidth="1.2">
            <rect x="1" y="6" width="108" height="16" rx="3" />
            {[10,20,30,40,50,60,70,80,90,100].map((x, i) => (
              <line key={x} x1={x} y1="6" x2={x} y2={i % 2 === 0 ? "1" : "3"} strokeWidth="1" />
            ))}
            <line x1="55" y1="6" x2="55" y2="0" strokeWidth="1.5" stroke="#7c3aed" />
          </svg>
        </FloatingIcon>

        {/* Dot-grid — top right */}
        <FloatingIcon className="top-[6%] right-[5%] text-cyan-600/20 dark:text-cyan-400/30" duration={16} delay={1} x={18} y={22}>
          <svg width="72" height="72" viewBox="0 0 72 72" fill="currentColor">
            {[0,1,2,3,4,5].map(row =>
              [0,1,2,3,4,5].map(col => (
                <circle key={`${row}-${col}`} cx={6 + col * 12} cy={6 + row * 12} r="1.5" opacity={0.6} />
              ))
            )}
          </svg>
        </FloatingIcon>

        {/* Crosshair target — mid left */}
        <FloatingIcon className="top-[40%] left-[3%] text-cyan-600/30 dark:text-cyan-300/50" duration={14} delay={0.8} x={25} y={35}>
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.2">
            <circle cx="28" cy="28" r="22" strokeDasharray="5 4" />
            <circle cx="28" cy="28" r="10" />
            <circle cx="28" cy="28" r="3" fill="currentColor" />
            <line x1="28" y1="1" x2="28" y2="14" />
            <line x1="28" y1="42" x2="28" y2="55" />
            <line x1="1" y1="28" x2="14" y2="28" />
            <line x1="42" y1="28" x2="55" y2="28" />
          </svg>
        </FloatingIcon>

        {/* Gradient swatch strip — bottom left */}
        <FloatingIcon className="bottom-[14%] left-[5%]" duration={11} delay={2} x={22} y={28}>
          <div className="flex flex-col gap-1 rounded-lg overflow-hidden border border-black/10 dark:border-white/10" style={{ width: 18 }}>
            {["#7c3aed","#a855f7","#d946ef","#ec4899","#06b6d4","#22d3ee"].map(c => (
              <span key={c} style={{ display: "block", height: 14, background: c, opacity: 0.75 }} />
            ))}
          </div>
        </FloatingIcon>

        {/* Sparkle / star — top centre-right */}
        <FloatingIcon className="top-[18%] right-[20%] text-fuchsia-500/40 dark:text-fuchsia-400/60" duration={9} delay={0.4} x={18} y={24}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="currentColor">
            <path d="M18 2 L19.8 14.2 L32 18 L19.8 21.8 L18 34 L16.2 21.8 L4 18 L16.2 14.2 Z" opacity="0.8"/>
          </svg>
        </FloatingIcon>

        {/* Orbit ellipse — centre left-ish */}
        <motion.div
          className="absolute top-[55%] left-[18%]"
          animate={{ rotate: 360 }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        >
          <svg width="80" height="44" viewBox="0 0 80 44" fill="none">
            <ellipse cx="40" cy="22" rx="38" ry="20" stroke="#7c3aed" strokeWidth="1" strokeDasharray="5 5" opacity="0.35"/>
            <circle cx="78" cy="22" r="3.5" fill="#06b6d4" opacity="0.7"/>
          </svg>
        </motion.div>

        {/* Pixel / mini grid card — bottom right */}
        <FloatingIcon className="bottom-[10%] right-[6%] text-violet-500/25 dark:text-violet-300/40" duration={13} delay={1.2} x={20} y={32}>
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="1">
            {[0,1,2,3].map(r =>
              [0,1,2,3].map(c => (
                <rect
                  key={`${r}-${c}`}
                  x={2 + c * 12} y={2 + r * 12}
                  width="10" height="10" rx="2"
                  fill={(r + c) % 2 === 0 ? "currentColor" : "none"}
                  opacity={(r + c) % 2 === 0 ? 0.25 : 1}
                />
              ))
            )}
          </svg>
        </FloatingIcon>

        {/* Eyedropper — bottom centre */}
        <FloatingIcon className="bottom-[22%] left-[42%] text-cyan-600/30 dark:text-cyan-400/45" duration={15} delay={0.6} x={30} y={20}>
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L11 6.67l-1.06-1.06a2 2 0 0 0-2.83 0l-1.41 1.41a2 2 0 0 0 0 2.83L7.76 11l-4.5 4.5A2 2 0 0 0 3 17v2a2 2 0 0 0 2 2h2a2 2 0 0 0 1.41-.59L13 15.76l2.06 2.06a5.5 5.5 0 0 0 7.78-7.78z" />
          </svg>
        </FloatingIcon>

        {/* Pulsing ring — top centre */}
        <motion.div
          className="absolute top-[28%] right-[8%]"
          animate={{ scale: [1, 1.18, 1], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="21" stroke="#06b6d4" strokeWidth="1.5" />
            <circle cx="24" cy="24" r="13" stroke="#7c3aed" strokeWidth="1" strokeDasharray="3 4" />
            <circle cx="24" cy="24" r="4" fill="#7c3aed" opacity="0.5" />
          </svg>
        </motion.div>

      </div>

      {/* ── Section content ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:py-32">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-300 backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-500 dark:bg-cyan-400" />
            What I Bring to the Table
          </span>
          <h2 className="mt-4 text-4xl font-extrabold md:text-5xl lg:text-6xl">
            My{" "}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 dark:from-violet-400 dark:via-fuchsia-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-600 dark:text-white/50 md:text-lg">
            From concept to final pixel — here's the creative toolkit I use to deliver
            designs that stand out.
          </p>
        </motion.div>

        {/* Two columns: skill bars + tools grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-start">

          {/* LEFT — Design skill bars */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-6 text-xs uppercase tracking-[0.25em] text-violet-600 dark:text-violet-400"
            >
              Design Expertise
            </motion.p>
            <div className="space-y-5">
              {DESIGN_SKILLS.map((skill, i) => (
                <SkillBar key={skill.label} {...skill} index={i} />
              ))}
            </div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-10 grid grid-cols-3 gap-4"
            >
              {[
                { value: "2+",  label: "Years Exp." },
                { value: "50+", label: "Projects" },
                { value: "100%", label: "Dedication" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center justify-center rounded-xl border border-black/[0.07] dark:border-white/[0.07] bg-black/[0.02] dark:bg-white/[0.03] py-4 text-center"
                >
                  <span className="text-2xl font-extrabold bg-gradient-to-r from-violet-600 to-cyan-600 dark:from-violet-400 dark:to-cyan-400 bg-clip-text text-transparent">
                    {value}
                  </span>
                  <span className="mt-0.5 text-xs text-gray-500 dark:text-white/40">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Tools & Software */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-6 text-xs uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-400"
            >
              Tools & Software
            </motion.p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {TOOLS.map((tool, i) => (
                <ToolCard key={tool.name} {...tool} index={i} />
              ))}
            </div>

            {/* "Always learning" note */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-8 flex items-start gap-3 rounded-xl border border-violet-500/20 bg-violet-500/[0.04] dark:bg-violet-500/[0.06] p-4"
            >
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-500/15 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </span>
              <p className="text-sm text-gray-600 dark:text-white/60 leading-relaxed">
                Always exploring new design trends and tools to push creative boundaries
                and deliver fresh, impactful visuals.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom divider fade — same as banner bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none bg-gradient-to-b from-transparent to-white dark:to-[#0a0a0f]"
      />
    </section>
  );
};

export default Skills;