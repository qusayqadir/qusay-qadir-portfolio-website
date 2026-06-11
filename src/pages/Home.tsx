import { useState, useEffect, useRef } from 'react'
import { GitHubCalendar } from 'react-github-calendar'
import { useIsMobile } from '@/hooks/use-mobile'
import resumePdf from "@/assets/Qusay_Qadir_Intern_BackendSWE_2026.pdf"

const NAV_SECTIONS = ['about', 'experience', 'projects', 'github', 'resume', 'contact']

const SKILLS = {
  languages: ['Python', 'Java', 'SQL'],
  backend: ['Django', 'FastAPI', 'FastMCP', 'GraphQL', `Redis`],
  'data & ml': ['PostgreSQL', 'MongoDB', 'Apache Spark', 'Kafka', `LangChain/LangGraph/LangSmith`, `RAG`, `MCP`],
  infra: ['AWS', `GCP`, `Docker`, 'OpenShift', 'Linux', 'Github'],
  tools: [`Claude Code`, `Windsurf`, `Postman`, ],
}

interface ExpItem {
  id: string; company: string; role: string
  period: string; location: string; description: string; tech: string
}

const EXPERIENCE: ExpItem[] = [
  {
    id: 'rbc', company: 'RBC Borealis',
    role: 'Software Engineer Intern (Agentic Observability)',
    period: 'Jan 2026 – Present', location: 'Toronto, CAN',
    description: 'Lumina Data Platform: Built evaluation pipelines for RBC Assist user interaction traces. Created APIs for RBC Assist prod canary testing, pii traces, and content behaviour safety. Engineering an API suite for an Email Alert Notification Service. Designed and developed API router connecting multiple microservice endpoints with JWT authentication, eliminating a latency bottleneck.',
    tech: 'Python · Go · FastAPI · Temporal · RedHat OpenShift · DBeaver · Postman',
  },
  {
    id: 'homewise', company: 'Homewise.AI (ex-google, ex-meta)',
    role: 'Software Engineer, Backend',
    period: 'Jun 2025 – Jan 2026', location: 'San Francisco, US',
    description: 'Launched a conversational agentic home-search tool powering end-to-end property discovery using Gemini Flash. Designed backend agentic workflows with custom SequentialAgent and ParallelAgent pipelines via Google ADK, integrating MCP servers and Vertex RAG Engine. The workflows managed home research based off client research, home due-diligence, financial planning, and calender management (personal and showing). Finally built system Eval Sets to benchmark LLM response quality.',
    tech: 'Python · Google ADK · GCP · Vertex RAG Engine · PostgreSQL · Docker',
  },
  {
    id: 'exo', company: 'McMaster Exoskeleton',
    role: 'Software Engineering, ML & AI',
    period: 'Nov 2024 – Dec 2025', location: 'Hamilton, CAN',
    description: 'Competed at ACE 2025 (University of Michigan). Built a Python LSTM deep neural network classifying movement types from IMU sensors, productionized via FastAPI. Engineered an ETL data pipeline to process 10+ hours of raw sensor data through AWS S3. Allowed 15+ team memebers to interact with the S3 object instance via custom CLI tool and provisioned IAM policies.',
    tech: 'Python · TensorFlow · Pandas · NumPy · Apache Spark · AWS',
  },
  {
    id: 'scotiabank', company: 'Scotiabank',
    role: 'Software Engineer, Data',
    period: 'Apr 2024 – Sep 2024', location: 'Toronto, CAN',
    description: 'Part of the Velocity program. Shipped an ELT data pipeline migrating 4TB+ of legacy IBM DB2 data to GCP BigQuery and Snowflake. Optimized SQL queries through unclustered-indexing and broke large tables into dependency-maintained sub-tables.',
    tech: 'Python · Kafka · Google Cloud Platform · Airflow',
  },
  {
    id: 'research', company: 'Super Image Resolution Lab - McMaster University',
    role: 'Software Research Engineering',
    period: ' June 2024', location: 'Hamilton, CAN',
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
    id: 'f1', title: 'Formula-1 Bloomberg Terminal Engine', year: 'April 2026 - Present', status: 'WIP',
    description: 'A centralized data platform for F1 enthusiasts, a data dense and LLM enabled web application to provide critical insights, dashboard features, and custom analytics graphs based off natural langauge queries. Experimented with RAG techniques like hybrid search (keyword and vectorbased), re-rank, MCP clients, and built a knowledge corpus. Managed agentic workflows using LangGraph. Provided users with an interactive live race dashboard with sub 5ms latency from real time that would allow them to view different racer telemetry data. Also a historical dashbaord which consisted of designing a batch datapipeline, database scheam design and endpoint delivery.' ,
    tech: 'Python · PostgreSQL · LangGraph · MongoDB ',
    github: 'https://github.com/qusayqadir', link: null,
  },
  {
    id: 'portfolio', title: 'Portfolio Website', year: 'March 2026 - Present', status: 'Live',
    description: 'Personal portfolio website to show off experience and projects in React 19, TypeScript, and Tailwind CSS v4.',
    tech: 'TypeScript · React · Vite · Tailwind',
    github: 'https://github.com/qusayqadir', link: null,
  },
  {
    id: 'http', title: 'Custom HTTP Framework', year: 'Feb 2026', status: 'WIP',
    description: 'Building an HTTP framework from scratch on top of a raw TCP server, no frameworks, no abstractions. Understanding the full request/response lifecycle at the protocol level.',
    tech: 'Python · TCP · HTTP',
    github: 'https://github.com/qusayqadir', link: null,
  },
  {
    id: 'p2p', title: 'Peer to Peer Connection System', year: 'Feb 2026', status: 'Done',
    description: 'A decentralized peer-to-peer system enabling direct node-to-node communication with no central server handling peer discovery, connection management, and data transfer over raw sockets.',
    tech: 'Go · TCP · Sockets',
    github: 'https://github.com/qusayqadir', link: null,
  },
  {
    id: 'mri', title: 'MRI Cognitive Classification', year: 'Oct 2025 - Dec 2025', status: 'Done',
    description: 'Deep learning pipeline that classifies cognitive conditions from MRI brain scans using convolutional neural networks covering medical image preprocessing, augmentation, and model evaluation.',
    tech: 'Python · PyTorch · CNN · NumPy',
    github: 'https://github.com/qusayqadir', link: null,
  },
  {
    id: 'drone', title: 'Autonomous Rescue Drone', year: 'Feb 2025 - Apri 2025', status: 'Done',
    description: 'Autonomous drone navigation system, implements an exploration command center that scouts an island map, locates points of interest, and returns mission data for a rescue simulation.',
    tech: 'Java · Software Design Patterns',
    github: 'https://github.com/qusayqadir/Rescue_Drone_AutoNav', link: null,
  },
  {
    id: 'snake', title: 'Snake in C', year: 'Sept 2024', status: 'Done',
    description: 'The classic Snake game written from scratch in C with real-time keyboard input, collision detection, and terminal rendering with ncurses.',
    tech: 'C · C++',
    github: 'https://github.com/qusayqadir/OOP-SnakeGame-C-', link: null,
  },
  {
    id: 'spatial', title: '3D Spatial Mapping Embedded System', year: '2024', status: 'Done',
    description: 'An embedded system that reconstructs its surroundings as a 3D point cloud sweeping distance sensors on servo-driven actuators and mapping the environment in real time.',
    tech: 'C · Embedded · Sensors',
    github: 'https://github.com/qusayqadir', link: null,
  }
]

