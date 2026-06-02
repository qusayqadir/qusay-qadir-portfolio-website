import { useState, useEffect, useRef } from 'react'
import resumePdf from "@/assets/Qusay_Qadir_Backend_Data_SWE_Intern.pdf"

const NAV_SECTIONS = ['about', 'experience', 'projects', 'resume', 'contact']

const SKILLS = [
  'Python', 'Go', 'TypeScript', 'React', 'FastAPI', 'PostgreSQL', 'Docker',
  'Google Cloud', 'AWS', 'TensorFlow', 'Apache Spark', 'Kafka', 'Airflow',
  'Redis', 'MongoDB', 'OpenShift', 'Git', 'Linux', 'Temporal', 'Pandas',
  'NumPy', 'JWT',
]

interface ExpItem {
  id: string; company: string; role: string
  period: string; location: string; description: string; tech: string
}

const EXPERIENCE: ExpItem[] = [
  {
    id: 'rbc', company: 'RBC Borealis',
    role: 'Site Reliability Engineering Intern (Agentic Observability)',
    period: 'Jan 2026 – Present', location: 'Toronto, CAN',
    description: 'Building on-premise cloud infrastructure (Lumina Data Platform). Designed and developed an API router connecting multiple microservice endpoints with JWT authentication, achieving sub-1ms Auth Check response times and eliminating a latency bottleneck.',
    tech: 'Python · Go · FastAPI · Temporal · RedHat OpenShift · DBeaver · Postman',
  },
  {
    id: 'homewise', company: 'Homewise.AI (ex-google, meta)',
    role: 'Software Engineering, Backend',
    period: 'Jun 2025 – Jan 2026', location: 'San Francisco, US',
    description: 'Launched a conversational agentic home-search tool powering end-to-end property discovery using Gemini Flash. Designed agentic workflows with custom SequentialAgent and ParallelAgent pipelines via Google ADK, integrating MCP servers and Vertex RAG Engine. Built and ran Eval Sets to benchmark LLM response quality.',
    tech: 'Python · Google ADK · GCP · Vertex RAG Engine · PostgreSQL · Docker',
  },
  {
    id: 'exo', company: 'McMaster Exoskeleton',
    role: 'Software Engineering, ML & AI',
    period: 'Nov 2024 – Dec 2025', location: 'Hamilton, CAN',
    description: 'Competed at ACE 2025 (University of Michigan). Built a Python LSTM deep neural network classifying movement types from IMU sensors, productionized via FastAPI. Engineered an ETL data pipeline to process 10+ hours of raw sensor data through AWS S3.',
    tech: 'Python · TensorFlow · Pandas · NumPy · Apache Spark · AWS',
  },
  {
    id: 'scotiabank', company: 'Scotiabank',
    role: 'Software Engineering, Data',
    period: 'Apr 2024 – Sep 2024', location: 'Toronto, CAN',
    description: 'Part of the Velocity program. Shipped an ELT data pipeline migrating 4TB+ of legacy IBM DB2 data to GCP BigQuery. Optimized SQL queries through unclustered-indexing and broke large tables into dependency-maintained sub-tables.',
    tech: 'Python · Kafka · Google Cloud Platform · Airflow',
  },
  {
    id: 'research', company: 'McMaster University',
    role: 'Research Engineering, Super Image Resolution',
    period: '1 month · 2024', location: 'Hamilton, CAN',
    description: 'Research engineering position focused on super image resolution. Applied deep learning techniques to upscale and enhance low-resolution images using convolutional neural network architectures on real-world datasets.',
    tech: 'Python · PyTorch · Computer Vision · NumPy',
  },
]

interface ProjItem {
  id: string; title: string; year: string; status: string
  description: string; tech: string; github: string; link: string | null
}

const PROJECTS: ProjItem[] = [
  {
    id: 'f1', title: 'Formula-1 Bloomberg Terminal', year: '2025', status: 'WIP',
    description: 'A centralized data platform for F1 enthusiasts — data dense and LLM enabled to provide critical insights, dashboard features, and custom analytics graphs.',
    tech: 'Python · PostgreSQL · MongoDB',
    github: 'https://github.com/qusayqadir', link: null,
  },
  {
    id: 'http', title: 'Custom HTTP Framework', year: '2025', status: 'WIP',
    description: 'Building an HTTP framework from scratch on top of a raw TCP server — no frameworks, no abstractions. Understanding the full request/response lifecycle at the protocol level.',
    tech: 'Go · TCP · HTTP',
    github: 'https://github.com/qusayqadir', link: null,
  },
  {
    id: 'drone', title: 'Autonomous Rescue Drone', year: '2023', status: 'Done',
    description: 'Autonomous drone navigation system — implements an exploration command center that scouts an island map, locates points of interest, and returns mission data for a rescue simulation.',
    tech: 'Java',
    github: 'https://github.com/qusayqadir', link: null,
  },
  {
    id: 'portfolio', title: 'Portfolio Website', year: '2025', status: 'Live',
    description: 'Personal portfolio — minimal, fast, and handcrafted with React 19, TypeScript, and Tailwind CSS v4.',
    tech: 'TypeScript · React · Vite · Tailwind',
    github: 'https://github.com/qusayqadir', link: null,
  },
]

