"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Plus } from "lucide-react";

// ── Reuse the same FloatingIcon wrapper from Banner / Skills ─────────────────
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

// ── Project data — p1..p31 in /public, any of these extensions ──────────────
// Heights vary so the masonry layout has natural rhythm. Adjust freely.
const HEIGHT_CYCLE = [320, 420, 260, 380, 300, 440, 340, 280, 400, 360];

// Order matters: tried left-to-right until one loads successfully.
const EXTENSIONS = ["png", "jpg", "jpeg", "webp", "PNG", "JPG", "JPEG", "WEBP"];

const PROJECTS = Array.from({ length: 31 }, (_, i) => {
  const num = i + 1;
  return {
    id: num,
    // candidate sources in priority order — SmartImage walks through these on error
    sources: EXTENSIONS.map((ext) => `/p${num}.${ext}`),
    title: `Project ${num}`,
    height: HEIGHT_CYCLE[i % HEIGHT_CYCLE.length],
  };
});

const INITIAL_COUNT = 10;
const LOAD_STEP = 10;

// ── SmartImage — tries each candidate extension until one actually loads ────
// Avoids hardcoding a single file extension; falls through png/jpg/jpeg/webp
// (and uppercase variants) so mixed-format /public folders just work.
function SmartImage({ sources, alt, className, style, loading }) {
  const [srcIndex, setSrcIndex] = useState(0);
  const [hidden, setHidden] = useState(false);

  // reset when the candidate list itself changes (e.g. different project)
  useEffect(() => {
    setSrcIndex(0);
    setHidden(false);
  }, [sources]);

  if (hidden) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={sources[srcIndex]}
      alt={alt}
      loading={loading}
      className={className}
      style={style}
      onError={() => {
        if (srcIndex < sources.length - 1) {
          setSrcIndex((i) => i + 1);
        } else {
          setHidden(true);
        }
      }}
    />
  );
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ projects, activeIndex, onClose, onNavigate }) {
  const project = projects[activeIndex];

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(1);
      if (e.key === "ArrowLeft") onNavigate(-1);
    },
    [onClose, onNavigate]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-10"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute top-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur transition-all hover:border-white/30 hover:bg-white/10 hover:text-white"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Prev arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(-1);
        }}
        aria-label="Previous project"
        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur transition-all hover:border-fuchsia-400/40 hover:bg-white/10 hover:text-white md:left-6"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      {/* Next arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(1);
        }}
        aria-label="Next project"
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur transition-all hover:border-cyan-400/40 hover:bg-white/10 hover:text-white md:right-6"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      {/* Image */}
      <motion.div
        key={project.id}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative flex max-h-full max-w-full flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <SmartImage
          sources={project.sources}
          alt={project.title}
          className="max-h-[80vh] w-auto max-w-[92vw] rounded-lg object-contain shadow-[0_0_60px_-10px_rgba(124,58,237,0.4)]"
        />
        <div className="mt-4 flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-white/60 backdrop-blur">
          <span className="font-mono text-cyan-300">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span className="h-1 w-1 rounded-full bg-white/30" />
          <span>{project.title}</span>
          <span className="h-1 w-1 rounded-full bg-white/30" />
          <span className="font-mono text-white/40">
            of {String(projects.length).padStart(2, "0")}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Masonry gallery item ──────────────────────────────────────────────────────
function GalleryItem({ project, index, onOpen }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (index % LOAD_STEP) * 0.05, duration: 0.5, ease: "easeOut" }}
      className="group relative mb-4 cursor-zoom-in overflow-hidden rounded-2xl border border-black/[0.08] bg-black/[0.02] dark:border-white/[0.08] dark:bg-white/[0.03]"
      style={{ height: project.height }}
      onClick={() => onOpen(index)}
    >
      <SmartImage
        sources={project.sources}
        alt={project.title}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex w-full items-center justify-between p-4">
          <span className="text-sm font-semibold text-white">{project.title}</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </span>
        </div>
      </div>

      {/* Corner index chip */}
      <span className="absolute top-3 left-3 rounded-full border border-white/20 bg-black/40 px-2 py-0.5 text-[10px] font-mono text-white/70 backdrop-blur opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {String(project.id).padStart(2, "0")}
      </span>
    </motion.div>
  );
}

