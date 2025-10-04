import React, { useState, useEffect, useRef, Suspense } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import {
  FiCpu, FiZap, FiFeather, FiSliders, FiX, FiMenu, FiChevronDown, FiMail, FiDownload,
  FiGithub, FiLinkedin, FiTwitter, FiExternalLink, FiPhone
} from 'react-icons/fi'
import {
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiPython, SiReact, SiNextdotjs, SiNodedotjs,
  SiExpress, SiNestjs, SiTailwindcss, SiFramer, SiRedux, SiVite, SiWebpack, SiGraphql,
  SiPrisma, SiPostgresql, SiMongodb, SiRedis, SiDocker, SiGit, SiJest, SiVitest, SiPlaywright,
  SiVercel, SiAmazonaws, SiStorybook
} from 'react-icons/si'

/* ========================================================
   NAV STRUCTURE
======================================================== */
const nav = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'sertifikat', label: 'Certification' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
]

/* ========================================================
   UTILS & GENERIC UI
======================================================== */
const Section = ({ id, title, subtitle, children }) => (
  <section id={id} className="relative py-24 sm:py-28 md:py-32">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {title && (
        <div className="mb-10 md:mb-12">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: .6 }} className="text-3xl md:text-4xl font-black tracking-tight">
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: .15, duration: .6 }} className="mt-2 text-muted-foreground text-sm md:text-base text-gray-400">
              {subtitle}
            </motion.p>
          )}
        </div>
      )}
      {children}
    </div>
  </section>
)

