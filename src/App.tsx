import { NavigationMenuDemo } from "@/components/layout/Navigation-Menu"
import { CardSpotlightDemo } from "@/components/layout/Animated-Hover-Cover"
import Footer from "@/components/layout/Footer"
import AccordionTabs from "@/components/shadcn-studio/accordion/accordion-11"
import { ThreeCircleImages } from "./components/layout/Three-Circle-Images"

import { useState } from "react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"

function App() {
  const [openLeft, setOpenLeft] = useState(false)
  const [openCenter, setOpenCenter] = useState(false)
  const [openRight, setOpenRight] = useState(false)
  return (
    <div className="min-h-screen">

      <header className="sticky top-4 z-50 w-full flex justify-center px-4">
        <div className="rounded-full border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg px-6 py-2">
          <NavigationMenuDemo />
        </div>
      </header>
      
      <main id="about-me" className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center gap-6 p-8">
        {/* Hero: three circle images */}
        <section className="w-full flex flex-col items-center gap-2">
          <ThreeCircleImages
            leftSrc="/images/qusay-suit.png"
            centerSrc="/images/qusay-geneva.png"
            rightSrc="/images/qusay-train.png"
            onLeftClick={() => setOpenLeft(true)}
            onCenterClick={() => setOpenCenter(true)}
            onRightClick={() => setOpenRight(true)}
            centerSize={360}
            sideSize={200}
            containerHeight={420}
          />

          {/* Left circle modal */}
          <AlertDialog open={openLeft} onOpenChange={setOpenLeft}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Qusay and his recent tie obsession? <></></AlertDialogTitle>
                <AlertDialogDescription>
                  Thanks to my instagram reel algorithm, with EsDeeKid music overlapped, I have a new found obsession with ties. 
                  <br/>
                  <strong>Fav Tie from E. Marinella</strong> Archivio collection year 1942, from Naples, Italy - is a tie that is all hand stiched and they have 0 retail stores in the entire world! 
                  <br/> 
                  <strong>Fav Tie from Hermes</strong> Crazy Poney tie, Bleu Marine (its unreleased as of yet) but it goes to show how much time I spend on their website. 


                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>close</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Center circle modal */}
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

          {/* Right circle modal */}
          <AlertDialog open={openRight} onOpenChange={setOpenRight}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Qusay and his dependence on the GoTrain</AlertDialogTitle>
                <AlertDialogDescription>
                  Since starting my new coop @ RBC Borealis in Toronto, the one thing that I dread is the commute almost everyday. I use the time to try and listen to podcasts before I node off. 
                  <br/>
                  If I had to commute to work anyhwere, it would be in <strong>new york  city </strong> - everywhere i've been in the world that city has the most special place in my heart. 
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>close</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </section>
        
        <p>click my face(s)!</p>
        <div className="flex justify-center w-full px-4">
           <div className="w-max h-max grid gap-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Qusay Q.</h2>
           </div>
        </div>
        
          <div className="flex justify-center px-4">
            <div className="w-[700px] text-left space-y-3">
            <p className="whitespace-normal break-words leading-relaxed">
              Hello, I'm Qusay based in Toronto, Canada, I am currently a Software Engineering Intern @ RBC Borealis working on building a scaleable data platform for internal consumers. 
              I am a <strong>junior</strong> Software Engineering student (minor in math) @ McMaster University with a keen interest in system design, databases, networks (specifically GPU to GPU comm) and Agentic AI. 
              Programming for me is a means to build solutions to problems in these domain and I am eager to continue to learn and <strong>build things I can take ownership for!</strong>  
              <br/>
              <br/> 
              When I am not building, I play all kinds of racquet sports, be an expressive cinephile (the departed, king of comedy, and the town are my favorites), and lose a nights sleep making latte art with my new espresso machine. 
              <br/>
              <br/> 
              Seeking SWE, DE, or AI dev opportunities for <strong>Summer 2026</strong> and <strong>Fall 2026</strong> -- reach out! 
            </p>
            </div>
          </div>

        <div className="flex justify-center w-full px-4">
          <div className="w-[100%] max-w-4xl h-max grid gap-4 scroll-mt-24">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Now</h2>
            <p className="whitespace-normal break-words leading-relaxed">
              Outside of work, I'm training for a badminton tournament, building a custom HTTP framwork from a raw TCP server, upgrading this website, and studying for my AWS certification exam! 
              Applying to jobs, listening to new music, doing interviews all the while trying to make the most of my last year of undergrad. 

            </p>
          </div>
        </div>

        <div id="experience" className="flex justify-center w-full px-4">
          <div className="w-[100%] max-w-4xl h-max grid gap-4 scroll-mt-24">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Previously</h2>
            <CardSpotlightDemo 
              title="Software Engineering @ RBC Borealis 
              Toronto, CAN
              " 
              date="Jan 2026 - Present"
              description= { 
                <>
                  Building on-premise cloud infastructure ( Lumina Data Platform ). 
                  <br/> 
                  Designed and developed an API router to connect multiple microservice endpoints using Python and FastAPI with JSON Web Token authentication and authorization 
                  for sub 1ms response time for the Auth Check of the API request, eliminating a latency bottleneck. 
                  <br/>
                  <br/>
                  <strong>Tech Stack:</strong> Python, Go, NodeJS, ReactJS, Postman, Temporal
                </>
              }
            />
            <CardSpotlightDemo 
              title="Software Engineering @ Stealth AI Startup
              San Francisco, US 
              " 
              date="June 2025 - Jan 2026"
              description= { 
                <>
                Launched a conversational agentic tool leveraging the Gemini3 flash model for a AI platform to assist in finding their dream home. 
                Using the Google ADK built agentic workflows with multiple custom agents in a SequentialAgent and ParallelAgent architecture.
                <br/> 
                Wrote Eval Sets to measure and improve overall user experieince and LLM response quality and accuracy. 
                <br/> 
                Learned how to integrate <strong>Model Context Protocol Servers</strong>, <strong>Retrieval Augmented Generation</strong>, and how to effectively edit the context window to avoid context rot. 
              
                 <br/>
                 <br/> 
                
                  <strong>Tech Stack:</strong> Python, Google Agent Development Kit, Google Cloud Platform, Google Vertex RAG Engine, PostgresSQL, Docker
                </>
              }
            />
            <CardSpotlightDemo 
              title="Software Engineering @ McMaster Exoskeleton
              Hamilton, CAN
              " 
              date="Nov 2024 - Dec 2025"
              description= { 
                <>
                  Competed @ ACE 2025 (Augmented Cognition for Exoskeletons) @ University of Michigan. As a ML & Data Engineer built a Python based Long-Short-Term-Memory 
                  deep neural network for time-series data that classified between different movement types from IMU sensors and productionzed the model using FastAPI.
                  <br/> 
                  Engineered a Extract-Transform-Load data pipeline to process and clean 10+ hours of raw sensor data to be uploaded and downloaded from AWS S3. 
                  <br/>
                  <br/>
                  <strong>Tech Stack:</strong> Python, Tensorflow, Pandas, NumPy, Apache Spark, Amazon Web Services
                </>
              }
            />
            <CardSpotlightDemo 
              title="Software Engineering @ Scotiabank
              Toronto, CAN 
              " 
              date="April 2024 - Sept 2024"
              description= { 
                <>
                Part of the velocity program, as an intern shipped an ELT data pipeline to migrate 4TB+ of legacy IBM DB2 data to GCP BigQuery.
                <br/>
                Optimized SQL queries to improve data retrieval through unclustered-indexing and break large tables into dependency-maintained sub-tables. 
                  <br/>
                  <br/>
                  <strong>Tech Stack:</strong> Python, Kafka, Google Cloud Platform, Airflow
                </>
              }
            />
          </div>
        </div>

        <div className="flex justify-center w-full px-4">
          <div className="w-[100%] max-w-4xl h-max grid gap-4 scroll-mt-24">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight"></h2>
            <AccordionTabs />
          </div>
        </div>
      </main>
      <Footer />
      
    </div>
  )
}

export default App