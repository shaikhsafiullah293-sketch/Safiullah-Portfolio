"use client";
import React from "react";
import { motion } from "framer-motion";

// Floating SVG icons related to graphic design
const FloatingIcon = ({ children, className, duration = 8, delay = 0, x = 30, y = 30 }) => (
  <motion.div
    className={`absolute ${className}`}
    animate={{
      x: [0, x, -x, 0],
      y: [0, -y, y, 0],
      rotate: [0, 15, -10, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
);

const Banner = () => {
  return (
    <section  id ="home" className="relative min-h-screen w-full overflow-hidden bg-slate-50 text-slate-900 dark:bg-[#0a0a0f] dark:text-white transition-colors duration-300">
      {/* Background gradients & grid */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#7c3aed15,transparent_60%),radial-gradient(ellipse_at_bottom_right,#06b6d415,transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top_left,#7c3aed33,transparent_60%),radial-gradient(ellipse_at_bottom_right,#06b6d433,transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08] block dark:hidden"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />
        <div
          className="absolute inset-0 hidden dark:block opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />
        {/* Blobs */}
        <motion.div
          className="absolute top-[-10%] left-[-10%] h-[480px] w-[480px] rounded-full bg-violet-400/20 dark:bg-violet-600/30 blur-3xl"
          animate={{ x: [0, 60, -40, 0], y: [0, -40, 50, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-15%] right-[-10%] h-[520px] w-[520px] rounded-full bg-cyan-400/15 dark:bg-cyan-500/25 blur-3xl"
          animate={{ x: [0, -50, 40, 0], y: [0, 40, -30, 0], scale: [1, 0.95, 1.1, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating graphic-design elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Pen Tool */}
        <FloatingIcon className="top-[15%] left-[8%] text-violet-500/50 dark:text-violet-400/70" duration={10} x={40} y={50}>
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 19l7-7 3 3-7 7-3-3z" />
            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
            <path d="M2 2l7.586 7.586" />
            <circle cx="11" cy="11" r="2" />
          </svg>
        </FloatingIcon>

        {/* Color Swatches */}
        <FloatingIcon className="top-[25%] right-[10%]" duration={12} delay={1} x={30} y={40}>
          <div className="flex gap-1.5">
            <span className="block h-5 w-5 rounded-md bg-violet-500 shadow-lg shadow-violet-500/40 dark:shadow-violet-500/50" />
            <span className="block h-5 w-5 rounded-md bg-cyan-400 shadow-lg shadow-cyan-400/40 dark:shadow-cyan-400/50" />
            <span className="block h-5 w-5 rounded-md bg-fuchsia-500 shadow-lg shadow-fuchsia-500/40 dark:shadow-fuchsia-500/50" />
          </div>
        </FloatingIcon>

        {/* Bezier curve */}
        <FloatingIcon className="bottom-[20%] left-[12%] text-cyan-500/50 dark:text-cyan-300/60" duration={14} delay={0.5} x={35} y={30}>
          <svg width="90" height="60" viewBox="0 0 90 60" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 50 C 20 5, 70 5, 85 50" strokeDasharray="3 3" />
            <circle cx="5" cy="50" r="3" fill="currentColor" />
            <circle cx="85" cy="50" r="3" fill="currentColor" />
            <circle cx="20" cy="5" r="2" fill="#a78bfa" />
            <circle cx="70" cy="5" r="2" fill="#a78bfa" />
            <line x1="5" y1="50" x2="20" y2="5" strokeWidth="0.8" />
            <line x1="85" y1="50" x2="70" y2="5" strokeWidth="0.8" />
          </svg>
        </FloatingIcon>

        {/* Layers */}
        <FloatingIcon className="bottom-[25%] right-[8%] text-fuchsia-500/50 dark:text-fuchsia-300/70" duration={11} delay={1.5} x={25} y={45}>
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        </FloatingIcon>

        {/* Rotating triangle (vector shape) */}
        <motion.div
          className="absolute top-[55%] left-[5%]"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="#06b6d4" strokeWidth="1.2" opacity="0.5" className="dark:stroke-[#22d3ee] dark:opacity-60">
            <polygon points="30,5 55,52 5,52" />
          </svg>
        </motion.div>

        {/* Rotating square outline */}
        <motion.div
          className="absolute top-[10%] right-[25%]"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <div className="h-12 w-12 rounded-md border border-violet-500/30 dark:border-violet-400/50" />
        </motion.div>

        {/* Type "Aa" badge */}
        <FloatingIcon className="top-[45%] right-[18%]" duration={9} delay={2} x={20} y={30}>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white/70 font-serif text-xl backdrop-blur dark:border-white/15 dark:bg-white/5">
            <span className="bg-gradient-to-br from-violet-600 to-cyan-600 bg-clip-text text-transparent dark:from-violet-300 dark:to-cyan-300">
              Aa
            </span>
          </div>
        </FloatingIcon>

        {/* Hex code chip */}
        <FloatingIcon className="bottom-[15%] left-[40%]" duration={13} delay={0.8} x={30} y={25}>
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 text-xs backdrop-blur dark:border-white/10 dark:bg-white/5">
            <span className="h-3 w-3 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500" />
            <span className="font-mono text-slate-600 dark:text-white/70">#7C3AED</span>
          </div>
        </FloatingIcon>

        {/* Dashed circle (selection) */}
        <motion.div
          className="absolute top-[35%] left-[30%]"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="35" stroke="#d946ef" strokeWidth="1" strokeDasharray="4 6" opacity="0.3" className="dark:stroke-[#f0abfc] dark:opacity-40" />
          </svg>
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-24 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50/50 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-violet-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-cyan-300"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-500 dark:bg-cyan-400" />
          Available for new projects
        </motion.span>

        <h1 className="text-5xl font-extrabold leading-tight md:text-7xl lg:text-8xl text-slate-900 dark:text-white">
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent animate-gradient dark:from-violet-400 dark:via-fuchsia-400 dark:to-cyan-400">
            Safiullah
          </span>
        </h1>

        <h2 className="mt-4 text-xl font-medium text-slate-600 dark:text-white/70 md:text-2xl">
          Graphic Designer · 2+ Years of Experience
        </h2>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-500 dark:text-white/60 md:text-lg">
          I turn ideas into powerful visuals that communicate, engage, and inspire.
          Thumbnails, posters, logos, social media posts & Meta Ads — crafted to leave
          a lasting impression.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            href="#projects"
            className="rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 px-8 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(124,58,237,0.4)] dark:from-violet-500 dark:to-cyan-500 dark:shadow-[0_0_30px_-5px_rgba(124,58,237,0.6)]"
          >
           <a></a> View My Work
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            href="#contact"
            className="rounded-full border border-slate-200 bg-white px-8 py-3 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur dark:border-white/15 dark:bg-white/5 dark:text-white/90"
          >
            Hire Me
          </motion.a>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-x-10 gap-y-3 text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-white/40">
          {["Thumbnails", "Posters", "Logos", "Social Media", "Meta Ads"].map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
            >
              {t}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 6s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Banner;