function useActiveSection() {
  const [active, setActive] = useState('home')
  useEffect(() => {
    const handler = () => {
      const sections = nav.map(n => document.getElementById(n.id))
      const mid = window.scrollY + window.innerHeight / 2
      for (const s of sections) {
        if (!s) continue
        const rect = s.getBoundingClientRect();
        const top = rect.top + window.scrollY
        const bottom = top + rect.height
        if (mid >= top && mid < bottom) { setActive(s.id); break }
      }
    }
    handler();
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return active
}

const Badge = ({ children, className = '' }) => (
  <span className={`inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/90 ${className}`}>
    {children}
  </span>
)

const HoverCard = ({ children, className = '' }) => (
  <div className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur glow ${className}`} onMouseMove={(e)=>{
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--x', `${((e.clientX-rect.left)/rect.width)*100}%`)
    el.style.setProperty('--y', `${((e.clientY-rect.top)/rect.height)*100}%`)
  }}>
    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-active:opacity-100" style={{ background: 'radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(99,102,241,.2), transparent 40%)' }} />
    {children}
  </div>
)

const AnimatedGradient = ({ className = '' }) => (
  <div className={`absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(closest-side,black,transparent)] ${className}`}>
    <motion.div
      className="absolute -inset-1 blur-3xl"
      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
      transition={{ duration: 18, repeat: Infinity }}
      style={{ backgroundImage: 'linear-gradient(90deg, rgba(99,102,241,.7), rgba(236,72,153,.6), rgba(6,182,212,.7))', backgroundSize: '200% 200%' }}
    />
  </div>
)

const FloatingIcons = () => {
  const icons = [FiCpu, FiZap, FiFeather]
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {icons.map((Icon, i) => (
        <motion.div key={i} className="absolute text-cyan-300/30" initial={{ opacity: 0 }} animate={{ opacity: [0, .6, 0] }} transition={{ duration: 8 + i * 2, repeat: Infinity, delay: i }} style={{ top: `${15 + i * 25}%`, left: `${10 + i * 30}%` }}>
          <Icon size={40 + i * 12} />
        </motion.div>
      ))}
    </div>
  )
}

/* ========================================================
   EFFECTS TOGGLE PANEL (OFF by default)
======================================================== */
const EffectsPanel = ({ state, setState }) => {
  const [open, setOpen] = useState(false)
  const toggle = (k) => setState(s => ({ ...s, [k]: !s[k] }))

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <FiSliders/> Effects
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="mt-3 w-72 rounded-2xl border border-white/10 bg-black/70 p-4 backdrop-blur">
            <div className="text-sm text-white/80">Aktifkan efek sesuai kebutuhan. Default non-aktif.</div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              {[
                ['gradient', 'Gradient'],
                ['floating', 'Floating Icons'],
                ['cursor', 'Cursor Trail'],
                ['noise', 'Noise Overlay'],
              ].map(([key,label])=> (
                <button key={key} onClick={()=>toggle(key)} className={`rounded-xl border px-3 py-2 text-left ${state[key] ? 'border-cyan-400/40 bg-cyan-400/10 text-white' : 'border-white/10 bg-white/5 text-white/80 hover:text-white'}`}>
                  <div className="font-semibold">{label}</div>
                  <div className="text-[11px] opacity-70">{state[key] ? 'On' : 'Off'}</div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ========================================================
   NAVBAR
======================================================== */
const Navbar = () => {
  const active = useActiveSection()
  const [open, setOpen] = useState(false)
  useEffect(() => { const close = () => setOpen(false); window.addEventListener('resize', close); return () => window.removeEventListener('resize', close)}, [])
  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-lg">
          <div className="flex items-center justify-between px-4 py-3">
            <a href="#home" className="font-normal tracking-normal">
              <span className="text-white normal-case">TAOPIK SHOLEH</span>
            </a>
            <nav className="hidden md:flex items-center gap-1">
              {nav.map(i => (
                <a key={i.id} href={`#${i.id}`} className={`px-3 py-2 text-sm rounded-lg transition ${active===i.id?'text-white bg-white/10':'text-white/70 hover:text-white hover:bg-white/5'}`}>{i.label}</a>
              ))}
              <a href="#contact" className="ml-2 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:shadow-pink-500/20">
                Hire Me
              </a>
            </nav>
            <button className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10" onClick={()=>setOpen(v=>!v)} aria-label="Menu">
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>
          <AnimatePresence>
            {open && (
              <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden border-t border-white/10 px-2 pb-3">
                {nav.map(i => (
                  <a key={i.id} href={`#${i.id}`} onClick={()=>setOpen(false)} className={`block rounded-lg px-3 py-2 text-sm ${active===i.id?'text-white bg-white/10':'text-white/70 hover:text-white hover:bg-white/5'}`}>{i.label}</a>
                ))}
                <a href="#contact" onClick={()=>setOpen(false)} className="mt-2 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                  Hire Me
                </a>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}

/* ========================================================
   HERO
======================================================== */
const Hero = ({ effects }) => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, -80])

  return (
    <Section id="home">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-1">
        {effects.gradient && <AnimatedGradient />}
        {effects.floating && <FloatingIcons />}
        <div className="relative isolate rounded-3xl bg-black/40 p-8 md:p-14">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7 }}>
              <div className="flex items-center gap-2">
                <Badge>Full-Stack</Badge>
                <Badge>Web Developer</Badge>
                <Badge>Front-End</Badge>
              </div>
              <h1 className="mt-4 text-4xl md:text-6xl font-black leading-tight">
               Combining code logic with design aesthetics to create vibrant and interactive websites
              </h1>
              <p className="mt-4 text-white/70 max-w-prose">
                As a web developer with expertise in frontend and backend, I combine algorithmic logic with design aesthetics to create vibrant, responsive, and enjoyable websites.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#projects" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20 hover:shadow-pink-500/20">
                  View Projects <FiChevronDown />
                </a>
                <a href="#contact" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white/90 hover:bg-white/10">
                  Contact Me <FiMail />
                </a>
                <a href="/resume.pdf" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 font-semibold text-white/90 hover:bg-white/20">
                  Download CV <FiDownload />
                </a>
              </div>
              <div className="mt-6 flex gap-4 text-white/70">
                <a href="#" aria-label="GitHub" className="hover:text-white"><FiGithub size={22}/></a>
                <a href="#" aria-label="LinkedIn" className="hover:text-white"><FiLinkedin size={22}/></a>
                <a href="#" aria-label="Twitter" className="hover:text-white"><FiTwitter size={22}/></a>
              </div>
            </motion.div>
            <motion.div style={{ y }} className="relative">
              <div className="absolute -inset-8 -z-10 bg-gradient-to-tr from-indigo-500/30 via-pink-500/30 to-cyan-500/30 blur-3xl rounded-full" />
              <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable glareMaxOpacity={0.3} className="mx-auto max-w-md">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_70%_-10%,rgba(236,72,153,.12),transparent_40%)]"/>
                  <img alt="Anime Character" src="https://i.pinimg.com/originals/e7/b7/b0/e7b7b0dc2249f7c7335a6792401b4452.webp" className="aspect-[4/5] w-full rounded-2xl object-cover"/>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-white/80">TAOPIK SHOLEH • Engineer</span>
                    <Badge>Available for work</Badge>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ========================================================
   ABOUT, SKILLS, EXPERIENCE, TESTIMONIALS
