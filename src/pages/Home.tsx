import Footer from "@/components/layout/Footer"
import { Link } from "react-router-dom"
import { ThreeCircleImages } from "@/components/layout/Three-Circle-Images"
import FadeIn from "@/components/layout/FadeIn"
import MusicSection from "@/components/layout/MusicSection"
import { useState, useRef, useCallback, useEffect, type RefObject } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { X } from "lucide-react"

type PhotoKey = 'left' | 'center' | 'right'

const PHOTO_INFO: Record<PhotoKey, {
  num: string
  color: string
  title: string
  rows: { label: string; text: string }[]
}> = {
  left: {
    num: '1',
    color: '#F97316',
    title: 'The tie obsession',
    rows: [
      { label: 'E. Marinella', text: 'Archivio 1942, Naples, hand stitched, 0 retail stores worldwide' },
      { label: 'Hermès', text: 'Crazy Poney, Bleu Marine (unreleased), says a lot about my time on their website' },
    ],
  },
  center: {
    num: '2',
    color: '#3B82F6',
    title: 'Qusay @ Geneva',
    rows: [
      { label: 'The trip', text: 'Solo backpacking across Europe, summer 2025, not for some lame excuse myself but see some new places.' },
      { label: 'Route', text: 'London → Geneva → Interlaken → Amsterdam → Munich → Prague → Berlin → Dublin' },
    ],
  },
  right: {
    num: '3',
    color: '#10B981',
    title: 'GoTrain dependence',
    rows: [
      { label: 'The commute', text: 'Daily trek to RBC Borealis in Toronto where I listen podcasts until I nod off' },
      { label: 'Dream city', text: "If I had to commute anywhere, it'd be New York there is no doubt about it" },
    ],
  },
}

// Seeded pseudo-random in [-1, 1] — stable across renders, no extra dep
function seededRand(seed: number): number {
  const x = Math.sin(seed + 1) * 10000
  return (x - Math.floor(x)) * 2 - 1
}

