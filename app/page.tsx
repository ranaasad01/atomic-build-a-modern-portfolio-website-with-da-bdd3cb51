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

    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/bdd3cb51-7458-492d-9c88-349fa09199b7/images/uploaded-1782980197267-9r1bfr.png?v=1782980198389",

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

      "Deep-dive audits covering Core Web Vitals, bundle analysis, and rendering strategies — with a prioritised fix list you can act on immediately.",

  },

  {

    icon: FileCode,

    title: "Technical Writing",

    description:

      "Clear, accurate docs, API references, and engineering blog posts that help your team ship faster and onboard new hires with confidence.",

  },

];

const stats = [

  { value: "5+", label: "Years experience" },

  { value: "40+", label: "Projects shipped" },

  { value: "100+", label: "Happy clients" },

  { value: "99%", label: "Client satisfaction" },

];

const testimonials = [

  {

    id: "t1",

    name: "Sarah Chen",

    role: "CPO @ Luminary",

    avatar: "SC",

    body: "ASad rewrote our entire design system in six weeks. The quality was exceptional — every component is accessible, documented, and a joy to use.",

  },

  {

    id: "t2",

    name: "Marcus Webb",

    role: "Founder @ Orbit",

    avatar: "MW",

    body: "Hired ASad to build our analytics dashboard from scratch. He delivered ahead of schedule and the performance numbers blew us away.",

  },

  {

    id: "t3",

    name: "Priya Nair",

    role: "Engineering Lead @ Pulse",

    avatar: "PN",

    body: "ASad has a rare ability to translate complex product requirements into clean, maintainable code. He's the first person I call for hard problems.",

  },

];

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {

  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-xs font-medium tracking-widest uppercase mb-4"
      data-atomic-id="amgf7s">
      <span
        className="w-1 h-1 rounded-full bg-purple-400 animate-pulse"
        data-atomic-id="a11w18ey" />
      {children}
    </div>
  );

}