======================================================== */
const About = () => (
  <Section id="about" title="About" subtitle="Full-Stack Web Developer · dari prototipe UI hingga API yang scalable dan deployment otomatis.">
    <div className="grid md:grid-cols-2 gap-8">
      <div className="md:order-2">
        <p className="text-white/90">
          Saya adalah <strong className="font-extrabold">Full-Stack Web Developer</strong> yang membangun produk web end-to-end: dari prototipe UI hingga API yang scalable dan deployment otomatis. Pendekatan saya praktis—memahami tujuan bisnis → desain & prototipe → kontrak API → implementasi modular → testing → CI/CD & monitoring—supaya bukan sekadar fitur jadi, tapi berdampak nyata pada metrik bisnis. Saya terbiasa mengoptimasi waktu muat, menurunkan biaya operasional, dan menyiapkan produk yang mudah dipelihara oleh tim lain.
        </p>

        <div className="mt-6">
          <h3 className="text-lg font-semibold">Pencapaian terpilih:</h3>
          <ul className="mt-2 list-disc pl-5 space-y-2 text-white/80">
            <li>Meningkatkan conversion rate landing page <strong>+34%</strong> lewat A/B test dan optimasi UI.</li>
            <li>Mempercepat loading page dari <strong>4s → 1.2s</strong> (Lighthouse 90+) sehingga bounce rate turun signifikan.</li>
            <li>Mengotomatiskan pipeline release (Docker + CI) yang memangkas waktu rilis <strong>3 hari → 30 menit</strong> dan mengurangi rollback.</li>
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold">Tech stack utama</h3>
          <p className="mt-2 text-white/80">HTML5, CSS3 (Tailwind/SCSS), JavaScript / TypeScript, React (Next.js) / Vue (Nuxt), Node.js (Express / NestJS) / FastAPI, PostgreSQL / MongoDB, Redis, Docker, GitHub Actions.</p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold">Deliverables yang saya berikan</h3>
          <p className="mt-2 text-white/80">repo lengkap + README, dokumentasi API (OpenAPI), Dockerfile/docker-compose, skrip CI/CD, dan short runbook deployment.</p>
        </div>

        <div className="mt-6 text-white/90">
          <p><strong>CTA (1 baris):</strong> Lihat proyek saya atau hubungi saya untuk diskusi fitur — saya suka tantangan yang jelas targetnya (konversi / performa / reliability).</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <a href="#projects" className="inline-flex items-center rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">Lihat Proyek</a>
            <a href="#contact" className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/10">Hubungi Saya</a>
          </div>
        </div>
      </div>

      <div className="md:order-1">
        <div className="glow overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4">
          <img src="https://i.pinimg.com/736x/96/86/f6/9686f6d2c32e3bee3c592c59ffb251da.jpg" alt="Profile" className="aspect-square w-full rounded-xl object-cover" />
        </div>
      </div>
    </div>
  </Section>
)