// ── Main Projects section ─────────────────────────────────────────────────────
const Projects = () => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const visibleProjects = PROJECTS.slice(0, visibleCount);
  const hasMore = visibleCount < PROJECTS.length;

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const navigate = useCallback(
    (dir) => {
      setLightboxIndex((prev) => {
        if (prev === null) return prev;
        const next = (prev + dir + PROJECTS.length) % PROJECTS.length;
        // auto-expand the visible grid if user navigates past what's currently loaded
        setVisibleCount((vc) => Math.max(vc, next + 1));
        return next;
      });
    },
    []
  );

  // split into 3 masonry columns (desktop), distributing by index
  const columns = [[], [], []];
  visibleProjects.forEach((p, i) => columns[i % 3].push(p));

  return (
    <section
      id="projects"
      className="relative w-full overflow-hidden bg-white text-gray-900 transition-colors duration-300 dark:bg-[#0a0a0f] dark:text-white"
    >
      {/* ── Background treatment — matches Banner / Skills ── */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#7c3aed14,transparent_55%),radial-gradient(ellipse_at_bottom_left,#06b6d412,transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top_right,#7c3aed22,transparent_55%),radial-gradient(ellipse_at_bottom_left,#06b6d420,transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse at center, black 35%, transparent 75%)",
          }}
        />
        <motion.div
          className="absolute top-[-12%] right-[-8%] h-[460px] w-[460px] rounded-full bg-violet-600/10 blur-3xl dark:bg-violet-600/20"
          animate={{ x: [0, -50, 30, 0], y: [0, 40, -30, 0] }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-12%] left-[-8%] h-[420px] w-[420px] rounded-full bg-cyan-500/8 blur-3xl dark:bg-cyan-500/15"
          animate={{ x: [0, 40, -30, 0], y: [0, -30, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ── Floating decorative elements — unique to Projects ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Frame / crop corners — top left */}
        <FloatingIcon className="top-[6%] left-[5%] text-violet-500/30 dark:text-violet-400/40" duration={12} delay={0} x={20} y={28}>
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M2 16V2h14" />
            <path d="M54 16V2H40" />
            <path d="M2 40v14h14" />
            <path d="M54 40v14H40" />
          </svg>
        </FloatingIcon>

        {/* Mouse cursor / select pointer — top right */}
        <FloatingIcon className="top-[10%] right-[7%] text-cyan-500/35 dark:text-cyan-300/50" duration={10} delay={0.6} x={18} y={24}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 2l16 7.5-6.5 1.7L17 17l-2 2-3.5-6.3L7.5 17 4 2z" />
          </svg>
        </FloatingIcon>

        {/* Stacked frames — mid left */}
        <FloatingIcon className="top-[38%] left-[3%] text-fuchsia-500/30 dark:text-fuchsia-300/45" duration={14} delay={1} x={22} y={30}>
          <svg width="60" height="48" viewBox="0 0 60 48" fill="none" stroke="currentColor" strokeWidth="1.2">
            <rect x="10" y="2" width="40" height="28" rx="2" opacity="0.5" />
            <rect x="4" y="10" width="40" height="28" rx="2" opacity="0.8" />
            <rect x="16" y="18" width="3" height="3" fill="currentColor" />
          </svg>
        </FloatingIcon>

        {/* Magnifier / zoom — bottom left */}
        <FloatingIcon className="bottom-[16%] left-[6%] text-cyan-600/30 dark:text-cyan-400/45" duration={13} delay={1.4} x={24} y={20}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="10" cy="10" r="7" />
            <line x1="21" y1="21" x2="15.5" y2="15.5" />
            <line x1="10" y1="7" x2="10" y2="13" />
            <line x1="7" y1="10" x2="13" y2="10" />
          </svg>
        </FloatingIcon>

        {/* Dashed crop rectangle — mid right */}
        <motion.div
          className="absolute top-[55%] right-[5%]"
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
            <rect x="5" y="5" width="60" height="60" rx="6" stroke="#a78bfa" strokeWidth="1" strokeDasharray="4 5" opacity="0.4" />
          </svg>
        </motion.div>

        {/* Sparkle accent — bottom right */}
        <FloatingIcon className="bottom-[20%] right-[8%] text-violet-500/35 dark:text-violet-300/55" duration={9} delay={0.3} x={16} y={22}>
          <svg width="30" height="30" viewBox="0 0 36 36" fill="currentColor">
            <path d="M18 2 L19.8 14.2 L32 18 L19.8 21.8 L18 34 L16.2 21.8 L4 18 L16.2 14.2 Z" opacity="0.85" />
          </svg>
        </FloatingIcon>

        {/* Pulsing ring accent — top centre */}
        <motion.div
          className="absolute top-[20%] left-[45%]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <circle cx="22" cy="22" r="19" stroke="#06b6d4" strokeWidth="1.4" />
            <circle cx="22" cy="22" r="11" stroke="#7c3aed" strokeWidth="1" strokeDasharray="3 4" />
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
            Selected Work
          </span>
          <h2 className="mt-4 text-4xl font-extrabold md:text-5xl lg:text-6xl">
            My{" "}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent dark:from-violet-400 dark:via-fuchsia-400 dark:to-cyan-400">
              Projects
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-600 md:text-lg dark:text-white/50">
            A look into thumbnails, posters, logos and ad creatives — click any
            piece to view it full size.
          </p>
        </motion.div>

        {/* Masonry gallery — 3 / 2 / 1 columns */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {columns.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col">
              {col.map((project) => {
                const globalIndex = PROJECTS.findIndex((p) => p.id === project.id);
                return (
                  <GalleryItem
                    key={project.id}
                    project={project}
                    index={globalIndex}
                    onOpen={openLightbox}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* Load more */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mt-12 flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setVisibleCount((c) => Math.min(c + LOAD_STEP, PROJECTS.length))}
              className="group flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-7 py-3 text-sm font-semibold text-gray-800 backdrop-blur transition-all hover:border-violet-400/50 hover:shadow-[0_0_30px_-8px_rgba(124,58,237,0.5)] dark:border-white/15 dark:bg-white/5 dark:text-white/90"
            >
              <Plus className="h-4 w-4 text-violet-600 transition-transform duration-300 group-hover:rotate-90 dark:text-violet-400" />
              Load More
              <span className="font-mono text-xs text-gray-500 dark:text-white/40">
                ({visibleCount}/{PROJECTS.length})
              </span>
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Bottom divider fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white pointer-events-none dark:to-[#0a0a0f]" />

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            projects={PROJECTS}
            activeIndex={lightboxIndex}
            onClose={closeLightbox}
            onNavigate={navigate}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;