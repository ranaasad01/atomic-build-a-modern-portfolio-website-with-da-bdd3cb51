"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin, Mail, ExternalLink, Code, Sparkles, Star, CheckCircle, Terminal, Layout, Activity, FileCode } from 'lucide-react';
import { BRAND } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline data ───────────────────────────────────────────────────────────────

const projects = [
  {
    id: "p1",
    title: "Luminary Design System",
    description:
      "A comprehensive component library built for scale. Covers tokens, accessibility, dark mode, and full Figma parity across 80+ components.",
    tags: ["React", "TypeScript", "Storybook", "Figma"],
    image: "https://cdn.prod.website-files.com/5e60642a30fed6e8bad55789/5f374060a5fdcb0681140afc_LDC_meta-image-2.png",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: "p2",
    title: "Orbit Analytics Dashboard",
    description:
      "Real-time SaaS analytics platform with interactive charts, cohort analysis, and a fully customizable widget grid for growth teams.",
    tags: ["Next.js", "Recharts", "Supabase", "Tailwind"],
    image: "https://i.ytimg.com/vi/glCQ5z3yMno/maxresdefault.jpg",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: "p3",
    title: "Pulse — AI Writing Tool",
    description:
      "Browser-based AI writing assistant with streaming completions, tone controls, and a distraction-free editor built on ProseMirror.",
    tags: ["OpenAI", "ProseMirror", "Vercel AI SDK", "React"],
    image: "https://resize.imagekit.co/lqMPSRGYC1GVEX2jinbiJQ42mJqIgpl8WwVLivKLsHc/h:300/dpr:2/bg:ffffff/plain/s3://betalist-production/8jx9rheid3i6c6f0h2sbwi725qdo",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: "p4",
    title: "Cartographer — Map CMS",
    description:
      "Headless CMS for interactive maps. Editors place rich markers, draw regions, and publish embeddable maps with zero code.",
    tags: ["MapLibre", "Node.js", "PostgreSQL", "React"],
    image: "https://cdn11.bigcommerce.com/s-dv52c4a6iz/product_images/uploaded_images/map-colors.jpg",
    liveUrl: "#",
    githubUrl: "#",
  },
];

const skills = [
  { name: "TypeScript", category: "Language" },
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "GraphQL", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Framer Motion", category: "Animation" },
  { name: "Figma", category: "Design" },
  { name: "Docker", category: "DevOps" },
  { name: "AWS", category: "DevOps" },
  { name: "Prisma", category: "Database" },
  { name: "Vitest", category: "Testing" },
  { name: "Storybook", category: "Tooling" },
  { name: "Vercel", category: "DevOps" },
  { name: "Supabase", category: "Backend" },
];

const services = [
  {
    icon: Layout,
    title: "Product Engineering",
    description:
      "Full-stack feature development from database schema to polished UI. I own the whole slice so nothing falls through the cracks.",
  },
  {
    icon: Sparkles,
    title: "Design Systems",
    description:
      "Scalable component libraries with strong token foundations, accessibility baked in, and Figma parity that keeps design and code in sync.",
  },
  {
    icon: Terminal,
    title: "Performance Audits",
    description:
      "Deep-dive profiling of Core Web Vitals, bundle size, and rendering bottlenecks. Delivered as an actionable report with prioritized fixes.",
  },
  {
    icon: FileCode,
    title: "Technical Writing",
    description:
      "Clear, developer-friendly documentation, API references, and onboarding guides that reduce support load and accelerate adoption.",
  },
];

const testimonials = [
  {
    id: "t1",
    quote:
      "Alex shipped our entire onboarding redesign in three weeks. The code was clean, the animations were buttery, and the team loved working with them.",
    author: "Priya Nair",
    role: "Head of Product, Finlo",
    avatar: "https://images.moneycontrol.com/static-mcnews/2025/07/20250711054946_HUL-appoints-Priya-Nair.jpg",
  },
  {
    id: "t2",
    quote:
      "Brought Alex in to rescue a struggling design system. They untangled years of tech debt and left us with something the whole org actually uses.",
    author: "Marcus Webb",
    role: "Engineering Manager, Stackline",
    avatar: "https://a.espncdn.com/i/headshots/nfl/players/full/13483.png",
  },
  {
    id: "t3",
    quote:
      "The performance audit alone saved us 40% on infrastructure costs. Incredibly thorough, communicates clearly, and delivers on time.",
    author: "Soo-Jin Park",
    role: "CTO, Meridian Labs",
    avatar: "http://yearsbuildingmaterials.com/cdn/shop/files/Years_Building_Materials_a9ad7db8-c2e6-4a2e-aeee-2d7f0469c399.png?v=1776452422",
  },
];