const Skills = () => {
  const items = [
    { icon: SiHtml5, label: 'HTML5' },
    { icon: SiCss3, label: 'CSS3' },
    { icon: SiJavascript, label: 'JavaScript' },
    { icon: SiTypescript, label: 'TypeScript' },
    { icon: SiPython, label: 'Python' },
    { icon: SiReact, label: 'React' },
    { icon: SiNextdotjs, label: 'Next.js' },
    { icon: SiNodedotjs, label: 'Node.js' },
    { icon: SiExpress, label: 'Express' },
    { icon: SiNestjs, label: 'NestJS' },
    { icon: SiTailwindcss, label: 'Tailwind CSS' },
    { icon: SiFramer, label: 'Framer Motion' },
    { icon: SiRedux, label: 'Redux' },
    { icon: SiVite, label: 'Vite' },
    { icon: SiWebpack, label: 'Webpack' },
    { icon: SiGraphql, label: 'GraphQL' },
    { icon: SiPrisma, label: 'Prisma' },
    { icon: SiPostgresql, label: 'PostgreSQL' },
    { icon: SiMongodb, label: 'MongoDB' },
    { icon: SiRedis, label: 'Redis' },
    { icon: SiDocker, label: 'Docker' },
    { icon: SiGit, label: 'Git' },
    { icon: SiJest, label: 'Jest' },
    { icon: SiVitest, label: 'Vitest' },
    { icon: SiPlaywright, label: 'Playwright' },
    { icon: SiVercel, label: 'Vercel' },
    { icon: SiAmazonaws, label: 'AWS' },
    { icon: SiStorybook, label: 'Storybook' },
  ]
  return (
    <Section id="skills" title="Skills" subtitle="Frontend, Backend, dan Web Dev — stack yang saya gunakan di pekerjaan.">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {items.map((it, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
            <button className="w-full rounded-2xl border border-white/10 bg-transparent p-4 text-center transition hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                {React.createElement(it.icon, { size: 24, className: 'text-white' })}
              </div>
              <div className="mt-2 text-sm font-medium text-white/90">{it.label}</div>
            </button>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

const Certificates = () => (
  <Section id="sertifikat" title="Sertifikat" subtitle="Sertifikasi yang telah saya selesaikan.">
    <div className="grid sm:grid-cols-2 gap-6 md:gap-8 items-stretch">
      {[
        {
          href: 'https://freecodecamp.org/certification/fcc-b28490ef-8731-42d8-8af7-f572ac5d9c2b/javascript-algorithms-and-data-structures-v8',
          src: '/certs/sertifikat%201.jpg',
          alt: 'freeCodeCamp - JavaScript Algorithms and Data Structures',
          title: 'JavaScript Algorithms and Data Structures'
        },
        {
          href: 'https://freecodecamp.org/certification/fcc-b28490ef-8731-42d8-8af7-f572ac5d9c2b/responsive-web-design',
          src: '/certs/sertifikat%202.jpg',
          alt: 'freeCodeCamp - Responsive Web Design',
          title: 'Responsive Web Design'
        },
      ].map((c, i) => (
        <motion.a key={i} href={c.href} target="_blank" rel="noreferrer" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group block h-full">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5 transition hover:bg-white/[0.06] h-full flex flex-col">
            <div className="relative overflow-hidden rounded-xl bg-black/20 aspect-[16/11] flex items-center justify-center">
              <img src={c.src} alt={c.alt} className="max-h-full max-w-full object-contain" />
            </div>
            <div className="mt-3 text-center text-sm font-medium text-white/90">{c.title}</div>
            <div className="text-center text-xs text-white/60">freeCodeCamp</div>
          </div>
        </motion.a>
      ))}
    </div>
  </Section>
)

const Testimonials = () => (
  <Section id="testimonials" title="Testimonials" subtitle="What collaborators say about my work.">
    <div className="grid md:grid-cols-3 gap-6">
      {[{
        name:'Akira', role:'Design Lead @ TechNova', quote:'Effortless collaboration and a strong sense for product details. Animations are top-notch.'
      },{
        name:'Mina', role:'PM @ CloudHub', quote:'Communicates clearly, estimates accurately, and delivers beyond expectations.'
      },{
        name:'Kenji', role:'Founder @ Studio Pixel', quote:'Combines aesthetics and engineering — rare and valuable.'
      }].map((t,i)=> (
        <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i*.1 }}>
          <HoverCard>
            <p className="text-white/80">“{t.quote}”</p>
            <div className="mt-4 text-sm text-white/70">{t.name} · {t.role}</div>
          </HoverCard>
        </motion.div>
      ))}
    </div>
  </Section>
)

/* ========================================================
   PROJECTS with REAL DEMOS 
======================================================== */
const projectsData = [
  {
    title: 'Mini Calculator Modern',
    description: 'Membuat Mini Calculator Menggunakan HTML, CSS, dan Javascript.`',
    image: 'https://i.ytimg.com/vi/HQCLzqhiT2w/maxresdefault.jpg',
    tech: ['HTML', 'CSS', 'JavaScript'],
    demoKey: 'calculator'
  },
  {
    title: 'Modern Todo App',
    description: 'Aplikasi Todo List dengan fitur dark mode, filter, dan local storage untuk menyimpan task.',
    image: 'https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1200&auto=format&fit=crop',
    tech: ['React', 'TailwindCSS', 'LocalStorage'],
    demoKey: 'todoapp'
  },
  {
    title: 'Anime Explorer',
    description: 'Mencari judul anime dengan API Jikan (v4) dan melihat detail ringkas.',
    image: 'https://images.wallpapersden.com/image/download/akaza-x-kyojuro-rengoku-demon-slayer-hd-art_bWhtZ2aUmZqaraWkpJRnamtlrWZsZWU.jpg',
    tech: ['React', 'Fetch', 'Jikan API'],
    demoKey: 'anime',
  },
  {
    title: 'Particles Lab',
    description: 'Laboratorium partikel canvas dengan kontrol interaktif. Render mulai saat Anda klik.',
    image: 'https://cdn.labmanager.com/assets/articleNo/29978/aImg/53849/for-the-first-time-controlling-the-degree-of-twist-in-nanostructured-particles-m.jpg',
    tech: ['Canvas', 'React'],
    demoKey: 'particles',
  },
]

const Projects = ({ onOpenDemo }) => (
  <Section id="projects" title="Projects" subtitle="Demos yang nyata, dimuat on-demand saat Anda klik.">
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {projectsData.map((p,i)=> (
        <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i*.1 }}>
          <Tilt glareEnable glareMaxOpacity={0.35} tiltMaxAngleX={8} tiltMaxAngleY={8} className="h-full">
            <div className="block h-full">
              <HoverCard className="h-full">
                <div className="relative overflow-hidden rounded-xl">
                  <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: .6 }} src={p.image} alt={p.title} className="h-52 w-full rounded-xl object-cover" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
                <p className="mt-1 text-white/70 text-sm">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tech.map((t,j)=> <Badge key={j} className="bg-white/10">{t}</Badge>)}
                </div>
                <div className="mt-4 flex gap-3">
                  <button onClick={()=>onOpenDemo(p)} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                    Play Demo
                  </button>
                  <a href="#" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/10">
                    Read Case <FiExternalLink />
                  </a>
                </div>
              </HoverCard>
            </div>
          </Tilt>
        </motion.div>
      ))}
    </div>
  </Section>
)

