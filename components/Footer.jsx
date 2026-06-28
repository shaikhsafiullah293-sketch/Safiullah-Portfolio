"use client";

import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden transition-colors duration-300 bg-slate-100 text-slate-600 dark:bg-[#0a0a0f] dark:text-white/40">

      {/* Top border gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-500/50 to-transparent dark:via-violet-500/30" />

      {/* Subtle glow behind content */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,#7c3aed08,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,#7c3aed15,transparent_70%)]" />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">

          {/* Left — name + copyright */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-sm"
          >
            <span className="font-bold bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-cyan-400">
              Safiullah
            </span>
            <span className="text-slate-400 dark:text-white/20">·</span>
            <span>© {year} All rights reserved.</span>
          </motion.div>

          {/* Right — dev credit */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-1.5 text-sm"
          >
            <span>Crafted by</span>
            <a
              href="https://www.fiverr.com/s/6Yyl74q"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold transition-colors text-violet-600 hover:text-cyan-600 dark:text-violet-400 dark:hover:text-cyan-400"
            >
              MA DevStudio
            </a>
          </motion.div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;