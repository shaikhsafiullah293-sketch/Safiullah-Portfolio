"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Frame,
  Sparkles,
  ImageIcon,
  LayoutTemplate,
  BookOpen,
  FileImage,
  Tag,
  Album,
  Share2,
  Megaphone,
  Shirt,
  CreditCard,
  Layers,
} from "lucide-react";

// ── Reuse the same FloatingIcon wrapper from Banner / Skills / Projects / Experience ─
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

// ── Services data ──────────────────────────────────────────────────────────────
const SERVICES = [
  {
    title: "Poster Design",
    desc: "Eye-catching posters built to grab attention at a glance.",
    icon: Frame,
    color: "#7c3aed",
    glow: "rgba(124,58,237,0.18)",
  },
  {
    title: "Logo Design",
    desc: "Distinct marks that give your brand a face people remember.",
    icon: Sparkles,
    color: "#a855f7",
    glow: "rgba(168,85,247,0.18)",
  },
  {
    title: "Thumbnail Design",
    desc: "Click-worthy thumbnails crafted to boost views and stand out.",
    icon: ImageIcon,
    color: "#06b6d4",
    glow: "rgba(6,182,212,0.18)",
  },
  {
    title: "Banner Design",
    desc: "Bold banners for web, print, and social that pull the eye in.",
    icon: LayoutTemplate,
    color: "#22d3ee",
    glow: "rgba(34,211,238,0.18)",
  },
  {
    title: "Cover Design",
    desc: "Polished covers for books, albums, or digital releases.",
    icon: BookOpen,
    color: "#ec4899",
    glow: "rgba(236,72,153,0.18)",
  },
  {
    title: "Flyer Design",
    desc: "Sharp, informative flyers that get your message noticed.",
    icon: FileImage,
    color: "#f472b6",
    glow: "rgba(244,114,182,0.18)",
  },
  {
    title: "Label Design",
    desc: "Clean, on-brand labels that make products shelf-ready.",
    icon: Tag,
    color: "#d946ef",
    glow: "rgba(217,70,239,0.18)",
  },
  {
    title: "Brochure Design",
    desc: "Organized, persuasive layouts that tell your story well.",
    icon: Album,
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.18)",
  },
  {
    title: "Social Media Post Design",
    desc: "Scroll-stopping posts tailored for every platform's feed.",
    icon: Share2,
    color: "#06b6d4",
    glow: "rgba(6,182,212,0.18)",
  },
  {
    title: "Meta Ads Design",
    desc: "High-converting ad creatives built for Facebook & Instagram.",
    icon: Megaphone,
    color: "#7c3aed",
    glow: "rgba(124,58,237,0.18)",
  },
  {
    title: "T-Shirt & Sticker Design",
    desc: "Fun, wearable graphics for apparel and sticker packs.",
    icon: Shirt,
    color: "#22d3ee",
    glow: "rgba(34,211,238,0.18)",
  },
  {
    title: "Business Card Design",
    desc: "First-impression cards that feel as sharp as your brand.",
    icon: CreditCard,
    color: "#a855f7",
    glow: "rgba(168,85,247,0.18)",
  },
  {
    title: "Clothing Brand Tags & Stickers",
    desc: "Custom tags and stickers that finish off a brand's look.",
    icon: Layers,
    color: "#ec4899",
    glow: "rgba(236,72,153,0.18)",
  },
];

// ── Service card ──────────────────────────────────────────────────────────────
function ServiceCard({ service, index }) {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (index % 8) * 0.06, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col gap-4 rounded-2xl border border-black/[0.08] bg-black/[0.02] p-6 backdrop-blur-sm transition-colors hover:border-violet-400/30 dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:border-violet-400/30"
      style={{ boxShadow: "0 0 0 0 transparent" }}
    >
      {/* Hover glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `0 12px 40px -12px ${service.glow}` }}
      />

      {/* Icon badge */}
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-110"
        style={{
          background: service.glow,
          borderColor: `${service.color}33`,
        }}
      >
        <Icon className="h-5 w-5" style={{ color: service.color }} />
      </div>

      <div>
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          {service.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-gray-600 dark:text-white/50">
          {service.desc}
        </p>
      </div>

      {/* Corner accent dot */}
      <span
        className="absolute top-4 right-4 h-1.5 w-1.5 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: service.color, boxShadow: `0 0 6px ${service.color}` }}
      />
    </motion.div>
  );
}