/* ========================================================
   CONTACT & FOOTER
======================================================== */
const Contact = () => (
  <Section id="contact" title="Contact" subtitle="Let’s build something outstanding together.">
    <div className="grid md:grid-cols-2 gap-6">
      <HoverCard>
        <h3 className="text-lg font-semibold">Start a project</h3>
        <p className="mt-2 text-white/70">Tell me about your idea, timeline, and budget. I’ll get back within 24 hours.</p>
        <form action="https://formspree.io/f/mayzqqpk" method="POST" className="mt-4 grid grid-cols-1 gap-3">
          <input required name="name" placeholder="Your name" className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-white/40 focus:border-cyan-400"/>
          <input required type="email" name="email" placeholder="Email" className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-white/40 focus:border-cyan-400"/>
          <textarea required name="message" placeholder="Project details" rows="4" className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-white/40 focus:border-cyan-400" />
          <button className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 px-5 py-3 font-semibold text-white shadow-lg">
            Send Message <FiMail/>
          </button>
        </form>
      </HoverCard>
      <div className="space-y-6">
        <HoverCard>
          <div className="flex items-center gap-3"><FiMail/> <div>
            <div className="font-semibold">Email</div>
            <a href="mailto:herlisherdiyanti4@gmail.com" className="text-white/70 hover:text-white">herlisherdiyanti4@gmail.com</a>
          </div></div>
        </HoverCard>
        <HoverCard>
          <div className="flex items-center gap-3"><FiPhone/> <div>
            <div className="font-semibold">Phone</div>
            <a href="tel:+6283162178912" className="text-white/70 hover:text-white">083162178912</a>
          </div></div>
        </HoverCard>
      </div>
    </div>
  </Section>
)

const Footer = ({ effects }) => (
  <footer className="relative mt-20 border-t border-white/10">
    {effects.gradient && <AnimatedGradient/>}
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-sm text-white/60">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>© {new Date().getFullYear()} TAOPIK SHOLEH. Crafted with React, Tailwind, and Motion.</div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-white"><FiGithub/></a>
          <a href="#" className="hover:text-white"><FiLinkedin/></a>
          <a href="#" className="hover:text-white"><FiTwitter/></a>
        </div>
      </div>
    </div>
  </footer>
)

