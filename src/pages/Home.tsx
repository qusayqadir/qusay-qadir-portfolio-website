import Footer from "@/components/layout/Footer"
import { Link } from "react-router-dom"
import { ThreeCircleImages } from "@/components/layout/Three-Circle-Images"
import FadeIn from "@/components/layout/FadeIn"
import MusicSection from "@/components/layout/MusicSection"
import MovieSection from "@/components/layout/MovieSection"
import { useState, useEffect } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { X } from "lucide-react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"

const FAVE_FILMS = [
  { title: "The Departed", note: "Scorsese at his absolute peak" },
  { title: "King of Comedy", note: "The most underrated Scorsese film" },
  { title: "The Town", note: "Affleck directing Affleck — works every time" },
]

export default function Home() {
  const isMobile = useIsMobile()
  const [openLeft, setOpenLeft] = useState(false)
  const [openCenter, setOpenCenter] = useState(false)
  const [openRight, setOpenRight] = useState(false)
  const [showFilms, setShowFilms] = useState(false)
  const [showEspresso, setShowEspresso] = useState(false)

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

      <main id="about-me" className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center gap-6 p-8 pt-16">

        <FadeIn className="w-full flex flex-col items-center gap-2">
          <section className="w-full flex flex-col items-center gap-2">
            <ThreeCircleImages
              leftSrc="/images/qusay-suit.png"
              centerSrc="/images/qusay-geneva.png"
              rightSrc="/images/qusay-train.png"
              onLeftClick={() => setOpenLeft(true)}
              onCenterClick={() => setOpenCenter(true)}
              onRightClick={() => setOpenRight(true)}
              centerSize={isMobile ? 200 : 360}
              sideSize={isMobile ? 100 : 200}
              containerHeight={isMobile ? 260 : 420}
            />

            <AlertDialog open={openLeft} onOpenChange={setOpenLeft}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Qusay and his recent tie obsession? <></></AlertDialogTitle>
                  <AlertDialogDescription>
                    Thanks to my instagram reel algorithm, with EsDeeKid music overlapped, I have a new found obsession with ties.
                    <br/>
                    <strong>Fav Tie from E. Marinella</strong> Archivio collection year 1942, from Naples, Italy - is a tie that is all hand stitched and they have 0 retail stores in the entire world!
                    <br/>
                    <strong>Fav Tie from Hermes</strong> Crazy Poney tie, Bleu Marine (it's unreleased as of yet) but it goes to show how much time I spend on their website.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>close</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={openCenter} onOpenChange={setOpenCenter}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Qusay @ Geneva, Switzerland</AlertDialogTitle>
                  <AlertDialogDescription>
                    In the summer of 2025, I went on a solo backpacking trip across Europe not for some excuse to 'find myself' but to be traveler, to see and eat!
                    <br/>
                    <strong>Places I visited</strong> London, Geneva, Interlaken, Grindelwald, Amsterdam, Munich, Prague, Berlin, London again, Dublin!
                    <br/>
                    <strong>Fav Place</strong> Munich and Prague.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>close</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={openRight} onOpenChange={setOpenRight}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Qusay and his dependence on the GoTrain</AlertDialogTitle>
                  <AlertDialogDescription>
                    Since starting my new coop @ RBC Borealis in Toronto, the one thing that I dread is the commute almost everyday. I use the time to try and listen to podcasts before I nod off.
                    <br/>
                    If I had to commute to work anywhere, it would be in <strong>new york city</strong> - everywhere i've been in the world that city has the most special place in my heart.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>close</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </section>
        </FadeIn>

        <FadeIn>
          <p className="text-xs text-muted-foreground font-mono">(each photo has a story)</p>
        </FadeIn>

        <FadeIn className="flex justify-center w-full px-4">
          <div className="flex flex-col gap-2 items-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Qusay Q.</h2>
            <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Open to work · Fall 2026 &amp; Winter 2027
            </span>
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
              <button
                onClick={() => setShowFilms(true)}
                className="inline bg-red-600 text-white font-semibold px-2 py-0.5 rounded-full cursor-pointer hover:bg-red-700 transition-colors duration-150"
              >
                cinephile
              </button>
              , and lose a nights sleep making latte art with my new{" "}
              <button
                onClick={() => setShowEspresso(true)}
                className="inline bg-red-600 text-white font-semibold px-2 py-0.5 rounded-full cursor-pointer hover:bg-red-700 transition-colors duration-150"
              >
                espresso machine
              </button>
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
          <div className="w-[100%] max-w-4xl h-max grid gap-4">
            <p className="text-sm text-muted-foreground font-mono tracking-widest uppercase">Movies I want to watch</p>
            <MovieSection />
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
              { role: "Software Engineering, Backend", company: "RBC Borealis", date: "Jan 2026 – Present" },
              { role: "Software Engineering, Backend", company: "Stealth AI Startup (Ex-Meta, Google, Databricks)", date: "Jun 2025 – Jan 2026" },
              { role: "Software Engineering, ML & AI", company: "McMaster Exoskeleton", date: "Nov 2024 – Dec 2025" },
              { role: "Software Engineering, Data", company: "Scotiabank", date: "Apr 2024 – Sep 2024" },
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
