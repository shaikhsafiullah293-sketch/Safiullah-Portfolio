"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, ArrowUpRight, Copy, Check } from "lucide-react";

// ── Reuse the same FloatingIcon wrapper from other sections ─────────────────
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

// ── Inline Facebook glyph (brand icons were dropped from lucide-react) ─────
const FacebookIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.16 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.91h-2.33V22c4.78-.78 8.44-4.94 8.44-9.94z" />
  </svg>
);

// ── Contact channels ──────────────────────────────────────────────────────────
const EMAIL = "shaikhsafiullah293@gmail.com";
const WHATSAPP_NUMBER = "923342762693"; 
const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61587286732018";

const CHANNELS = [
  {
    id: "email",
    label: "Email",
    value: EMAIL,
    sub: "Best for project briefs & files",
    href: `mailto:${EMAIL}`,
    icon: Mail,
    color: "#7c3aed",
    glow: "rgba(124,58,237,0.2)",
    copyable: true,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "+92 334 2762693",
    sub: "Fastest way to reach me",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    icon: MessageCircle,
    color: "#22c55e",
    glow: "rgba(34,197,94,0.2)",
    copyable: false,
  },
  {
    id: "facebook",
    label: "Facebook",
    value: "Safiullah",
    sub: "See more work & updates",
    href: FACEBOOK_URL,
    icon: FacebookIcon,
    color: "#1877F2",
    glow: "rgba(24,119,242,0.2)",
    copyable: false,
  },
];

// ── Single channel card ───────────────────────────────────────────────────────
function ChannelCard({ channel, index }) {
  const [copied, setCopied] = useState(false);
  const Icon = channel.icon;

  const handleCopy = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(channel.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — silently ignore, link still works
    }
  };

  return (
    <motion.a
      href={channel.href}
      target={channel.id === "email" ? undefined : "_blank"}
      rel={channel.id === "email" ? undefined : "noopener noreferrer"}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col gap-5 rounded-2xl border border-black/[0.08] bg-black/[0.02] p-7 backdrop-blur-sm transition-colors hover:border-violet-400/30 dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:border-violet-400/30"
    >
      {/* Hover glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `0 16px 48px -14px ${channel.glow}` }}
      />

      <div className="flex items-start justify-between">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-110"
          style={{ background: channel.glow, borderColor: `${channel.color}33` }}
        >
          <Icon className="h-6 w-6" style={{ color: channel.color }} />
        </div>

        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-gray-500 transition-all group-hover:border-violet-400/40 group-hover:text-violet-600 dark:border-white/10 dark:bg-white/5 dark:text-white/50 dark:group-hover:text-violet-300">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-white/40">
          {channel.label}
        </p>
        <p className="mt-1.5 break-all text-lg font-semibold text-gray-900 dark:text-white">
          {channel.value}
        </p>
        <p className="mt-1 text-sm text-gray-500 dark:text-white/40">{channel.sub}</p>
      </div>

      {channel.copyable && (
        <button
          onClick={handleCopy}
          className="relative z-10 mt-1 flex w-fit items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-all hover:border-violet-400/40 hover:text-violet-700 dark:border-white/10 dark:bg-white/5 dark:text-white/60 dark:hover:text-violet-300"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy email
            </>
          )}
        </button>
      )}
    </motion.a>
  );
}

// ── Main Contact section ──────────────────────────────────────────────────────
const Contact = () => {
  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-white text-gray-900 transition-colors duration-300 dark:bg-[#0a0a0f] dark:text-white"
    >
      {/* ── Background treatment — matches other sections ── */}
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
          className="absolute top-[-10%] left-[-8%] h-[420px] w-[420px] rounded-full bg-violet-600/10 blur-3xl dark:bg-violet-600/20"
          animate={{ x: [0, 50, -30, 0], y: [0, -30, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-8%] h-[380px] w-[380px] rounded-full bg-cyan-500/8 blur-3xl dark:bg-cyan-500/15"
          animate={{ x: [0, -40, 30, 0], y: [0, 30, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ── Floating decorative elements ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Envelope — top left */}
        <FloatingIcon className="top-[8%] left-[5%] text-violet-500/30 dark:text-violet-400/40" duration={12} delay={0} x={20} y={26}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M2 6l10 7 10-7" />
          </svg>
        </FloatingIcon>

        {/* Chat bubble — top right */}
        <FloatingIcon className="top-[10%] right-[6%] text-emerald-500/35 dark:text-emerald-300/45" duration={10} delay={0.5} x={18} y={22}>
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </FloatingIcon>

        {/* Paper plane — mid left */}
        <FloatingIcon className="top-[42%] left-[4%] text-cyan-500/30 dark:text-cyan-300/45" duration={14} delay={1} x={22} y={28}>
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </FloatingIcon>

        {/* Sparkle — bottom left */}
        <FloatingIcon className="bottom-[18%] left-[6%] text-fuchsia-500/35 dark:text-fuchsia-300/45" duration={9} delay={0.3} x={16} y={22}>
          <svg width="30" height="30" viewBox="0 0 36 36" fill="currentColor">
            <path d="M18 2 L19.8 14.2 L32 18 L19.8 21.8 L18 34 L16.2 21.8 L4 18 L16.2 14.2 Z" opacity="0.85" />
          </svg>
        </FloatingIcon>

        {/* Dashed orbit ring — mid right */}
        <motion.div
          className="absolute top-[55%] right-[7%]"
          animate={{ rotate: 360 }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        >
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <circle cx="28" cy="28" r="24" stroke="#22d3ee" strokeWidth="1" strokeDasharray="4 6" opacity="0.35" />
          </svg>
        </motion.div>

        {/* Pulsing ring — bottom right */}
        <motion.div
          className="absolute bottom-[14%] right-[8%]"
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
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-32">
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
            Let's Talk
          </span>
          <h2 className="mt-4 text-4xl font-extrabold md:text-5xl lg:text-6xl">
            Get In{" "}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent dark:from-violet-400 dark:via-fuchsia-400 dark:to-cyan-400">
              Touch
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-600 md:text-lg dark:text-white/50">
            Have a project in mind? Pick whichever way works best for you —
            I usually reply within a few hours.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CHANNELS.map((channel, i) => (
            <ChannelCard key={channel.id} channel={channel} index={i} />
          ))}
        </div>
      </div>

      {/* Bottom divider fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white pointer-events-none dark:to-[#0a0a0f]" />
    </section>
  );
};

export default Contact;