/* ========================================================
   CURSOR TRAIL (mounted only when enabled)
======================================================== */
const Cursor = () => {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let x = window.innerWidth / 2, y = window.innerHeight / 2
    let rx = x, ry = y

    const move = (e) => { x = e.clientX; y = e.clientY; dot.style.transform = `translate(${x}px, ${y}px)` }
    const tick = () => { rx += (x - rx) * 0.12; ry += (y - ry) * 0.12; ring.style.transform = `translate(${rx}px, ${ry}px)`; requestAnimationFrame(tick) }
    window.addEventListener('pointermove', move)
    requestAnimationFrame(tick)
    return () => window.removeEventListener('pointermove', move)
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}

/* ========================================================
   MODAL + REAL DEMOS
======================================================== */
const Modal = ({ open, onClose, title, children }) => (
  <AnimatePresence>
    {open && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/70" onClick={onClose} />
        <motion.div initial={{ y: 24, scale: .98, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 24, scale: .98, opacity: 0 }} className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-black/80 p-4 backdrop-blur">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 p-3">
            <div className="text-lg font-semibold">{title}</div>
            <button onClick={onClose} className="rounded-lg bg-white/10 px-3 py-1.5 hover:bg-white/20">Close</button>
          </div>
          <div className="p-3">
            {children}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
)

// Demo 1: Todo App with localStorage
const DemoTodo = () => {
  const [items, setItems] = useState(()=>{
    try { return JSON.parse(localStorage.getItem('demo.todo')||'[]') } catch { return [] }
  })
  const [text, setText] = useState('')

  useEffect(()=>{ localStorage.setItem('demo.todo', JSON.stringify(items)) }, [items])

  const add = (e) => { e.preventDefault(); if(!text.trim()) return; setItems(prev=>[...prev, { id: crypto.randomUUID(), text: text.trim(), done:false }]); setText('') }
  const toggle = (id) => setItems(prev=> prev.map(i=> i.id===id? {...i, done:!i.done}: i))
  const del = (id) => setItems(prev=> prev.filter(i=> i.id!==id))
  const clearDone = () => setItems(prev => prev.filter(i=>!i.done))

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <form onSubmit={add} className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="font-semibold">Add Task</div>
        <div className="mt-3 flex gap-2">
          <input value={text} onChange={e=>setText(e.target.value)} placeholder="Type a task..." className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none placeholder:text-white/40 focus:border-cyan-400" />
          <button className="rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 px-4 py-2 font-semibold">Add</button>
        </div>
        <button type="button" onClick={clearDone} className="mt-3 text-xs text-white/70 hover:text-white">Clear completed</button>
      </form>
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="font-semibold">Tasks</div>
        <ul className="mt-3 space-y-2">
          {items.map(i=> (
            <li key={i.id} className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={i.done} onChange={()=>toggle(i.id)} />
                <span className={i.done? 'line-through text-white/50': ''}>{i.text}</span>
              </label>
              <button onClick={()=>del(i.id)} className="text-white/70 hover:text-white">Delete</button>
            </li>
          ))}
          {items.length===0 && <div className="text-white/60">No tasks yet.</div>}
        </ul>
      </div>
    </div>
  )
}