// Full-viewport fixed SVG that draws a bezier arrow from the info card to the photo.
// Rendered as a sibling of PhotoCard so it escapes the card's bounds entirely.
// Both components mount in the same render; refs are committed before any useEffect fires.
function ArrowOverlay({
  photo,
  photoRef,
  cardRef,
  color,
}: {
  photo: PhotoKey
  photoRef: RefObject<HTMLButtonElement | null>
  cardRef:  RefObject<HTMLDivElement  | null>
  color: string
}) {
  const mainRef = useRef<SVGPathElement>(null)
  const h1Ref   = useRef<SVGPathElement>(null)
  const h2Ref   = useRef<SVGPathElement>(null)
  // Tracks whether the draw animation has already played (to avoid replaying on resize)
  const hasAnimatedRef = useRef(false)

  type Paths = { main: string; h1: string; h2: string }
  const [paths, setPaths] = useState<Paths | null>(null)

  // Compute path from live DOM measurements.
  // Left/right: two-segment cubic Bézier with a lasso loop, landing on the photo's side edge.
  // Center: simple quadratic arc.
  const computePaths = useCallback(() => {
    const photoEl = photoRef.current
    const card    = cardRef.current
    if (!photoEl || !card) return

    const pr = photoEl.getBoundingClientRect()
    const cr = card.getBoundingClientRect()

    // Start: top-left corner of the card
    const sx = cr.left + 20
    const sy = cr.top + 8
    const hs = 10

    let mainD: string, h1D: string, h2D: string

    if (photo === 'center') {
      const ex = pr.left + pr.width / 2
      const ey = pr.bottom
      const qx = (sx + ex) / 2 + 50
      const qy = (sy + ey) / 2
      mainD = `M ${sx} ${sy} Q ${qx} ${qy} ${ex} ${ey}`
      const tdx = ex - qx, tdy = ey - qy, tl = Math.hypot(tdx, tdy) || 1
      const nx = tdx / tl, ny = tdy / tl
      h1D = `M ${ex} ${ey} L ${ex - nx*hs + ny*hs*0.45} ${ey - ny*hs - nx*hs*0.45}`
      h2D = `M ${ex} ${ey} L ${ex - nx*hs - ny*hs*0.45} ${ey - ny*hs + nx*hs*0.45}`
    } else {
      const photoR  = pr.height / 2
      const photoCY = pr.top + photoR

      // Deterministic wobble: each control point gets a ±4px offset seeded by photo key.
      // Different seed bases (10 vs 20) give each photo its own stable hand-drawn character.
      const seedBase = photo === 'right' ? 10 : 20
      const w = (n: number, amp = 4) => seededRand(seedBase + n) * amp

      let pathSx: number  // start x — differs per side (see comment in right branch)
      let ex: number, ey: number
      let loopX: number, loopY: number
      let cp1x: number, cp1y: number, cp2x: number, cp2y: number
      let cp3x: number, cp3y: number, cp4x: number, cp4y: number

      if (photo === 'right') {
        // Land on right edge (3 o'clock), arrowhead points inward (leftward)
        ex = pr.right - 4
        ey = photoCY

        // Card left edge nearly overlaps photo right edge (~10px apart at typical widths),
        // so card top-LEFT gives a near-vertical degenerate path. Use card top-RIGHT
        // instead — creates ~270px horizontal separation, matching orange's geometry.
        pathSx = cr.right - 20

        loopX = ex + 80
        loopY = ey - photoR * 1.2

        cp1x = pathSx - 30;  cp1y = sy - 100      // pull left and up from card's right area
        cp2x = loopX + 60;   cp2y = loopY + 50    // arrive at apex from the right
        cp3x = loopX + 110;  cp3y = loopY - 25    // far right → visible lasso arc
        cp4x = ex + 55;      cp4y = ey - 10       // approach from right → arrowhead points inward
      } else {
        // Land on left edge (9 o'clock), arrowhead points inward (rightward)
        ex = pr.left + 4
        ey = photoCY

        pathSx = sx  // card top-left works fine — plenty of horizontal clearance

        loopX = ex - 80
        loopY = ey - photoR * 1.2

        cp1x = pathSx + 20;  cp1y = sy - 100
        cp2x = loopX + 60;   cp2y = loopY + 50
        cp3x = loopX - 110;  cp3y = loopY - 25
        cp4x = ex - 55;      cp4y = ey - 10
      }

      // Apply seeded wobble to all four control points for hand-drawn character
      cp1x += w(1); cp1y += w(2)
      cp2x += w(3); cp2y += w(4)
      cp3x += w(5); cp3y += w(6)
      cp4x += w(7); cp4y += w(8)

      // Arrowhead direction = tangent at end of final segment = (end − cp4) normalised
      const tdx = ex - cp4x, tdy = ey - cp4y
      const tl  = Math.hypot(tdx, tdy) || 1
      const tx  = tdx / tl, ty = tdy / tl

      mainD = `M ${pathSx} ${sy} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${loopX} ${loopY} C ${cp3x} ${cp3y} ${cp4x} ${cp4y} ${ex} ${ey}`
      h1D   = `M ${ex} ${ey} L ${ex - tx*hs + ty*hs*0.45} ${ey - ty*hs - tx*hs*0.45}`
      h2D   = `M ${ex} ${ey} L ${ex - tx*hs - ty*hs*0.45} ${ey - ty*hs + tx*hs*0.45}`
    }

    setPaths({ main: mainD, h1: h1D, h2: h2D })
  }, [photo, photoRef, cardRef])

  // Compute on mount; recompute (debounced) on resize
  useEffect(() => {
    computePaths()

    let debounceTimer: ReturnType<typeof setTimeout> | null = null
    const onResize = () => {
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = setTimeout(computePaths, 150)
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      if (debounceTimer) clearTimeout(debounceTimer)
    }
  }, [computePaths])

  // Animate on first paint; on subsequent resize updates just show the path instantly
  useEffect(() => {
    if (!paths) return
    const main = mainRef.current
    if (!main) return

    if (hasAnimatedRef.current) {
      // Resize path update — already drawn, just reposition without replaying animation
      main.style.transition = 'none'
      main.style.strokeDasharray = ''
      main.style.strokeDashoffset = '0'
      ;[h1Ref, h2Ref].forEach(r => {
        const el = r.current
        if (!el) return
        el.style.transition = 'none'
        el.style.strokeDasharray = ''
        el.style.strokeDashoffset = '0'
      })
      return
    }
    hasAnimatedRef.current = true

    // Hide arrowheads before animation starts
    ;[h1Ref, h2Ref].forEach(r => {
      const el = r.current
      if (!el) return
      const len = el.getTotalLength()
      el.style.transition = 'none'
      el.style.strokeDasharray = `${len}`
      el.style.strokeDashoffset = `${len}`
    })

    // Reset main path
    const len = main.getTotalLength()
    main.style.transition = 'none'
    main.style.strokeDasharray = `${len}`
    main.style.strokeDashoffset = `${len}`

    // Force reflow — prevents browser batching reset + animate into one paint
    main.getBoundingClientRect()

    // Arrow draws immediately after card appears (slight delay to feel sequential)
    const t0 = setTimeout(() => {
      main.style.transition = 'stroke-dashoffset 0.45s cubic-bezier(0.4, 0, 0.2, 1)'
      main.style.strokeDashoffset = '0'
    }, 120)

    // Arrowhead snaps in when line finishes
    const t1 = setTimeout(() => {
      const h1 = h1Ref.current
      if (!h1) return
      h1.getBoundingClientRect()
      h1.style.transition = 'stroke-dashoffset 0.08s ease-out'
      h1.style.strokeDashoffset = '0'
    }, 580)

    const t2 = setTimeout(() => {
      const h2 = h2Ref.current
      if (!h2) return
      h2.getBoundingClientRect()
      h2.style.transition = 'stroke-dashoffset 0.08s ease-out'
      h2.style.strokeDashoffset = '0'
    }, 640)

    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2) }
  }, [paths])

  if (!paths) return null

  const base = { stroke: color, strokeWidth: 2.5, strokeLinecap: 'round' as const, fill: 'none' }

  return (
    <svg
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 49, width: '100vw', height: '100vh' }}
    >
      <path ref={mainRef} d={paths.main} {...base} />
      <path ref={h1Ref}   d={paths.h1}   {...base} />
      <path ref={h2Ref}   d={paths.h2}   {...base} />
    </svg>
  )
}