const stats = [
  { value: "6+", label: "Years building" },
  { value: "40+", label: "Projects shipped" },
  { value: "18", label: "Happy clients" },
  { value: "99%", label: "On-time delivery" },
];

// ─── Reusable tag pill ─────────────────────────────────────────────────────────

function Tag({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20"
      data-atomic-id="akldnhz">
      {label}
    </span>
  );
}

// ─── Section label ─────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20"
      data-atomic-id="apzw12w">
      {children}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">(
    "idle"
  );
  const [activeSkillCategory, setActiveSkillCategory] = useState("All");

  const skillCategories = [
    "All",
    ...Array.from(new Set(skills.map((s) => s.category))),
  ];
  const filteredSkills =
    activeSkillCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeSkillCategory);

  function handleFormChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormStatus("sending");
    setTimeout(() => {
      setFormStatus("sent");
      setFormState({ name: "", email: "", message: "" });
    }, 1200);
  }

  const motionProps = shouldReduceMotion
    ? {}
    : { variants: fadeInUp, initial: "hidden", whileInView: "visible" };

  return (
    <main
      className="bg-[#0a0a0a] text-white overflow-x-hidden"
      data-atomic-id="am2dwsq">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-16"
        data-atomic-id="a13m40vz">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          data-atomic-id="akjdymq">
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]"
            data-atomic-id="a851v2t" />
          <div
            className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-indigo-600/8 rounded-full blur-[100px]"
            data-atomic-id="a86gp7b" />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
            data-atomic-id="a89adgb" />
        </div>

        <div
          className="relative max-w-6xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-16 items-center"
          data-atomic-id="akkssr8">
          {/* Left: copy */}
          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="flex items-center gap-3"
            >
              <SectionLabel>
                <Sparkles size={11} />
                Available for work
              </SectionLabel>
            </motion.div>

            <motion.h1
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-[1.05] text-balance"
            >
              I build things
              <br data-atomic-id="a1fp1u9e" />
              <span
                className="bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent"
                data-atomic-id="a15mfnyq">
                people love
              </span>
              <br data-atomic-id="a1fp4x6e" />
              to use.
            </motion.h1>

            <motion.p
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="text-lg text-white/55 leading-relaxed max-w-md text-pretty"
            >
              {BRAND.tagline}. I craft fast, accessible, and beautifully
              detailed web products — from pixel-perfect interfaces to
              production-grade APIs.
            </motion.p>

            <motion.div
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm transition-all duration-200 shadow-[0_0_24px_rgba(168,85,247,0.35)] hover:shadow-[0_0_36px_rgba(168,85,247,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                data-atomic-id="a116x6rn">
                View my work
                <ArrowRight size={15} />
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:border-white/20 text-white/70 hover:text-white font-medium text-sm transition-all duration-200 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                data-atomic-id="a116x8g5">
                Get in touch
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="flex items-center gap-3 pt-2"
            >
              {[
                { icon: Github, href: BRAND.github, label: "GitHub" },
                { icon: Twitter, href: BRAND.twitter, label: "Twitter" },
                { icon: Linkedin, href: BRAND.linkedin, label: "LinkedIn" },
                {
                  icon: Mail,
                  href: `mailto:${BRAND.email}`,
                  label: "Email",
                },
              ].map(({ icon: Icon, href, label }, __atomicIdx) => (<a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-white/40 hover:text-white border border-white/8 hover:border-white/15 hover:bg-white/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                data-atomic-id="a1uk53qx"
                data-atomic-instance={__atomicIdx}>
                <Icon size={15} />
              </a>))}
            </motion.div>
          </motion.div>

          {/* Right: stats + code card */}
          <motion.div
            variants={shouldReduceMotion ? undefined : slideInRight}
            initial="hidden"
            animate="visible"
            className="hidden md:flex flex-col gap-6"
          >
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4" data-atomic-id="a1vswkn6">
              {stats.map((stat, __atomicIdx) => (<motion.div
                key={stat.label}
                whileHover={
                  shouldReduceMotion ? undefined : { y: -3, scale: 1.02 }
                }
                transition={{ duration: 0.2 }}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-purple-500/30 hover:bg-white/[0.05] transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_-8px_rgba(0,0,0,0.4)]"
              >
                <div
                  className="text-3xl font-display font-bold tracking-tight text-white"
                  data-atomic-id="az3axv7"
                  data-atomic-instance={__atomicIdx}>
                  {stat.value}
                </div>
                <div
                  className="text-xs text-white/40 mt-1"
                  data-atomic-id="az4przp"
                  data-atomic-instance={__atomicIdx}>{stat.label}</div>
              </motion.div>))}
            </div>

            {/* Code snippet card */}
            <div
              className="rounded-2xl bg-[#111] border border-white/8 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.3),0_16px_48px_-12px_rgba(0,0,0,0.6)]"
              data-atomic-id="a1vvq8w6">
              <div
                className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]"
                data-atomic-id="a10ds3rd">
                <span className="w-3 h-3 rounded-full bg-red-500/70" data-atomic-id="a1wpjwwr" />
                <span
                  className="w-3 h-3 rounded-full bg-yellow-500/70"
                  data-atomic-id="a1y05j19" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" data-atomic-id="a9n36n" />
                <span className="ml-2 text-xs text-white/30 font-mono" data-atomic-id="a1k8pb5">
                  portfolio.config.ts
                </span>
              </div>
              <pre
                className="p-5 text-xs font-mono leading-relaxed overflow-x-auto"
                data-atomic-id="a10f786n">
                <code data-atomic-id="a84p012">
                  <span className="text-purple-400" data-atomic-id="ab676f4">const</span>
                  <span className="text-white" data-atomic-id="acgssjm"> developer </span>
                  <span className="text-purple-400" data-atomic-id="adreeo4">= </span>
                  <span className="text-white" data-atomic-id="af200sm">{"{"}</span>
                  {"\n"}
                  <span className="text-white/40" data-atomic-id="al0t3e9">{"  "}</span>
                  <span className="text-indigo-300" data-atomic-id="ambepir">name</span>
                  <span className="text-white/60" data-atomic-id="anm0bn9">: </span>
                  <span className="text-green-400" data-atomic-id="aowlxrr">"Alex Mercer"</span>
                  <span className="text-white/60" data-atomic-id="aq77jw9">,</span>
                  {"\n"}
                  <span className="text-white/40" data-atomic-id="a17obcl0">{"  "}</span>
                  <span className="text-indigo-300" data-atomic-id="a18ywypi">focus</span>
                  <span className="text-white/60" data-atomic-id="a1a9iku0">: </span>
                  <span className="text-green-400" data-atomic-id="a1bk46yi">"Full-Stack"</span>
                  <span className="text-white/60" data-atomic-id="a1rqmdir">,</span>
                  {"\n"}
                  <span className="text-white/40" data-atomic-id="a1ubtlrr">{"  "}</span>
                  <span className="text-indigo-300" data-atomic-id="a1vmf7w9">available</span>
                  <span className="text-white/60" data-atomic-id="a1wx0u0r">: </span>
                  <span className="text-orange-400" data-atomic-id="ae2eylw">true</span>
                  <span className="text-white/60" data-atomic-id="afd0kqe">,</span>
                  {"\n"}
                  <span className="text-white/40" data-atomic-id="ahy7sze">{"  "}</span>
                  <span className="text-indigo-300" data-atomic-id="aj8tf3w">passion</span>
                  <span className="text-white/60" data-atomic-id="azfblo5">: </span>
                  <span className="text-green-400" data-atomic-id="a10px7sn">"great UX"</span>
                  {"\n"}
                  <span className="text-white" data-atomic-id="a13b4g1n">{"}"}</span>
                  {"\n"}
                  {"\n"}
                  <span className="text-purple-400" data-atomic-id="a1m2tuuw">export default</span>
                  <span className="text-white" data-atomic-id="a1ndfgze"> developer</span>
                  <span className="text-white/60" data-atomic-id="a1oo133w">;</span>
                </code>
              </pre>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span
            className="text-xs text-white/25 tracking-widest uppercase"
            data-atomic-id="afwdfmy">
            Scroll
          </span>
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
          />
        </motion.div>
      </section>
      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="relative py-24 md:py-32" data-atomic-id="aqu2phf">
        <div className="absolute inset-0 pointer-events-none" data-atomic-id="ay1q978">
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/6 rounded-full blur-[100px]"
            data-atomic-id="amz7t1z" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6" data-atomic-id="ay353bq">
          <div
            className="grid md:grid-cols-2 gap-16 items-center"
            data-atomic-id="atr3deh">
            {/* Image side */}
            <motion.div
              variants={shouldReduceMotion ? undefined : slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div
                className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-[0_1px_2px_rgba(0,0,0,0.3),0_24px_64px_-16px_rgba(0,0,0,0.7)] ring-1 ring-white/8"
                data-atomic-id="a1ak3xz5">
                <img
                  src="https://media.licdn.com/dms/image/v2/C5603AQEzcEfH73Yx_w/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1554802851672?e=2147483647&v=beta&t=dj7TAjD3hnbucRwbY4Q4mZZd9iwb7uGnq5Q34J3_jMo"
                  alt="Alex Mercer — Creative Developer"
                  className="w-full h-full object-cover"
                  data-atomic-id="a6gm5a" />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent"
                  data-atomic-id="a7vbza"
                  src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/bdd3cb51-7458-492d-9c88-349fa09199b7/images/uploaded-1782977891256-7rauoi.png?v=1782977892115" />
              </div>
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                className="absolute -bottom-5 -right-5 px-5 py-4 rounded-2xl bg-[#111] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-center gap-3" data-atomic-id="adq7mjs">
                  <span
                    className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]"
                    data-atomic-id="a1i85l16" />
                  <span className="text-sm font-medium text-white/80" data-atomic-id="a1jir75o">
                    Open to projects
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Copy side */}
            <motion.div
              variants={shouldReduceMotion ? undefined : staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-7"
            >
              <motion.div variants={shouldReduceMotion ? undefined : fadeInUp}>
                <SectionLabel>
                  <Code size={11} />
                  About me
                </SectionLabel>
              </motion.div>

              <motion.h2
                variants={shouldReduceMotion ? undefined : fadeInUp}
                className="text-4xl md:text-5xl font-display font-bold tracking-tight leading-tight text-balance"
              >
                Crafting interfaces that feel inevitable.
              </motion.h2>

              <motion.p
                variants={shouldReduceMotion ? undefined : fadeInUp}
                className="text-white/55 leading-relaxed text-pretty"
              >
                I'm a full-stack developer with six years of experience turning
                complex problems into clean, fast, and delightful products. I
                care deeply about the details — the micro-interaction that makes
                a form feel alive, the query that shaves 200ms off a load time,
                the token system that keeps a design consistent at scale.
              </motion.p>

              <motion.p
                variants={shouldReduceMotion ? undefined : fadeInUp}
                className="text-white/55 leading-relaxed text-pretty"
              >
                Before going independent, I led frontend at a Series B fintech
                and shipped consumer features to over two million users. Now I
                work with ambitious startups and product teams who want
                engineering that matches their design ambitions.
              </motion.p>

              <motion.div
                variants={shouldReduceMotion ? undefined : fadeInUp}
                className="grid grid-cols-2 gap-4 pt-2"
              >
                {[
                  "TypeScript-first",
                  "Accessibility advocate",
                  "Performance obsessed",
                  "Design-system thinker",
                ].map((trait, __atomicIdx) => (<div
                  key={trait}
                  className="flex items-center gap-2.5"
                  data-atomic-id="a1qr4ye3"
                  data-atomic-instance={__atomicIdx}>
                  <CheckCircle
                    size={14}
                    className="text-purple-400 shrink-0"
                  />
                  <span
                    className="text-sm text-white/65"
                    data-atomic-id="a1yajdm7"
                    data-atomic-instance={__atomicIdx}>{trait}</span>
                </div>))}
              </motion.div>

              <motion.div
                variants={shouldReduceMotion ? undefined : fadeInUp}
                className="pt-2"
              >
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector("#contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded"
                  data-atomic-id="a1hb3obb">
                  Let's work together
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 bg-[#0d0d0d]" data-atomic-id="a9nnolq">
        <div
          className="absolute inset-0 pointer-events-none"
          data-atomic-id="a12idcov">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent"
            data-atomic-id="a1bczsde" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6" data-atomic-id="a12js6td">
          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-4 mb-16 text-center"
          >
            <motion.div
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="flex justify-center"
            >
              <SectionLabel>
                <Activity size={11} />
                What I do
              </SectionLabel>
            </motion.div>
            <motion.h2
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="text-4xl md:text-5xl font-display font-bold tracking-tight text-balance"
            >
              Services built around your goals.
            </motion.h2>
            <motion.p
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="text-white/50 max-w-xl mx-auto leading-relaxed text-pretty"
            >
              Whether you need a full product built from scratch or a focused
              engagement to level up what you have, I bring the same care and
              craft to every project.
            </motion.p>
          </motion.div>

          {/* Asymmetric bento grid */}
          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {/* Large card */}
            <motion.div
              variants={shouldReduceMotion ? undefined : scaleIn}
              whileHover={
                shouldReduceMotion ? undefined : { y: -4, scale: 1.01 }
              }
              transition={{ duration: 0.25 }}
              className="md:col-span-2 p-8 rounded-2xl bg-gradient-to-br from-purple-600/15 via-purple-600/5 to-transparent border border-purple-500/20 hover:border-purple-500/35 transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_32px_-8px_rgba(0,0,0,0.5)] group"
            >
              <div
                className="w-11 h-11 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center mb-6 group-hover:bg-purple-500/25 transition-colors duration-300"
                data-atomic-id="ale3ouo">
                <Layout size={20} className="text-purple-400" />
              </div>
              <h3
                className="text-xl font-display font-semibold tracking-tight mb-3"
                data-atomic-id="a2sv8bu">
                Product Engineering
              </h3>
              <p
                className="text-white/50 leading-relaxed text-sm text-pretty"
                data-atomic-id="a1snpen5">
                Full-stack feature development from database schema to polished
                UI. I own the whole slice so nothing falls through the cracks.
                React, Next.js, Node, and whatever the job calls for — chosen
                for fit, not familiarity.
              </p>
            </motion.div>

            {/* Tall card */}
            <motion.div
              variants={shouldReduceMotion ? undefined : scaleIn}
              whileHover={
                shouldReduceMotion ? undefined : { y: -4, scale: 1.01 }
              }
              transition={{ duration: 0.25 }}
              className="p-8 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-white/15 hover:bg-white/[0.05] transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_32px_-8px_rgba(0,0,0,0.5)] group"
            >
              <div
                className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-purple-500/15 group-hover:border-purple-500/25 transition-all duration-300"
                data-atomic-id="ayxutjo">
                <Sparkles size={20} className="text-white/50 group-hover:text-purple-400 transition-colors duration-300" />
              </div>
              <h3
                className="text-xl font-display font-semibold tracking-tight mb-3"
                data-atomic-id="a15yfpwu">
                Design Systems
              </h3>
              <p
                className="text-white/50 leading-relaxed text-sm text-pretty"
                data-atomic-id="a1ndydwl">
                Scalable component libraries with strong token foundations,
                accessibility baked in, and Figma parity that keeps design and
                code in sync.
              </p>
            </motion.div>

            {/* Bottom two */}
            {services.slice(2).map((service, __atomicIdx) => (<motion.div
              key={service.title}
              variants={shouldReduceMotion ? undefined : scaleIn}
              whileHover={
                shouldReduceMotion ? undefined : { y: -4, scale: 1.01 }
              }
              transition={{ duration: 0.25 }}
              className="p-8 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-white/15 hover:bg-white/[0.05] transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_32px_-8px_rgba(0,0,0,0.5)] group"
            >
              <div
                className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-purple-500/15 group-hover:border-purple-500/25 transition-all duration-300"
                data-atomic-id="a274toq"
                data-atomic-instance={__atomicIdx}>
                <service.icon
                  size={20}
                  className="text-white/50 group-hover:text-purple-400 transition-colors duration-300"
                />
              </div>
              <h3
                className="text-xl font-display font-semibold tracking-tight mb-3"
                data-atomic-id="a1qhlm5g"
                data-atomic-instance={__atomicIdx}>
                {service.title}
              </h3>
              <p
                className="text-white/50 leading-relaxed text-sm text-pretty"
                data-atomic-id="a1luv63f"
                data-atomic-instance={__atomicIdx}>
                {service.description}
              </p>
            </motion.div>))}
          </motion.div>
        </div>
      </section>
      {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <section
        id="projects"
        className="relative py-24 md:py-32"
        data-atomic-id="a1vwqf6a">
        <div
          className="absolute inset-0 pointer-events-none"
          data-atomic-id="a1g24hdv">
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/6 rounded-full blur-[100px]"
            data-atomic-id="a1wz1ap2" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6" data-atomic-id="a1g3jbid">
          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
          >
            <div className="space-y-4" data-atomic-id="a1q5zcdn">
              <motion.div variants={shouldReduceMotion ? undefined : fadeInUp}>
                <SectionLabel>
                  <FileCode size={11} />
                  Selected work
                </SectionLabel>
              </motion.div>
              <motion.h2
                variants={shouldReduceMotion ? undefined : fadeInUp}
                className="text-4xl md:text-5xl font-display font-bold tracking-tight text-balance"
              >
                Projects I'm proud of.
              </motion.h2>
            </div>
            <motion.p
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="text-white/45 max-w-xs leading-relaxed text-sm text-pretty md:text-right"
            >
              A curated selection of recent work spanning product, tooling, and
              open source.
            </motion.p>
          </motion.div>

          {/* Featured projects — alternating layout */}
          <div className="space-y-8 mb-8" data-atomic-id="a4smhbg">
            {projects
              .filter((p) => p.featured)
              .map((project, i) => (
                <motion.div
                  key={project.id}
                  variants={shouldReduceMotion ? undefined : fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  whileHover={
                    shouldReduceMotion ? undefined : { y: -3 }
                  }
                  transition={{ duration: 0.25 }}
                  className={`group grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-white/8 hover:border-purple-500/25 transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_16px_48px_-12px_rgba(0,0,0,0.6)] ${
                    i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* Image */}
                  <div
                    className="relative aspect-[16/10] md:aspect-auto overflow-hidden bg-[#111]"
                    data-atomic-id="ay6r19b"
                    data-atomic-instance={i}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      data-atomic-id="ajzu27w"
                      data-atomic-instance={i} />
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent"
                      data-atomic-id="ak18s1w"
                      data-atomic-instance={i} />
                  </div>

                  {/* Content */}
                  <div
                    className="p-8 md:p-10 bg-[#0f0f0f] flex flex-col justify-center gap-5"
                    data-atomic-id="ay9kpib"
                    data-atomic-instance={i}>
                    <div
                      className="flex flex-wrap gap-2"
                      data-atomic-id="axjl2me"
                      data-atomic-instance={i}>
                      {project.tags.map((tag) => (
                        <Tag key={tag} label={tag} />
                      ))}
                    </div>
                    <div data-atomic-id="axkzwqw" data-atomic-instance={i}>
                      <h3
                        className="text-2xl font-display font-bold tracking-tight mb-3"
                        data-atomic-id="an53f9f"
                        data-atomic-instance={i}>
                        {project.title}
                      </h3>
                      <p
                        className="text-white/50 leading-relaxed text-sm text-pretty"
                        data-atomic-id="ak2n2oq"
                        data-atomic-instance={i}>
                        {project.description}
                      </p>
                    </div>
                    <div
                      className="flex items-center gap-4 pt-1"
                      data-atomic-id="axmeqve"
                      data-atomic-instance={i}>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded group/link"
                          data-atomic-id="a1lr8son"
                          data-atomic-instance={i}>
                          Live site
                          <ExternalLink
                            size={13}
                            className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200"
                          />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-white/40 hover:text-white/70 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded"
                          data-atomic-id="aszh3i1"
                          data-atomic-instance={i}>
                          <Github size={13} />
                          Source
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Non-featured project */}
          {projects
            .filter((p) => !p.featured)
            .map((project, __atomicIdx) => (<motion.div
            key={project.id}
            variants={shouldReduceMotion ? undefined : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            whileHover={shouldReduceMotion ? undefined : { y: -3 }}
            transition={{ duration: 0.25 }}
            className="group p-7 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-purple-500/25 hover:bg-white/[0.05] transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_-8px_rgba(0,0,0,0.4)] flex flex-col md:flex-row gap-6 items-start"
          >
            <div
              className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0 bg-[#111]"
              data-atomic-id="a1rw7dxa"
              data-atomic-instance={__atomicIdx}>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                data-atomic-id="a1d91mkb"
                data-atomic-instance={__atomicIdx} />
            </div>
            <div
              className="flex-1 space-y-3"
              data-atomic-id="a1rxm81s"
              data-atomic-instance={__atomicIdx}>
              <div
                className="flex flex-wrap gap-2"
                data-atomic-id="a1k0x2mb"
                data-atomic-instance={__atomicIdx}>
                {project.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
              <h3
                className="text-xl font-display font-semibold tracking-tight"
                data-atomic-id="apdj62l"
                data-atomic-instance={__atomicIdx}>
                {project.title}
              </h3>
              <p
                className="text-white/50 text-sm leading-relaxed text-pretty"
                data-atomic-id="a19yxr4k"
                data-atomic-instance={__atomicIdx}>
                {project.description}
              </p>
              <div
                className="flex items-center gap-4 pt-1"
                data-atomic-id="a1k55kzt"
                data-atomic-instance={__atomicIdx}>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded"
                    data-atomic-id="a228a9i"
                    data-atomic-instance={__atomicIdx}>
                    Live site
                    <ExternalLink size={13} />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-white/40 hover:text-white/70 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded"
                    data-atomic-id="a18bkn20"
                    data-atomic-instance={__atomicIdx}>
                    <Github size={13} />
                    Source
                  </a>
                )}
              </div>
            </div>
          </motion.div>))}
        </div>
      </section>
      {/* ── SKILLS ───────────────────────────────────────────────────────── */}
      <section
        id="skills"
        className="relative py-24 md:py-32 bg-[#0d0d0d]"
        data-atomic-id="a1j4p3rq">
        <div
          className="absolute inset-0 pointer-events-none"
          data-atomic-id="a1tlvm2v">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent"
            data-atomic-id="ajjyr1m" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6" data-atomic-id="a1tnag7d">
          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-4 mb-12 text-center"
          >
            <motion.div
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="flex justify-center"
            >
              <SectionLabel>
                <Terminal size={11} />
                Tech stack
              </SectionLabel>
            </motion.div>
            <motion.h2
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="text-4xl md:text-5xl font-display font-bold tracking-tight text-balance"
            >
              Tools I reach for.
            </motion.h2>
          </motion.div>

          {/* Category filter */}
          <motion.div
            variants={shouldReduceMotion ? undefined : fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {skillCategories.map((cat, __atomicIdx) => (<button
              key={cat}
              onClick={() => setActiveSkillCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                activeSkillCategory === cat
                  ? "bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                  : "bg-white/5 text-white/50 hover:text-white hover:bg-white/10 border border-white/8"
              }`}
              data-atomic-id="a1q2o1lj"
              data-atomic-instance={__atomicIdx}>
              {cat}
            </button>))}
          </motion.div>

          {/* Skills grid */}
          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-wrap justify-center gap-3"
          >
            {filteredSkills.map((skill, __atomicIdx) => (<motion.div
              key={skill.name}
              variants={shouldReduceMotion ? undefined : scaleIn}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { y: -3, scale: 1.05 }
              }
              transition={{ duration: 0.2 }}
              className="px-5 py-3 rounded-xl bg-white/[0.04] border border-white/8 hover:border-purple-500/30 hover:bg-purple-500/8 transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.15),0_4px_12px_-4px_rgba(0,0,0,0.3)] cursor-default"
            >
              <span
                className="text-sm font-medium text-white/75 hover:text-white transition-colors duration-200"
                data-atomic-id="a1111i44"
                data-atomic-instance={__atomicIdx}>
                {skill.name}
              </span>
              <span
                className="block text-xs text-white/30 mt-0.5"
                data-atomic-id="a12bn48m"
                data-atomic-instance={__atomicIdx}>
                {skill.category}
              </span>
            </motion.div>))}
          </motion.div>
        </div>
      </section>
      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32" data-atomic-id="a4e08s1">
        <div className="absolute inset-0 pointer-events-none" data-atomic-id="aezzmte">
          <div
            className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-purple-600/6 rounded-full blur-[100px]"
            data-atomic-id="andits5" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6" data-atomic-id="af1egxw">
          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-4 mb-14 text-center"
          >
            <motion.div
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="flex justify-center"
            >
              <SectionLabel>
                <Star size={11} />
                Kind words
              </SectionLabel>
            </motion.div>
            <motion.h2
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="text-4xl md:text-5xl font-display font-bold tracking-tight text-balance"
            >
              What clients say.
            </motion.h2>
          </motion.div>

          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-3 gap-5"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                variants={shouldReduceMotion ? undefined : fadeInUp}
                whileHover={
                  shouldReduceMotion ? undefined : { y: -4 }
                }
                transition={{ duration: 0.25 }}
                className={`p-7 rounded-2xl border transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_32px_-8px_rgba(0,0,0,0.5)] ${
                  i === 1
                    ? "bg-gradient-to-br from-purple-600/15 via-purple-600/5 to-transparent border-purple-500/25 md:-mt-4"
                    : "bg-white/[0.03] border-white/8 hover:border-white/15"
                }`}
              >
                {/* Stars */}
                <div
                  className="flex items-center gap-1 mb-5"
                  data-atomic-id="a1us2gxo"
                  data-atomic-instance={i}>
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star
                      key={si}
                      size={13}
                      className="text-purple-400 fill-purple-400"
                    />
                  ))}
                </div>
                <p
                  className="text-white/70 text-sm leading-relaxed mb-6 text-pretty"
                  data-atomic-id="ad1himj"
                  data-atomic-instance={i}>
                  "{t.quote}"
                </p>
                <div
                  className="flex items-center gap-3"
                  data-atomic-id="a1uuw56o"
                  data-atomic-instance={i}>
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-9 h-9 rounded-full object-cover ring-1 ring-white/10"
                    data-atomic-id="a1cdbb5p"
                    data-atomic-instance={i} />
                  <div data-atomic-id="a1ceq0zp" data-atomic-instance={i}>
                    <div
                      className="text-sm font-medium text-white/85"
                      data-atomic-id="aiuga08"
                      data-atomic-instance={i}>
                      {t.author}
                    </div>
                    <div
                      className="text-xs text-white/40"
                      data-atomic-id="aivv44q"
                      data-atomic-instance={i}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="relative py-24 md:py-32 bg-[#0d0d0d]"
        data-atomic-id="a1qn2zcl">
        <div className="absolute inset-0 pointer-events-none" data-atomic-id="asjqrie">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent"
            data-atomic-id="a18zkc3t" />
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-600/8 rounded-full blur-[100px]"
            data-atomic-id="a190z68b" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6" data-atomic-id="asl5lmw">
          <div
            className="grid md:grid-cols-2 gap-16 items-start"
            data-atomic-id="a1frfwgb">
            {/* Left: copy */}
            <motion.div
              variants={shouldReduceMotion ? undefined : staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-7"
            >
              <motion.div variants={shouldReduceMotion ? undefined : fadeInUp}>
                <SectionLabel>
                  <Mail size={11} />
                  Get in touch
                </SectionLabel>
              </motion.div>

              <motion.h2
                variants={shouldReduceMotion ? undefined : fadeInUp}
                className="text-4xl md:text-5xl font-display font-bold tracking-tight leading-tight text-balance"
              >
                Let's build something great together.
              </motion.h2>

              <motion.p
                variants={shouldReduceMotion ? undefined : fadeInUp}
                className="text-white/50 leading-relaxed text-pretty"
              >
                I'm currently available for freelance projects, contract work,
                and select full-time roles. If you have a project in mind or
                just want to say hello, my inbox is always open.
              </motion.p>

              <motion.div
                variants={shouldReduceMotion ? undefined : fadeInUp}
                className="space-y-4"
              >
                <a
                  href={`mailto:${BRAND.email}`}
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded"
                  data-atomic-id="a144g36i">
                  <span
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center group-hover:bg-purple-500/15 group-hover:border-purple-500/25 transition-all duration-200"
                    data-atomic-id="asbrhny">
                    <Mail size={14} className="text-white/50 group-hover:text-purple-400 transition-colors duration-200" />
                  </span>
                  {BRAND.email}
                </a>
                <a
                  href={BRAND.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded"
                  data-atomic-id="a144g4v0">
                  <span
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center group-hover:bg-purple-500/15 group-hover:border-purple-500/25 transition-all duration-200"
                    data-atomic-id="a12scz74">
                    <Github size={14} className="text-white/50 group-hover:text-purple-400 transition-colors duration-200" />
                  </span>
                  github.com/alexmercer
                </a>
                <a
                  href={BRAND.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded"
                  data-atomic-id="a144g6ji">
                  <span
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center group-hover:bg-purple-500/15 group-hover:border-purple-500/25 transition-all duration-200"
                    data-atomic-id="a1d8ygqa">
                    <Linkedin size={14} className="text-white/50 group-hover:text-purple-400 transition-colors duration-200" />
                  </span>
                  linkedin.com/in/alexmercer
                </a>
              </motion.div>
            </motion.div>

            {/* Right: form */}
            <motion.div
              variants={shouldReduceMotion ? undefined : slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <div
                className="p-8 rounded-2xl bg-white/[0.03] border border-white/8 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_16px_48px_-12px_rgba(0,0,0,0.6)]"
                data-atomic-id="a1avivjr">
                {formStatus === "sent" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex flex-col items-center justify-center py-12 gap-4 text-center"
                  >
                    <div
                      className="w-14 h-14 rounded-full bg-green-500/15 border border-green-500/25 flex items-center justify-center"
                      data-atomic-id="a11i3hs">
                      <CheckCircle size={24} className="text-green-400" />
                    </div>
                    <h3 className="text-xl font-display font-semibold" data-atomic-id="awbi45m">
                      Message sent!
                    </h3>
                    <p
                      className="text-white/50 text-sm leading-relaxed max-w-xs"
                      data-atomic-id="ai75xxd">
                      Thanks for reaching out. I'll get back to you within one
                      business day.
                    </p>
                    <button
                      onClick={() => setFormStatus("idle")}
                      className="mt-2 text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded"
                      data-atomic-id="a14vt227">
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleFormSubmit}
                    className="space-y-5"
                    data-atomic-id="aazuybd">
                    <div className="space-y-1.5" data-atomic-id="au4v6tn">
                      <label
                        htmlFor="name"
                        className="block text-xs font-medium text-white/50 uppercase tracking-wider"
                        data-atomic-id="a1mlcwi3">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={handleFormChange}
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all duration-200"
                        data-atomic-id="au8884d" />
                    </div>
                    <div className="space-y-1.5" data-atomic-id="au6a0y5">
                      <label
                        htmlFor="email"
                        className="block text-xs font-medium text-white/50 uppercase tracking-wider"
                        data-atomic-id="a1cnhp71">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={handleFormChange}
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all duration-200"
                        data-atomic-id="akad0tb" />
                    </div>
                    <div className="space-y-1.5" data-atomic-id="au7ov2n">
                      <label
                        htmlFor="message"
                        className="block text-xs font-medium text-white/50 uppercase tracking-wider"
                        data-atomic-id="a12pmhvz">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formState.message}
                        onChange={handleFormChange}
                        placeholder="Tell me about your project..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all duration-200 resize-none"
                        data-atomic-id="ax47633" />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={formStatus === "sending"}
                      whileHover={
                        shouldReduceMotion ? undefined : { scale: 1.02 }
                      }
                      whileTap={
                        shouldReduceMotion ? undefined : { scale: 0.98 }
                      }
                      className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-sm transition-all duration-200 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_32px_rgba(168,85,247,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 flex items-center justify-center gap-2"
                    >
                      {formStatus === "sending" ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.8,
                              ease: "linear",
                            }}
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send message
                          <ArrowRight size={15} />
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}