// Demo 2: Anime Explorer using Jikan API
const DemoAnimeExplorer = () => {
  const [q, setQ] = useState('one piece')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [error, setError] = useState(null)
  const [active, setActive] = useState(null)

  const search = async (e) => {
    e?.preventDefault()
    setLoading(true); setError(null)
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(q)}&limit=12`)
      const data = await res.json()
      setResults(data?.data || [])
    } catch (err) {
      setError('Gagal memuat data. Coba lagi.')
    } finally { setLoading(false) }
  }

  useEffect(()=>{ search() }, [])

  return (
    <div>
      <form onSubmit={search} className="flex gap-2">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari anime..." className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none placeholder:text-white/40 focus:border-cyan-400" />
        <button className="rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 px-4 py-2 font-semibold">Search</button>
      </form>
      {error && <div className="mt-3 text-red-400">{error}</div>}
      <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {loading ? Array.from({length:6}).map((_,i)=>(
          <div key={i} className="h-40 rounded-xl bg-white/5 animate-pulse"/>
        )) : results.map(anime => (
          <button key={anime.mal_id} onClick={()=>setActive(anime)} className="text-left">
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <img src={anime.images.jpg.image_url} alt={anime.title} className="h-40 w-full object-cover" />
              <div className="p-2 text-sm font-semibold line-clamp-2">{anime.title}</div>
            </div>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {active && (
          <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:10}} className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-start gap-3">
              <img src={active.images.jpg.image_url} alt={active.title} className="w-28 h-36 object-cover rounded-lg"/>
              <div>
                <div className="text-lg font-semibold">{active.title}</div>
                <div className="text-sm text-white/70">Episodes: {active.episodes ?? 'N/A'} · Score: {active.score ?? 'N/A'}</div>
                <p className="mt-2 text-white/80 line-clamp-5">{active.synopsis || 'No synopsis.'}</p>
                {active.url && <a target="_blank" rel="noreferrer" href={active.url} className="mt-3 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-sm hover:bg-white/10">Open on MyAnimeList <FiExternalLink/></a>}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Demo 3: Particles Lab (starts rendering when Start diklik)
const DemoParticles = () => {
  const canvasRef = useRef(null)
  const [running, setRunning] = useState(false)
  const [count, setCount] = useState(150)

  useEffect(()=>{
    if(!running) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let w, h, rafId
    const dpr = Math.min(2, window.devicePixelRatio || 1)

    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.scale(dpr, dpr)
    }
    resize()

    const rand = (a,b)=> Math.random()*(b-a)+a
    const parts = Array.from({length: count}).map(()=>({
      x: rand(0,w), y: rand(0,h), vx: rand(-1,1), vy: rand(-1,1), r: rand(.5,2.2)
    }))

    const tick = ()=>{
      ctx.clearRect(0,0,w,h)
      ctx.fillStyle = 'rgba(6,182,212,0.9)'
      for(const p of parts){
        p.x += p.vx; p.y += p.vy
        if(p.x<0||p.x>w) p.vx*=-1
        if(p.y<0||p.y>h) p.vy*=-1
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill()
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    const obs = new ResizeObserver(resize); obs.observe(canvas)
    return ()=>{ cancelAnimationFrame(rafId); obs.disconnect() }
  }, [running, count])

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <button onClick={()=>setRunning(r=>!r)} className={`rounded-xl px-4 py-2 font-semibold ${running? 'bg-red-500/70 hover:bg-red-500' : 'bg-gradient-to-r from-indigo-500 to-pink-500'}`}>{running? 'Stop' : 'Start'}</button>
        <label className="text-sm text-white/80">Particles: {count}</label>
        <input type="range" min="50" max="500" value={count} onChange={e=>setCount(+e.target.value)} />
      </div>
      <div className="h-72 w-full overflow-hidden rounded-xl border border-white/10 bg-white/5">
        <canvas ref={canvasRef} className="h-full w-full"/>
      </div>
      <div className="mt-2 text-xs text-white/60">Rendering hanya berjalan ketika Start diklik.</div>
    </div>
  )
}

import DemoCalculator from './components/DemoCalculator'
import DemoTodoApp from './components/DemoTodoApp'

/* ========================================================
   APP ROOT
======================================================== */
export default function App() {
  const [effects, setEffects] = useState(()=>{
    // default semua OFF; restore dari localStorage jika ada
    try { return JSON.parse(localStorage.getItem('effects')||'{}') } catch { return {} }
  })
  useEffect(()=>{ localStorage.setItem('effects', JSON.stringify(effects)) }, [effects])

  const [activeProject, setActiveProject] = useState(null)

  const rootClass = `${effects.noise ? 'noise ' : ''}soft-bg min-h-screen`

  const renderDemo = (demoKey) => {
    switch(demoKey){
      case 'todo': return <DemoTodo/>
      case 'anime': return <DemoAnimeExplorer/>
      case 'particles': return <DemoParticles/>
      case 'calculator': return <DemoCalculator/>
      case 'todoapp': return <DemoTodoApp/>
      default: return <div>Demo not found.</div>
    }
  }

  return (
    <div className={rootClass}>
      <Navbar/>
      <main className="pt-28">
        <Hero effects={effects}/>
        <About/>
        <Skills/>
        <Projects onOpenDemo={(p)=>setActiveProject(p)}/>
        <Certificates/>
        <Testimonials/>
        <Contact/>
      </main>
      <Footer effects={effects}/>

      {effects.cursor && <Cursor/>}

      <Modal open={!!activeProject} onClose={()=>setActiveProject(null)} title={activeProject?.title}>
        {activeProject && (
          <Suspense fallback={<div className="p-4">Loading demo...</div>}>
            {renderDemo(activeProject.demoKey)}
          </Suspense>
        )}
      </Modal>
    </div>
  )
}