// ── Main Services section ─────────────────────────────────────────────────────
const Services = () => {
  return (
    <section
      id="services"
      className="relative w-full overflow-hidden bg-white text-gray-900 transition-colors duration-300 dark:bg-[#0a0a0f] dark:text-white"
    >
      {/* ── Background treatment — matches other sections ── */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#7c3aed14,transparent_55%),radial-gradient(ellipse_at_bottom_left,#06b6d412,transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top_right,#7c3aed22,transparent_55%),radial-gradient(ellipse_at_bottom_left,#06b6d420,transparent_55%)]" />
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
          className="absolute top-[-10%] right-[-8%] h-[440px] w-[440px] rounded-full bg-violet-600/10 blur-3xl dark:bg-violet-600/20"
          animate={{ x: [0, -50, 30, 0], y: [0, 40, -30, 0] }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] left-[-8%] h-[400px] w-[400px] rounded-full bg-cyan-500/8 blur-3xl dark:bg-cyan-500/15"
          animate={{ x: [0, 40, -30, 0], y: [0, -30, 30, 0] }}
          transition={{ duration: 21, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ── Floating decorative elements ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Pen tool — top left */}
        <FloatingIcon className="top-[6%] left-[5%] text-violet-500/30 dark:text-violet-400/40" duration={12} delay={0} x={20} y={28}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M12 19l7-7 3 3-7 7-3-3z" />
            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          </svg>
        </FloatingIcon>

        {/* Sparkle — top right */}
        <FloatingIcon className="top-[8%] right-[6%] text-fuchsia-500/35 dark:text-fuchsia-300/50" duration={10} delay={0.5} x={18} y={22}>
          <svg width="32" height="32" viewBox="0 0 36 36" fill="currentColor">
            <path d="M18 2 L19.8 14.2 L32 18 L19.8 21.8 L18 34 L16.2 21.8 L4 18 L16.2 14.2 Z" opacity="0.85" />
          </svg>
        </FloatingIcon>

        {/* Color palette — mid left */}
        <FloatingIcon className="top-[42%] left-[4%] text-cyan-500/30 dark:text-cyan-300/45" duration={14} delay={1} x={22} y={26}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M12 2a10 10 0 1 0 0 20c1.5 0 2-1 2-2.2 0-.6-.3-1.1-.3-1.7 0-1 .8-1.6 1.8-1.6H17a5 5 0 0 0 5-5C22 6.5 17.5 2 12 2z" />
            <circle cx="7.5" cy="10.5" r="1.2" fill="currentColor" />
            <circle cx="10.5" cy="7" r="1.2" fill="currentColor" />
            <circle cx="15.5" cy="7.5" r="1.2" fill="currentColor" />
          </svg>
        </FloatingIcon>

        {/* Sticker / tag shape — bottom left */}
        <FloatingIcon className="bottom-[16%] left-[6%] text-violet-500/30 dark:text-violet-300/40" duration={13} delay={1.2} x={20} y={24}>
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M12 2l9 9-9 9-9-9 9-9z" />
            <circle cx="12" cy="11" r="2" />
          </svg>
        </FloatingIcon>

        {/* Layers — bottom right */}
        <FloatingIcon className="bottom-[14%] right-[7%] text-cyan-600/30 dark:text-cyan-400/40" duration={11} delay={0.4} x={18} y={22}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        </FloatingIcon>

        {/* Dashed orbit ring — mid right */}
        <motion.div
          className="absolute top-[58%] right-[5%]"
          animate={{ rotate: 360 }}
          transition={{ duration: 27, repeat: Infinity, ease: "linear" }}
        >
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="26" stroke="#22d3ee" strokeWidth="1" strokeDasharray="4 6" opacity="0.35" />
          </svg>
        </motion.div>

        {/* Pulsing ring — top centre */}
        <motion.div
          className="absolute top-[24%] left-[48%]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="17" stroke="#7c3aed" strokeWidth="1.3" />
            <circle cx="20" cy="20" r="4" fill="#7c3aed" opacity="0.5" />
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
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-violet-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-violet-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-500 dark:bg-violet-400" />
            What I Offer
          </span>
          <h2 className="mt-4 text-4xl font-extrabold md:text-5xl lg:text-6xl">
            My{" "}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent dark:from-violet-400 dark:via-fuchsia-400 dark:to-cyan-400">
              Services
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-600 md:text-lg dark:text-white/50">
            Everything you need to look sharp across print, digital, and
            social — all under one creative roof.
          </p>
        </motion.div>

        {/* Services grid — 4 / 2 / 1 columns */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>

      {/* Bottom divider fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white pointer-events-none dark:to-[#0a0a0f]" />
    </section>
  );
};

export default Services;