// Three hand-drawn annotations that fan out of the photo on hover.
// `angle` = where the arrow leaves the photo (deg, 0 = right, +down, -up).
// `dy`    = the tooltip's vertical offset from the photo centre.
const ANNOTATIONS = [
  {
    num: '01', color: '#e8483f', subtitle: 'the tie obsession',
    angle: 8, dy: -40,
    lines: [
      "Favourite tie — E. Marinella, Archivio 1942",
      "Favourite song — The Universal, Blur",
    ],
  },
  {
    num: '02', color: '#2563eb', subtitle: 'europe trip',
    angle: -48, dy: -180,
    lines: [
      "London → Geneva → Interlaken → Munich",
      "→ Prague → Berlin → Dublin",
    ],
  },
  {
    num: '03', color: '#16a34a', subtitle: 'off the clock',
    angle: 48, dy: 90,
    lines: [
      "Latte art on a Breville Barista Express",
      "Racquet sports & Scorsese films",
    ],
  },
] as const

type Arrow = {
  path: string
  tx: number; ty: number
  color: string
  num: string; subtitle: string; lines: readonly string[]
}

// One continuous cubic-bézier annotation line from (sx,sy) on the photo edge
// to (ex,ey) at the label: short leave-stroke → one open loop → wavy run.
// All control points explicit & relative, so each is easy to fine-tune.
function buildArrow(sx: number, sy: number, ex: number, ey: number): string {
  const k   = 0.5523        // kappa — round loop
  const r   = 18            // loop radius
  const lx  = sx + 56       // x where the loop sits on the baseline
  const ly  = sy            // baseline height where the loop begins
  const kr  = k * r
  const ox  = 16            // horizontal gap between loop start & end (open loop)
  const oy  = 6             // vertical gap — keeps it from closing exactly
  const bx  = lx + ox       // loop exit / where the wavy run begins
  const by  = ly + oy
  const rx  = ex - bx       // horizontal length of the wavy run
  const ry  = ey - by       // vertical drop across the wavy run
  const amp = 8             // wave amplitude — shallow & consistent

  return `M ${sx} ${sy}
    C ${sx + 18} ${sy} ${lx - 18} ${ly} ${lx} ${ly}
    C ${lx + kr} ${ly} ${lx + r} ${ly - r + kr} ${lx + r} ${ly - r}
    C ${lx + r} ${ly - r - kr} ${lx + kr} ${ly - 2 * r} ${lx} ${ly - 2 * r}
    C ${lx - kr} ${ly - 2 * r} ${lx - r} ${ly - r - kr} ${lx - r} ${ly - r}
    C ${lx - r} ${ly - r + kr} ${lx - kr + ox} ${by} ${bx} ${by}
    C ${bx + rx * 0.12} ${by + ry * 0.12 - amp} ${bx + rx * 0.24} ${by + ry * 0.24 - amp} ${bx + rx * 0.34} ${by + ry * 0.34}
    C ${bx + rx * 0.44} ${by + ry * 0.44 + amp} ${bx + rx * 0.56} ${by + ry * 0.56 + amp} ${bx + rx * 0.66} ${by + ry * 0.66}
    C ${bx + rx * 0.77} ${by + ry * 0.77 - amp} ${bx + rx * 0.90} ${by + ry * 0.90 - amp} ${ex} ${ey}`
}

