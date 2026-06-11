import { CardSpotlightDemo } from "@/components/layout/Animated-Hover-Cover"
import Footer from "@/components/layout/Footer"
import FadeIn from "@/components/layout/FadeIn"
import AccordionTabs from "@/components/shadcn-studio/accordion/accordion-11"

export default function Experience() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center gap-6 p-8 pt-16 max-w-4xl mx-auto w-full">
        <FadeIn className="w-full">
          <p className="text-xs font-mono tracking-widest uppercase text-muted-foreground mb-2">Work History</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-10">Previously</h1>
          <div className="flex flex-col gap-6">
            <CardSpotlightDemo
              role="Software Engineer, Backend"
              company="RBC Borealis"
              location="Toronto, CAN"
              date="Jan 2026 – Present"
              description={
                <>
                  Building on-premise cloud infrastructure ( Lumina Data Platform ).
                  <br></br>
                  Designed and developed an API router to connect multiple microservice endpoints using Python and FastAPI with JSON Web Token authentication and authorization
                  for sub 1ms response time for the Auth Check of the API request, eliminating a latency bottleneck.
                  <br/><br/>
                  <strong>Tech Stack:</strong> Python, Go, Claude Code, Windsurf, Postman, Temporal, DBeaver, RedHat OpenShift
                </>
              }
            />
            <CardSpotlightDemo
              role="Software Engineer, Backend"
              company="Stealth AI Startup (Ex-Meta, Google, Databricks)"
              location="San Francisco, US"
              date="Jun 2025 – Jan 2026"
              description={
                <>
                  Launched a conversational agentic home-search tool on a real estate AI platform, powering end-to-end property discovery using the Gemini Flash model.
                  <br/>
                  Designed agentic workflows with custom SequentialAgent and ParallelAgent pipelines via Google ADK, integrating <strong>MCP servers</strong> and a <strong>Vertex RAG Engine</strong> for grounded, context-aware responses.
                  <br/>
                  Built and ran Eval Sets to benchmark LLM response quality and accuracy, driving measurable improvements to overall user experience.
                  <br/><br/>
                  <strong>Tech Stack:</strong> Python, Google Agent Development Kit, Google Cloud Platform, Google Vertex RAG Engine, PostgreSQL, Docker
                </>
              }
            />
            <CardSpotlightDemo
              role="Software Engineer, ML & AI"
              company="McMaster Exoskeleton"
              location="Hamilton, CAN"
              date="Nov 2024 – Dec 2025"
              description={
                <>
                  Competed @ ACE 2025 (Augmented Cognition for Exoskeletons) @ University of Michigan. As a ML & Data Engineer built a Python based Long-Short-Term-Memory
                  deep neural network for time-series data that classified between different movement types from IMU sensors and productionized the model using FastAPI.
                  <br/>
                  Engineered a Extract-Transform-Load data pipeline to process and clean 10+ hours of raw sensor data to be uploaded and downloaded from AWS S3.
                  <br/><br/>
                  <strong>Tech Stack:</strong> Python, Tensorflow, Pandas, NumPy, Apache Spark, Amazon Web Services
                </>
              }
            />
            <CardSpotlightDemo
              role="Software Engineer, Data"
              company="Scotiabank"
              location="Toronto, CAN"
              date="Apr 2024 – Sep 2024"
              description={
                <>
                  Part of the velocity program, as an intern shipped an ELT data pipeline to migrate 4TB+ of legacy IBM DB2 data to GCP BigQuery.
                  <br/>
                  Optimized SQL queries to improve data retrieval through unclustered-indexing and break large tables into dependency-maintained sub-tables.
                  <br/><br/>
                  <strong>Tech Stack:</strong> Python, Kafka, Google Cloud Platform, Airflow
                </>
              }
            />
          </div>
        </FadeIn>

        <FadeIn className="w-full mt-4">
          <p className="text-xs font-mono tracking-widest uppercase text-muted-foreground mb-4">Skills</p>
          <AccordionTabs />
        </FadeIn>
      </main>
      <Footer />
    </div>
  )
}
