"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin, Mail, ArrowUp } from 'lucide-react';
import { navLinks, BRAND } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function Footer() {
  const pathname = usePathname();

  function handleAnchorClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }

  function getLinkHref(href: string) {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const socials = [
    { icon: Github, href: BRAND.github, label: "GitHub" },
    { icon: Twitter, href: BRAND.twitter, label: "Twitter" },
    { icon: Linkedin, href: BRAND.linkedin, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${BRAND.email}`, label: "Email" },
  ];

  return (
    <footer className="relative border-t border-white/5 bg-[#0a0a0a]">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="max-w-6xl mx-auto px-6 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand column */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-[0_0_16px_rgba(168,85,247,0.3)]">
                {BRAND.initials}
              </span>
              <span className="font-display font-semibold text-sm tracking-tight text-white/90">
                {BRAND.name}
              </span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Building thoughtful digital experiences at the intersection of design and engineering.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-2 pt-1">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/8 border border-white/5 hover:border-white/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Nav links */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact column */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30">
              Get in Touch
            </h3>
            <p className="text-sm text-white/40 leading-relaxed">
              Open to new opportunities and interesting collaborations.
            </p>
            <a
              href={`mailto:${BRAND.email}`}
              className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded"
            >
              <Mail size={14} />
              <span className="group-hover:underline underline-offset-2">
                {BRAND.email}
              </span>
            </a>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          variants={fadeInUp}
          className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} {BRAND.name}. Crafted with care.
          </p>
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-white/40 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
          >
            <ArrowUp size={14} />
          </button>
        </motion.div>
      </motion.div>
    </footer>
  );
}