function PhotoCard({
  photo, isMobile, cardRef,
  onMouseEnter, onMouseLeave, onClose,
}: {
  photo: PhotoKey; isMobile: boolean
  cardRef: RefObject<HTMLDivElement | null>
  onMouseEnter: () => void; onMouseLeave: () => void; onClose: () => void
}) {
  const info  = PHOTO_INFO[photo]
  const hlRef = useRef<HTMLSpanElement>(null)

  // Highlighter swipe on the [n] label — plays immediately, arrow draws 350ms later
  useEffect(() => {
    const hl = hlRef.current
    if (!hl) return
    hl.style.transition = 'none'
    hl.style.transform = 'scaleX(0)'
    hl.getBoundingClientRect()
    hl.style.transition = 'transform 0.5s cubic-bezier(0.65, 0, 0.35, 1)'
    hl.style.transform = 'scaleX(1)'
  }, [])

  const posClass = isMobile
    ? 'fixed bottom-4 left-4 right-4'
    : photo === 'left'
      ? 'fixed top-[55vh] left-6'
      : photo === 'center'
        ? 'fixed top-[55vh] left-1/2 -translate-x-1/2'
        : 'fixed top-[55vh] right-6'

  return (
    <div
      ref={cardRef}
      className={`${posClass} z-50 md:w-80 bg-background border rounded-2xl shadow-2xl p-5`}
      style={{ animation: 'pca 0.25s ease-out forwards' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <style>{`@keyframes pca { from { opacity: 0; transform: translateY(10px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }`}</style>

      <div className="flex items-start justify-between mb-3">
        <p className="text-[10px] font-mono tracking-widest uppercase leading-none">
          <span className="relative inline-block">
            <span
              ref={hlRef}
              className="absolute inset-y-0 -inset-x-0.5 rounded-sm"
              style={{
                background: `${info.color}38`,
                transformOrigin: 'left center',
                transform: 'scaleX(0)',
                zIndex: 0,
              }}
            />
            <span className="relative z-10">
              <span style={{ color: info.color }}>[{info.num}]</span>
              {' '}
              <span className="text-muted-foreground">{info.title}</span>
            </span>
          </span>
        </p>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors shrink-0 ml-3">
          <X size={14} />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {info.rows.map((row) => (
          <div key={row.label} className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold">{row.label}</span>
            <span className="text-xs text-muted-foreground leading-relaxed">{row.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const FAVE_FILMS = [
  { title: 'The Departed', note: 'Scorsese at his absolute peak' },
  { title: 'King of Comedy', note: 'The most underrated Scorsese film' },
  { title: 'The Town', note: 'Affleck directed and acted film works every time' },
]

export default function Home() {
  const isMobile = useIsMobile()
  const [activePhoto, setActivePhoto] = useState<PhotoKey | null>(null)
  const [animKey, setAnimKey] = useState(0)
  const [showFilms, setShowFilms] = useState(false)
  const [showEspresso, setShowEspresso] = useState(false)
  const leaveTimer    = useRef<ReturnType<typeof setTimeout> | null>(null)
  const leftImgRef   = useRef<HTMLButtonElement>(null)
  const centerImgRef = useRef<HTMLButtonElement>(null)
  const rightImgRef  = useRef<HTMLButtonElement>(null)
  const cardRef      = useRef<HTMLDivElement>(null)

  const clearTimer = () => { if (leaveTimer.current) clearTimeout(leaveTimer.current) }

  const handleEnter = useCallback((photo: PhotoKey) => {
    clearTimer()
    setActivePhoto(prev => {
      if (prev !== photo) setAnimKey(k => k + 1)
      return photo
    })
  }, [])

  const handleLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => setActivePhoto(null), 120)
  }, [])

  const handleCardEnter = useCallback(() => clearTimer(), [])

  const handleMobileClick = (photo: PhotoKey) => {
    if (activePhoto === photo) {
      setActivePhoto(null)
    } else {
      setActivePhoto(photo)
      setAnimKey(k => k + 1)
    }
  }

  useEffect(() => () => clearTimer(), [])

  useEffect(() => {
    if (!showFilms) return
    const t = setTimeout(() => setShowFilms(false), 5000)
    return () => clearTimeout(t)
  }, [showFilms])

  useEffect(() => {
    if (!showEspresso) return
    const t = setTimeout(() => setShowEspresso(false), 5000)
    return () => clearTimeout(t)
  }, [showEspresso])

  return (
    <div className="min-h-screen">

      {/* stacked toasts — top-left */}
      {(showEspresso || showFilms) && (
        <div className="fixed top-20 left-4 z-50 flex flex-col gap-3 animate-in slide-in-from-left-4 duration-300">
          {showEspresso && (
            <div className="bg-background border rounded-2xl shadow-xl p-4 w-64">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-mono tracking-widest uppercase text-muted-foreground">The Machine</p>
                <button onClick={() => setShowEspresso(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X size={12} />
                </button>
              </div>
              <p className="text-sm font-semibold leading-snug">Breville Barista Express</p>
              <p className="text-xs text-muted-foreground mt-1">BES870XL · Brushed Stainless Steel</p>
              <p className="text-xs text-muted-foreground italic mt-2">(hope reddit does not disappoint)</p>
            </div>
          )}
          {showFilms && (
            <div className="bg-background border rounded-2xl shadow-xl p-4 w-64">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-mono tracking-widest uppercase text-muted-foreground">Fave Films</p>
                <button onClick={() => setShowFilms(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X size={12} />
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {FAVE_FILMS.map((f) => (
                  <div key={f.title} className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold">{f.title}</span>
                    <span className="text-xs text-muted-foreground">{f.note}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Dim overlay — rendered at root level to avoid FadeIn stacking context */}
      <div
        className="fixed inset-0 transition-opacity duration-300"
        style={{
          backgroundColor: 'rgba(0,0,0,0.65)',
          zIndex: 40,
          opacity: activePhoto ? 1 : 0,
          pointerEvents: activePhoto && isMobile ? 'auto' : 'none',
        }}
        onClick={isMobile ? () => setActivePhoto(null) : undefined}
      />

      {/* Floating photo card + arrow overlay — key=animKey remounts both on each hover */}
      {activePhoto && (
        <>
          <PhotoCard
            key={animKey}
            photo={activePhoto}
            isMobile={isMobile}
            cardRef={cardRef}
            onMouseEnter={handleCardEnter}
            onMouseLeave={handleLeave}
            onClose={() => setActivePhoto(null)}
          />
          <ArrowOverlay
            key={`arrow-${animKey}`}
            photo={activePhoto}
            photoRef={activePhoto === 'left' ? leftImgRef : activePhoto === 'center' ? centerImgRef : rightImgRef}
            cardRef={cardRef}
            color={PHOTO_INFO[activePhoto].color}
          />
        </>
      )}

      <main id="about-me" className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center gap-6 p-8 pt-16">

        <FadeIn className="w-full flex flex-col items-center gap-2">
          <section className="w-full flex flex-col items-center gap-2">
            <ThreeCircleImages
              leftRef={leftImgRef}
              centerRef={centerImgRef}
              rightRef={rightImgRef}
              leftSrc="/images/qusay-suit.png"
              centerSrc="/images/qusay-geneva.png"
              rightSrc="/images/qusay-train.png"
              onLeftClick={isMobile ? () => handleMobileClick('left') : undefined}
              onCenterClick={isMobile ? () => handleMobileClick('center') : undefined}
              onRightClick={isMobile ? () => handleMobileClick('right') : undefined}
              onLeftEnter={!isMobile ? () => handleEnter('left') : undefined}
              onLeftLeave={!isMobile ? handleLeave : undefined}
              onCenterEnter={!isMobile ? () => handleEnter('center') : undefined}
              onCenterLeave={!isMobile ? handleLeave : undefined}
              onRightEnter={!isMobile ? () => handleEnter('right') : undefined}
              onRightLeave={!isMobile ? handleLeave : undefined}
              leftLabel="1"
              centerLabel="2"
              rightLabel="3"
              activeLabel={activePhoto ? PHOTO_INFO[activePhoto].num : null}
              centerSize={isMobile ? 200 : 360}
              sideSize={isMobile ? 100 : 200}
              containerHeight={isMobile ? 260 : 420}
            />
          </section>
        </FadeIn>

        <FadeIn>
          <p className="text-xs text-muted-foreground font-mono">(each photo has a story)</p>
        </FadeIn>

        <FadeIn className="flex justify-center w-full px-4">
          <div className="flex flex-col gap-2 items-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Qusay Q.</h2>
            <span className="text-xs font-mono text-muted-foreground">Open to work · Fall 2026 &amp; Winter 2027</span>
          </div>
        </FadeIn>

        <FadeIn className="flex justify-center w-full px-4">
          <div className="w-[100%] max-w-4xl h-max grid gap-4 scroll-mt-24">
            <p className="whitespace-normal break-words leading-relaxed">
              Hello, I'm Qusay, based in Toronto, Canada, I am currently a Software Engineering Intern @ RBC Borealis working on building a scalable data platform for internal consumers.
              I am a Software Engineering student (minor in math) @ McMaster University with a keen interest in system design, databases, networks (specifically GPU to GPU comm) and Agentic AI.
              Programming for me is a means to build solutions to problems in these domains and I am eager to continue to learn and <strong>build things I can take ownership for!</strong>
              <br/>
              <br/>
              When I am not building, I play all kinds of racquet sports, be an expressive{" "}
              <span
                onClick={() => setShowFilms(true)}
                className="underline underline-offset-2 cursor-pointer"
              >
                cinephile
              </span>
              , and lose a nights sleep making latte art with my new{" "}
              <span
                onClick={() => setShowEspresso(true)}
                className="underline underline-offset-2 cursor-pointer"
              >
                espresso machine
              </span>
              .
              <br/>
              <br/>
              Seeking Backend Software Engineering, Data Engineering, or AI dev opportunities for <strong>Fall 2026</strong> and <strong>Winter 2027</strong> -- reach out!
            </p>
          </div>
        </FadeIn>

        <FadeIn className="flex justify-center w-full px-4">
          <div className="w-[100%] max-w-4xl h-max grid gap-1 scroll-mt-24">
            <p className="text-xs font-mono tracking-widest uppercase text-muted-foreground">What I'm up to</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">Now</h2>
            <p className="whitespace-normal break-words leading-relaxed">
              Outside of work, I'm training for a badminton tournament, building a custom HTTP framework from a raw TCP server, upgrading this website, and studying for my AWS certification exam!
              Applying to jobs, listening to new music, doing interviews all the while trying to make the most of my last year of undergrad.
            </p>
          </div>
        </FadeIn>

        <FadeIn className="flex justify-center w-full px-4">
          <div className="w-[100%] max-w-4xl h-max grid gap-4">
            <p className="text-sm text-muted-foreground font-mono tracking-widest uppercase">Music I'm listening to</p>
            <MusicSection />
          </div>
        </FadeIn>

        <FadeIn className="flex justify-center w-full px-4">
          <div className="w-[100%] max-w-4xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground font-mono tracking-widest uppercase">Experience</p>
              <Link to="/experience" className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono tracking-wide">
                view all →
              </Link>
            </div>
            {[
              { role: 'Software Engineering, Backend', company: 'RBC Borealis', date: 'Jan 2026 – Present' },
              { role: 'Software Engineering, Backend', company: 'Stealth AI Startup (Ex-Meta, Google, Databricks)', date: 'Jun 2025 – Jan 2026' },
              { role: 'Software Engineering, ML & AI', company: 'McMaster Exoskeleton', date: 'Nov 2024 – Dec 2025' },
              { role: 'Software Engineering, Data', company: 'Scotiabank', date: 'Apr 2024 – Sep 2024' },
            ].map((item) => (
              <Link
                key={item.company}
                to="/experience"
                className="group flex items-center justify-between py-3 border-b last:border-b-0 hover:bg-muted/40 px-2 -mx-2 rounded transition-colors duration-150"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium">{item.company}</span>
                  <span className="text-xs text-muted-foreground">{item.role}</span>
                </div>
                <span className="text-xs text-muted-foreground font-mono shrink-0 ml-4">{item.date}</span>
              </Link>
            ))}
          </div>
        </FadeIn>

      </main>
      <Footer />
    </div>
  )
}