// Removed arrow and annotation functionality - kept facts in the text


export default function Home() {
  const isMobile = useIsMobile()
  const [active,     setActive]     = useState('about')
  const [expPanel,   setExpPanel]   = useState<string>(EXPERIENCE[0].id)
  const [projPanel,  setProjPanel]  = useState<string>(PROJECTS[0].id)

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
        { rootMargin: '-20% 0px -60% 0px' },
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  useEffect(() => {
    if (isMobile) return  // no scroll-jacked panels on touch; items are tap-to-select
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
  }, [isMobile])


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

  // Scrolling down on the home section animates a jump to the about section.
  // Everything else scrolls normally. The animation is self-driven so trackpad
  // momentum can't interrupt it.
  useEffect(() => {
    if (isMobile) return  // wheel-jack is desktop-only; native touch scrolling on phones
    let animating = false
    let rafId = 0
    const root = document.documentElement
    const prevBehavior = root.style.scrollBehavior
    root.style.scrollBehavior = 'auto'

    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

    const animateTo = (targetY: number) => {
      cancelAnimationFrame(rafId)
      animating = true
      const startY = window.scrollY
      const dist = targetY - startY
      const dur = 600
      const t0 = performance.now()
      const step = (t: number) => {
        const p = Math.min((t - t0) / dur, 1)
        window.scrollTo(0, startY + dist * ease(p))
        if (p < 1) rafId = requestAnimationFrame(step)
        else animating = false
      }
      rafId = requestAnimationFrame(step)
    }

    const onWheel = (e: WheelEvent) => {
      if (animating) { e.preventDefault(); return }  // don't let momentum interrupt the jump
      const about = document.getElementById('about')
      if (!about) return
      const rect = about.getBoundingClientRect()
      // only while on the home section (about still well below the fold) and scrolling down
      if (e.deltaY > 0 && rect.top > window.innerHeight * 0.5) {
        e.preventDefault()
        animateTo(Math.max(0, rect.top + window.scrollY - 40))
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      window.removeEventListener('wheel', onWheel)
      cancelAnimationFrame(rafId)
      root.style.scrollBehavior = prevBehavior
    }
  }, [isMobile])

  useEffect(() => {
    const detailTexts = document.querySelectorAll('.exp-detail-text')
    if (detailTexts.length === 0) return

    let maxHeight = 0
    detailTexts.forEach(el => {
      const height = (el as HTMLElement).scrollHeight
      if (height > maxHeight) maxHeight = height
    })

    const root = document.documentElement
    root.style.setProperty('--exp-detail-height', `${maxHeight}px`)
  }, [])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  // Photo hover events removed - no longer showing arrows

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
      <section id="home">
        <div className="name-layout">
          <div className="name-heading">
            <h1>Qusay Qadir</h1>
            <div className="name-location">
              <span>Toronto, CAN</span>
            </div>
          </div>

          <div className="name-meta">
            <div className="meta-group">
              <p>Software Engineer Intern (Agentic Observability)</p>
              <p>@ RBC Borealis</p>
            </div>
            <div className="meta-group">
              <p className="meta-label">currently open for Fall 2026 &amp; Winter 2027 internship opportunities in</p>
              <br></br>
              <p>Backend / Data / Database Software Engineer</p>
              <p>AI / MLOps Engineer</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────
      ──────────────── */}
      <section id="about">
        <h2>about</h2>

        <p>Hi, I'm Qusay. I like building systems, that involve Python, Databases, and Agents!</p>

        <div className="skills">
          {Object.entries(SKILLS).map(([category, items]) => (
            <div key={category} className="skill-row">
              <div className="skill-label">{category}</div>
              <div className="skill-list">{items.join(' · ')}</div>
            </div>
          ))}
        </div>

        <div className="more-about-row">
          <span className="more-arrow">→</span>
          <label htmlFor="more-info"><span>more about me</span></label>
        </div>
        <input id="more-info" type="checkbox" />

        {/* Expanded div */}
        <div ref={aboutExpandedRef}>

          <p style={{ fontFamily: 'Verdana, Geneva, sans-serif' }}>
            Currently @ McMaster University studying Software Engineering COOP (minor in math).
          </p>
          <p style={{ fontFamily: 'Verdana, Geneva, sans-serif' }}>
            Most recently was a stealth startup software engineer, Homewise.AI, based in the bay area and found by ex-meta ex-google and ex-databricks engineers, where 
            I was tasked to build agentic orchestrations that would off load admin work for real estate agents in the 
            greater seattle area. The goal of these agentic systems was to find homes for the clients of real estate agents based off their preference, home due-diligence, financial planning, and calender management (personal and showings).
            
            <br></br>
            <br></br>
            Interned @ Scotiabank as a Data Engineer building enterprise migration (to snowflake) data pipelines, building skills in  
            kafka, spark, and relational databases. 

          </p>
          <p style={{ fontFamily: 'Verdana, Geneva, sans-serif' }}>
            My interests lie @ the intersection of fintech, system design, databases, 
            network latencty. 
          </p>
          <p style={{ fontFamily: 'Verdana, Geneva, sans-serif' }}>
            When I'm not building; ciniphile, athlete, and clinically dependent on caffeine (coffee chat?)
          </p>

          {/* Photos */}
          <div className="photo-row">
            <div ref={suitRef} className="photo-circle-wrap">
              <img src="/images/qusay-suit.png" alt="Qusay" className="photo-circle" />
            </div>
            <div className="photo-circle-wrap">
              <img src="/images/qusay-geneva.png" alt="Qusay in Geneva" className="photo-circle" />
            </div>
            <div className="photo-circle-wrap">
              <img src="/images/qusay-train.png" alt="Qusay on the GO train" className="photo-circle" />
            </div>
          </div>

        </div>
      </section>

      {/* ── EXPERIENCE ──────────────────────────────────────── */}
      <div id="experience" ref={expWrapRef}
        style={{ minHeight: isMobile ? undefined : `${EXPERIENCE.length * 30 + 100}dvh` }}>
        <section className={isMobile ? '' : 'scroll-section'}>
          <h2>experience</h2>
          <div className="item-list">
            {EXPERIENCE.map(e => (
              <div key={e.id}
                onClick={isMobile ? () => setExpPanel(e.id) : undefined}
                className={`item${expPanel === e.id ? ' selected' : ''}`}>
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
        style={{ minHeight: isMobile ? undefined : `${PROJECTS.length * 30 + 100}dvh` }}>
        <section className={isMobile ? '' : 'scroll-section'}>
          <h2>projects</h2>
          <div className="item-list">
            {PROJECTS.map(p => (
              <div key={p.id}
                onClick={isMobile ? () => setProjPanel(p.id) : undefined}
                className={`item${projPanel === p.id ? ' selected' : ''}`}>
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

      {/* ── GITHUB ──────────────────────────────────────────── */}
      <section id="github">
        <h2>github</h2>
        <div className="github-container">
          <GitHubCalendar
            username="qusayqadir"
            colorScheme="light"
            blockSize={12}
            blockMargin={3}
            fontSize={11}
            theme={{
              light: ['#e3e3e3', '#a8dde2', '#6cc7d1', '#3fb5c2', '#24adbc'],
              dark: ['#2a2a2a', '#1a5a63', '#1d7d8a', '#208fa0', '#24adbc'],
            }}
          />
        </div>
      </section>

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