function ProjectCard({ project }: { project: (typeof projects)[0] }) {

  const [hovered, setHovered] = useState(false);

  return (
    <motion.article

      variants={scaleIn}

      onMouseEnter={() => setHovered(true)}

      onMouseLeave={() => setHovered(false)}

      className="group relative flex flex-col rounded-2xl border border-white/5 bg-[#1a1a1a] overflow-hidden hover:border-purple-500/20 transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.08)]"

    >
      {/* Image */}
      <div
        className="relative h-48 overflow-hidden bg-[#111]"
        data-atomic-id="a9e7kr3">

        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {

            (e.currentTarget as HTMLImageElement).style.display = "none";

          }}
          data-atomic-id="a1ypnj3g" />

        <div
          className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent"
          data-atomic-id="a1yr28xg" />

        {project.featured && (

          <span
            className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[10px] font-medium tracking-wider uppercase"
            data-atomic-id="a102z04x">

            Featured

          </span>

        )}

      </div>
      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-3" data-atomic-id="a9h1903">

        <h3
          className="font-display font-semibold text-lg text-white group-hover:text-purple-300 transition-colors duration-200"
          data-atomic-id="afgumtq">

          {project.title}

        </h3>

        <p
          className="text-sm text-white/50 leading-relaxed flex-1"
          data-atomic-id="afjak91">

          {project.description}

        </p>

        {/* Tags */}

        <div className="flex flex-wrap gap-1.5 pt-1" data-atomic-id="adcizwc">

          {project.tags.map((tag, __atomicIdx) => (<span
            key={tag}
            className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-white/40 text-[11px] font-medium"
            data-atomic-id="a1yoc0ih"
            data-atomic-instance={__atomicIdx}>
            {tag}
          </span>))}

        </div>

        {/* Links */}

        <div className="flex items-center gap-3 pt-2" data-atomic-id="aanfeg7">

          {project.liveUrl && (

            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 transition-colors duration-200 font-medium"
              data-atomic-id="aa97q38">

              <ExternalLink size={12} />

              Live demo

            </a>

          )}

          {project.githubUrl && (

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors duration-200 font-medium"
              data-atomic-id="a1gik2vq">

              <Github size={12} />

              Source

            </a>

          )}

        </div>

      </div>
    </motion.article>
  );

}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {

  const [mounted, setMounted] = useState(false);

  const prefersReduced = useReducedMotion();

  useEffect(() => {

    setMounted(true);

  }, []);

  return (
    <div
      className="min-h-screen bg-[#0f0f0f] text-white"
      data-atomic-id="a1l06f6q">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden"
        data-atomic-id="a12bmc8p">

        {/* Background glows */}

        <div className="absolute inset-0 pointer-events-none" data-atomic-id="abokm6k">

          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[120px]"
            data-atomic-id="a1joo0sv" />

          <div
            className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-indigo-600/8 blur-[80px]"
            data-atomic-id="a1jq2uxd" />

        </div>

        {/* Grid overlay */}

        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{

            backgroundImage:

              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",

            backgroundSize: "60px 60px",

          }}
          data-atomic-id="abreafk" />

        <motion.div

          variants={staggerContainer}

          initial="hidden"

          animate="visible"

          className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-6"

        >

          {/* Badge */}

          <motion.div variants={fadeInUp}>

            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-300 text-xs font-medium tracking-widest uppercase"
              data-atomic-id="a198h7zd">

              <span
                className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"
                data-atomic-id="arybqx8" />

              Available for new projects

            </span>

          </motion.div>

          {/* Headline */}

          <motion.h1

            variants={fadeInUp}

            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] text-white"

          >

            Hi, I&apos;m{" "}

            <span
              className="bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent"
              data-atomic-id="a1vg9t67">

              {BRAND.name}

            </span>

          </motion.h1>

          {/* Sub */}

          <motion.p

            variants={fadeInUp}

            className="max-w-2xl text-lg sm:text-xl text-white/50 leading-relaxed"

          >

            Full-stack developer &amp; creative technologist crafting immersive

            digital experiences. I turn complex problems into elegant,

            performant products.

          </motion.p>

          {/* CTAs */}

          <motion.div

            variants={fadeInUp}

            className="flex flex-wrap items-center justify-center gap-4 pt-2"

          >

            <Link

              href="#projects"

              onClick={(e) => {

                e.preventDefault();

                document

                  .querySelector("#projects")

                  ?.scrollIntoView({ behavior: "smooth" });

              }}

              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm transition-all duration-200 shadow-[0_0_24px_rgba(168,85,247,0.35)] hover:shadow-[0_0_32px_rgba(168,85,247,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"

            >

              View my work

              <ArrowRight size={16} />

            </Link>

            <Link

              href="#contact"

              onClick={(e) => {

                e.preventDefault();

                document

                  .querySelector("#contact")

                  ?.scrollIntoView({ behavior: "smooth" });

              }}

              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:border-white/20 text-white/70 hover:text-white font-medium text-sm transition-all duration-200 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"

            >

              <Mail size={16} />

              Get in touch

            </Link>

          </motion.div>

          {/* Stats */}

          <motion.div

            variants={fadeInUp}

            className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 w-full max-w-2xl"

          >

            {stats.map((stat, __atomicIdx) => (<div
              key={stat.label}
              className="flex flex-col items-center gap-1"
              data-atomic-id="a1bz83vg"
              data-atomic-instance={__atomicIdx}>
              <span
                className="font-display text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"
                data-atomic-id="a1w0g5m6"
                data-atomic-instance={__atomicIdx}>

                {stat.value}

              </span>
              <span
                className="text-xs text-white/40 text-center"
                data-atomic-id="a1xb1rqo"
                data-atomic-instance={__atomicIdx}>{stat.label}</span>
            </div>))}

          </motion.div>

        </motion.div>

        {/* Scroll indicator */}

        <motion.div

          initial={{ opacity: 0 }}

          animate={{ opacity: 1 }}

          transition={{ delay: 1.2, duration: 0.6 }}

          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"

        >

          <span
            className="text-[10px] text-white/20 tracking-widest uppercase"
            data-atomic-id="ayik79r">Scroll</span>

          <div
            className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
            data-atomic-id="a1xyohb6" />

        </motion.div>

      </section>
      {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <section id="projects" className="py-24 px-6" data-atomic-id="apjl0u5">

        <div className="max-w-6xl mx-auto" data-atomic-id="ap6wwr2">

          <motion.div

            variants={staggerContainer}

            initial="hidden"

            whileInView="visible"

            viewport={{ once: true, margin: "-80px" }}

            className="mb-14"

          >

            <motion.div variants={fadeInUp}>

              <SectionLabel>Work</SectionLabel>

            </motion.div>

            <motion.h2

              variants={fadeInUp}

              className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4"

            >

              Selected projects

            </motion.h2>

            <motion.p variants={fadeInUp} className="text-white/40 max-w-xl text-lg">

              A curated selection of products I&apos;ve designed, engineered, and shipped.

            </motion.p>

          </motion.div>

          <motion.div

            variants={staggerContainer}

            initial="hidden"

            whileInView="visible"

            viewport={{ once: true, margin: "-60px" }}

            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"

          >

            {projects.map((project) => (

              <ProjectCard key={project.id} project={project} />

            ))}

          </motion.div>

        </div>

      </section>
      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#0a0a0a]" data-atomic-id="a122k58o">

        <div className="max-w-6xl mx-auto" data-atomic-id="audx5rt">

          <motion.div

            variants={staggerContainer}

            initial="hidden"

            whileInView="visible"

            viewport={{ once: true, margin: "-80px" }}

            className="mb-14"

          >

            <motion.div variants={fadeInUp}>

              <SectionLabel>Services</SectionLabel>

            </motion.div>

            <motion.h2

              variants={fadeInUp}

              className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4"

            >

              What I do

            </motion.h2>

          </motion.div>

          <motion.div

            variants={staggerContainer}

            initial="hidden"

            whileInView="visible"

            viewport={{ once: true, margin: "-60px" }}

            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"

          >

            {services.map((service, __atomicIdx) => (<motion.div

              key={service.title}

              variants={fadeInUp}

              className="p-6 rounded-2xl border border-white/5 bg-[#1a1a1a] hover:border-purple-500/20 transition-all duration-300 group"

            >
              <div
                className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 group-hover:bg-purple-500/15 transition-colors duration-200"
                data-atomic-id="a14y0zv3"
                data-atomic-instance={__atomicIdx}>

                <service.icon size={18} className="text-purple-400" />

              </div>
              <h3
                className="font-display font-semibold text-white mb-2"
                data-atomic-id="a3e75e1"
                data-atomic-instance={__atomicIdx}
                style={__atomicIdx === 1 ? {
                  color: "#ef4444"
                } : undefined}>{service.title}</h3>
              <p
                className="text-sm text-white/40 leading-relaxed"
                data-atomic-id="au8jfs0"
                data-atomic-instance={__atomicIdx}>{service.description}</p>
            </motion.div>))}

          </motion.div>

        </div>

      </section>
      {/* ── SKILLS ───────────────────────────────────────────────────────── */}
      <section id="skills" className="py-24 px-6" data-atomic-id="apaitu4">

        <div className="max-w-6xl mx-auto" data-atomic-id="a17xoagt">

          <motion.div

            variants={staggerContainer}

            initial="hidden"

            whileInView="visible"

            viewport={{ once: true, margin: "-80px" }}

            className="mb-14"

          >

            <motion.div variants={fadeInUp}>

              <SectionLabel>Tech Stack</SectionLabel>

            </motion.div>

            <motion.h2

              variants={fadeInUp}

              className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4"

            >

              Skills &amp; tools

            </motion.h2>

            <motion.p variants={fadeInUp} className="text-white/40 max-w-xl text-lg">

              Technologies I reach for when building modern web products.

            </motion.p>

          </motion.div>

          <motion.div

            variants={staggerContainer}

            initial="hidden"

            whileInView="visible"

            viewport={{ once: true, margin: "-60px" }}

            className="flex flex-wrap gap-3"

          >

            {skills.map((skill, __atomicIdx) => (<motion.div

              key={skill.name}

              variants={scaleIn}

              className="group flex items-center gap-2 px-4 py-2 rounded-xl border border-white/5 bg-[#1a1a1a] hover:border-purple-500/20 hover:bg-purple-500/5 transition-all duration-200 cursor-default"

            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-purple-500/60 group-hover:bg-purple-400 transition-colors duration-200"
                data-atomic-id="a11y44de"
                data-atomic-instance={__atomicIdx} />
              <span
                className="text-sm text-white/60 group-hover:text-white/90 transition-colors duration-200 font-medium"
                data-atomic-id="a138pqhw"
                data-atomic-instance={__atomicIdx}>

                {skill.name}

              </span>
              <span
                className="text-[10px] text-white/20 group-hover:text-purple-400/60 transition-colors duration-200"
                data-atomic-id="a14jbcme"
                data-atomic-instance={__atomicIdx}>

                {skill.category}

              </span>
            </motion.div>))}

          </motion.div>

        </div>

      </section>
      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 px-6 bg-[#0a0a0a]" data-atomic-id="acihifk">

        <div className="max-w-6xl mx-auto" data-atomic-id="a1lhff5t">

          <motion.div

            variants={staggerContainer}

            initial="hidden"

            whileInView="visible"

            viewport={{ once: true, margin: "-80px" }}

            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"

          >

            <motion.div variants={slideInLeft} className="space-y-6">

              <SectionLabel>About</SectionLabel>

              <h2
                className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white"
                data-atomic-id="a1w739pf">

                Crafting digital experiences with purpose

              </h2>

              <div
                className="space-y-4 text-white/50 leading-relaxed"
                data-atomic-id="a1ckwzbi">

                <p data-atomic-id="ahq1nmm">

                  I&apos;m a full-stack developer with 5+ years of experience building

                  products that sit at the intersection of great design and solid

                  engineering. I care deeply about performance, accessibility, and

                  the tiny details that make an interface feel alive.

                </p>

                <p data-atomic-id="ahq1pb4">

                  When I&apos;m not shipping features, you&apos;ll find me contributing to

                  open source, writing about web performance, or experimenting with

                  generative art.

                </p>

              </div>

              <div className="flex flex-wrap gap-3 pt-2" data-atomic-id="a1cmbtg0">

                {[

                  "Open to freelance",

                  "Remote-friendly",

                  "UTC+0 to UTC+8",

                ].map((badge, __atomicIdx) => (<span
                  key={badge}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 text-white/50 text-xs font-medium"
                  data-atomic-id="a17kdhrh"
                  data-atomic-instance={__atomicIdx}>
                  <CheckCircle size={11} className="text-purple-400" />
                  {badge}
                </span>))}

              </div>

            </motion.div>

            <motion.div variants={slideInRight} className="grid grid-cols-2 gap-4">

              {stats.map((stat, __atomicIdx) => (<div
                key={stat.label}
                className="p-6 rounded-2xl border border-white/5 bg-[#1a1a1a] flex flex-col gap-1"
                data-atomic-id="a1lske2f"
                data-atomic-instance={__atomicIdx}>
                <span
                  className="font-display text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"
                  data-atomic-id="a600b61"
                  data-atomic-instance={__atomicIdx}>

                  {stat.value}

                </span>
                <span
                  className="text-sm text-white/40"
                  data-atomic-id="a7alxaj"
                  data-atomic-instance={__atomicIdx}>{stat.label}</span>
              </div>))}

            </motion.div>

          </motion.div>

        </div>

      </section>
      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6" data-atomic-id="awswpez">

        <div className="max-w-6xl mx-auto" data-atomic-id="a6vjfwc">

          <motion.div

            variants={staggerContainer}

            initial="hidden"

            whileInView="visible"

            viewport={{ once: true, margin: "-80px" }}

            className="mb-14"

          >

            <motion.div variants={fadeInUp}>

              <SectionLabel>Testimonials</SectionLabel>

            </motion.div>

            <motion.h2

              variants={fadeInUp}

              className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4"

            >

              What clients say

            </motion.h2>

          </motion.div>

          <motion.div

            variants={staggerContainer}

            initial="hidden"

            whileInView="visible"

            viewport={{ once: true, margin: "-60px" }}

            className="grid grid-cols-1 md:grid-cols-3 gap-6"

          >

            {testimonials.map((t, __atomicIdx) => (<motion.div

              key={t.id}

              variants={fadeInUp}

              className="p-6 rounded-2xl border border-white/5 bg-[#1a1a1a] flex flex-col gap-4"

            >
              <div
                className="flex gap-0.5"
                data-atomic-id="apad2k2"
                data-atomic-instance={__atomicIdx}>

                {Array.from({ length: 5 }).map((_, i) => (

                  <Star key={i} size={12} className="fill-purple-400 text-purple-400" />

                ))}

              </div>
              <p
                className="text-sm text-white/60 leading-relaxed flex-1"
                data-atomic-id="au3boxt"
                data-atomic-instance={__atomicIdx}>&ldquo;{t.body}&rdquo;</p>
              <div
                className="flex items-center gap-3 pt-2 border-t border-white/5"
                data-atomic-id="apd6qt2"
                data-atomic-instance={__atomicIdx}>

                <div
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white"
                  data-atomic-id="ax9hry1"
                  data-atomic-instance={__atomicIdx}>

                  {t.avatar}

                </div>

                <div data-atomic-id="axawm2j" data-atomic-instance={__atomicIdx}>

                  <p
                    className="text-sm font-medium text-white"
                    data-atomic-id="a6vl3sb"
                    data-atomic-instance={__atomicIdx}>{t.name}</p>

                  <p
                    className="text-xs text-white/30"
                    data-atomic-id="a6vl5gt"
                    data-atomic-instance={__atomicIdx}>{t.role}</p>

                </div>

              </div>
            </motion.div>))}

          </motion.div>

        </div>

      </section>
      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 px-6 bg-[#0a0a0a]" data-atomic-id="ak0ve0f">

        <div className="max-w-2xl mx-auto" data-atomic-id="akfaklc">

          <motion.div

            variants={staggerContainer}

            initial="hidden"

            whileInView="visible"

            viewport={{ once: true, margin: "-80px" }}

            className="text-center mb-12"

          >

            <motion.div variants={fadeInUp} className="flex justify-center">

              <SectionLabel>Contact</SectionLabel>

            </motion.div>

            <motion.h2

              variants={fadeInUp}

              className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4"

            >

              Let&apos;s work together

            </motion.h2>

            <motion.p variants={fadeInUp} className="text-white/40 text-lg">

              Have a project in mind? I&apos;d love to hear about it.

            </motion.p>

          </motion.div>

          <motion.form

            variants={fadeInUp}

            initial="hidden"

            whileInView="visible"

            viewport={{ once: true }}

            onSubmit={(e) => e.preventDefault()}

            className="space-y-4"

          >

            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              data-atomic-id="ah85iqw">

              <div className="flex flex-col gap-1.5" data-atomic-id="aexz3hn">

                <label
                  className="text-xs text-white/40 font-medium uppercase tracking-wider"
                  data-atomic-id="ahizq97">

                  Name

                </label>

                <input
                  type="text"
                  placeholder="Your name"
                  className="px-4 py-3 rounded-xl bg-[#1a1a1a] border border-white/5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/20 transition-all duration-200"
                  data-atomic-id="a1o6z3ul" />

              </div>

              <div className="flex flex-col gap-1.5" data-atomic-id="aezdxm5">

                <label
                  className="text-xs text-white/40 font-medium uppercase tracking-wider"
                  data-atomic-id="a7l4iy5">

                  Email

                </label>

                <input
                  type="email"
                  placeholder="your@email.com"
                  className="px-4 py-3 rounded-xl bg-[#1a1a1a] border border-white/5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/20 transition-all duration-200"
                  data-atomic-id="a1e93wjj" />

              </div>

            </div>

            <div className="flex flex-col gap-1.5" data-atomic-id="ah9kcve">

              <label
                className="text-xs text-white/40 font-medium uppercase tracking-wider"
                data-atomic-id="a1wwlney">

                Subject

              </label>

              <input
                type="text"
                placeholder="Project inquiry"
                className="px-4 py-3 rounded-xl bg-[#1a1a1a] border border-white/5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/20 transition-all duration-200"
                data-atomic-id="a14jgz18" />

            </div>

            <div className="flex flex-col gap-1.5" data-atomic-id="ahaz6zw">

              <label
                className="text-xs text-white/40 font-medium uppercase tracking-wider"
                data-atomic-id="a1myqg3w">

                Message

              </label>

              <textarea
                rows={5}
                placeholder="Tell me about your project..."
                className="px-4 py-3 rounded-xl bg-[#1a1a1a] border border-white/5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/20 transition-all duration-200 resize-none"
                data-atomic-id="ad7nxws" />

            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm transition-all duration-200 shadow-[0_0_24px_rgba(168,85,247,0.3)] hover:shadow-[0_0_32px_rgba(168,85,247,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
              data-atomic-id="a1yu96ef">

              Send message

            </button>

          </motion.form>

        </div>

      </section>
    </div>
  );

}