export default function Home() {
  const [active,     setActive]     = useState('about')
  const [expPanel,   setExpPanel]   = useState<string>(EXPERIENCE[0].id)
  const [projPanel,  setProjPanel]  = useState<string>(PROJECTS[0].id)
  const [arrows,     setArrows]     = useState<Arrow[] | null>(null)

  const sparkleRef       = useRef<HTMLDivElement>(null)
  const expWrapRef       = useRef<HTMLDivElement>(null)
  const projWrapRef      = useRef<HTMLDivElement>(null)
  const suitRef          = useRef<HTMLDivElement>(null)
  const aboutExpandedRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observers = NAV_SECTIONS.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-40% 0px -40% 0px' },
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const ew = expWrapRef.current
      if (ew) {
        const { top, height } = ew.getBoundingClientRect()
        const range = height - window.innerHeight
        if (top <= 0 && -top <= range) {
          const idx = Math.min(Math.floor((-top / range) * EXPERIENCE.length), EXPERIENCE.length - 1)
          setExpPanel(EXPERIENCE[idx].id)
        }
      }
      const pw = projWrapRef.current
      if (pw) {
        const { top, height } = pw.getBoundingClientRect()
        const range = height - window.innerHeight
        if (top <= 0 && -top <= range) {
          const idx = Math.min(Math.floor((-top / range) * PROJECTS.length), PROJECTS.length - 1)
          setProjPanel(PROJECTS[idx].id)
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const container = sparkleRef.current
    if (!container) return
    const onClick = (e: MouseEvent) => {
      for (let i = 0; i < 5; i++) {
        const el = document.createElement('div')
        el.className = 'block'
        el.style.left = `${e.clientX + (Math.random() - 0.5) * 24}px`
        el.style.top  = `${e.clientY + (Math.random() - 0.5) * 24}px`
        el.style.backgroundColor = Math.random() > 0.5 ? '#000' : '#24adbc'
        container.appendChild(el)
        setTimeout(() => el.remove(), 600)
      }
    }
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        window.scrollBy({ top: -window.innerHeight * 0.8, behavior: 'smooth' })
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  // Build the three hand-drawn annotation arrows fanning out of the photo.
  const enterPhoto = () => {
    const ref = suitRef.current
    const container = aboutExpandedRef.current
    if (!ref || !container) return

    const photoRect = ref.getBoundingClientRect()
    const contRect  = container.getBoundingClientRect()

    // Photo geometry, relative to the expanded-about container.
    const cx  = photoRect.left - contRect.left + photoRect.width / 2
    const cy  = photoRect.top  - contRect.top  + photoRect.height / 2
    const rad = photoRect.width / 2

    // All tooltips share a right-hand column; each gets its own height.
    const TOOLTIP_W = 200
    const tx = contRect.width - TOOLTIP_W - 40

    const built: Arrow[] = ANNOTATIONS.map(a => {
      const ang = (a.angle * Math.PI) / 180
      const sx  = cx + rad * Math.cos(ang)   // start: on the photo's edge
      const sy  = cy + rad * Math.sin(ang)
      const ty  = Math.max(10, Math.min(contRect.height - 90, cy + a.dy))
      const ex  = tx - 12                    // end: just left of the label
      const ey  = ty + 9
      return {
        path: buildArrow(sx, sy, ex, ey),
        tx, ty, color: a.color,
        num: a.num, subtitle: a.subtitle, lines: a.lines,
      }
    })

    setArrows(built)
  }

  const leavePhoto = () => setArrows(null)

  const activeExp  = EXPERIENCE.find(e => e.id === expPanel)!
  const activeProj = PROJECTS.find(p => p.id === projPanel)!

  return (
    <>
      <nav>
        {NAV_SECTIONS.map(s => (
          <span key={s} className={active === s ? 'nav-active' : ''} onClick={() => scrollTo(s)}>
            {s}
          </span>
        ))}
      </nav>

      <div className="sparkle" ref={sparkleRef} />

      {/* ── NAME ────────────────────────────────────────────── */}
      <section>
        <div className="name-layout">
          <div className="name-heading">
            <h1>Qusay Qadir</h1>
            <div className="name-location">
              <span>Toronto, CAN</span>
            </div>
          </div>

          <div className="name-meta">
            <div className="meta-group">
              <p>McMaster University</p>
              <p>B.Eng. Software Engineering, Minor in Mathematics</p>
              <p>2022 – 2027</p>
            </div>
            <div className="meta-group">
              <p>Site Reliability Engineering Intern (Agentic Observability)</p>
              <p>@ RBC Borealis</p>
            </div>
            <div className="meta-group">
              <p className="meta-label">currently open to · Fall 2026 &amp; Winter 2027</p>
              <p>Backend Software Engineering</p>
              <p>Data Engineering</p>
              <p>AI / ML Engineering</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────────── */}
      <section id="about">
        <h2>about</h2>

        <p>Hi, I'm Qusay. I like building systems, mostly using Python, Go, and TypeScript.</p>

        <div className="skills">
          {SKILLS.map(skill => (
            <span key={skill} className="skill-pill">{skill}</span>
          ))}
        </div>

        <div className="more-about-row">
          <span className="more-arrow">→</span>
          <label htmlFor="more-info"><span>more about me</span></label>
        </div>
        <input id="more-info" type="checkbox" />

        {/* Expanded div — arrows + tooltip rendered INSIDE here */}
        <div ref={aboutExpandedRef}>

          {/* Arrows + tooltips live inside this div, positioned absolutely */}
          {arrows && (
            <>
              <svg className="about-arrow-svg">
                <defs>
                  {/* One small triangular arrowhead per arrow (colour-matched).
                      auto-rotates to the path so it always points at the label. */}
                  {arrows.map((a, i) => (
                    <marker
                      key={i}
                      id={`about-arrowhead-${i}`}
                      viewBox="0 0 10 10"
                      refX="8" refY="5"
                      markerWidth="7" markerHeight="7"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 0 L 10 5 L 0 10 z" fill={a.color} />
                    </marker>
                  ))}
                </defs>
                {arrows.map((a, i) => (
                  <path
                    key={i}
                    d={a.path}
                    stroke={a.color} strokeWidth="2"
                    fill="none"
                    strokeLinecap="round" strokeLinejoin="round"
                    markerEnd={`url(#about-arrowhead-${i})`}
                  />
                ))}
              </svg>
              {arrows.map((a, i) => (
                <div
                  key={i}
                  className="about-tooltip"
                  style={{ left: a.tx, top: a.ty }}
                >
                  <span
                    className="tooltip-label"
                    style={{ backgroundColor: `${a.color}28` }}
                  >
                    [{a.num}] {a.subtitle}
                  </span>
                  {a.lines.map((line, j) => <p key={j}>{line}</p>)}
                </div>
              ))}
            </>
          )}

          <p>
            After studying Software Engineering (minor in Mathematics) at McMaster University,
            I interned at Scotiabank as a data engineer, joined the McMaster Exoskeleton team
            building ML systems for a wearable robot, then worked as a backend engineer at
            Homewise.AI — founded by ex-Meta, Google, and Databricks engineers — and am
            currently interning at RBC Borealis in site reliability and agentic observability.
          </p>
          <p>
            My interests sit at the intersection of system design, databases, GPU-to-GPU
            networking, and Agentic AI. I like understanding how things work at the layer below
            the abstraction.
          </p>
          <p>
            When I'm not building: racquet sports, Scorsese films, and latte art with my
            Breville Barista Express.
          </p>

          {/* Single photo */}
          <div className="photo-row">
            <div ref={suitRef} className="photo-circle-wrap"
              onMouseEnter={() => enterPhoto()}
              onMouseLeave={leavePhoto}>
              <img src="/images/qusay-suit.png" alt="Qusay" className="photo-circle" />
            </div>
          </div>

        </div>
      </section>

      {/* ── EXPERIENCE ──────────────────────────────────────── */}
      <div id="experience" ref={expWrapRef}
        style={{ minHeight: `${EXPERIENCE.length * 60 + 100}dvh` }}>
        <section className="scroll-section">
          <h2>experience</h2>
          <div className="item-list">
            {EXPERIENCE.map(e => (
              <div key={e.id}
                className={`item${expPanel === e.id ? ' selected' : ''}`}
                onClick={() => setExpPanel(e.id)}>
                {e.company}
                <span className="item-sub">{e.role} &middot; {e.period}</span>
              </div>
            ))}
          </div>
          <div className="exp-detail">
            <div className="exp-detail-text" key={expPanel}>
              <p><strong>{activeExp.company}</strong></p>
              <p className="exp-role">{activeExp.role}</p>
              <p className="exp-period">{activeExp.period} &middot; {activeExp.location}</p>
              <p className="exp-desc">{activeExp.description}</p>
              <p className="exp-tech">{activeExp.tech}</p>
            </div>
            <div className="exp-detail-spacer" />
          </div>
        </section>
      </div>

      {/* ── PROJECTS ────────────────────────────────────────── */}
      <div id="projects" ref={projWrapRef}
        style={{ minHeight: `${PROJECTS.length * 60 + 100}dvh` }}>
        <section className="scroll-section">
          <h2>projects</h2>
          <div className="item-list">
            {PROJECTS.map(p => (
              <div key={p.id}
                className={`item${projPanel === p.id ? ' selected' : ''}`}
                onClick={() => setProjPanel(p.id)}>
                {p.title}
                <span className="item-sub">{p.year} &middot; {p.status}</span>
              </div>
            ))}
          </div>
          <div className="proj-detail">
            <div className="proj-placeholder">coming soon</div>
            <div className="proj-text" key={projPanel}>
              <p>{activeProj.description}</p>
              <p className="proj-tech">{activeProj.tech}</p>
              <div className="proj-links">
                <a href={activeProj.github} target="_blank" rel="noopener noreferrer">github</a>
                {activeProj.link && (
                  <a href={activeProj.link} target="_blank" rel="noopener noreferrer">project link</a>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── RESUME ──────────────────────────────────────────── */}
      <section id="resume">
        <h2>resume</h2>
        <a href={resumePdf} target="_blank" rel="noopener noreferrer">download cv</a>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────── */}
      <section id="contact">
        <h2>contact</h2>
        <a href="mailto:qadirq@mcmaster.ca">qadirq@mcmaster.ca</a>
        <a href="https://www.linkedin.com/in/qusay-qadir/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://github.com/qusayqadir" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.instagram.com/qusay.qadir/" target="_blank" rel="noopener noreferrer">Instagram</a>
      </section>
    </>
  )
}
