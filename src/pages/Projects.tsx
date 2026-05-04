import { useState } from "react"
import { GitHubCalendar } from "react-github-calendar"
import Footer from "@/components/layout/Footer"
import FadeIn from "@/components/layout/FadeIn"
import { ExternalLink, Github } from "lucide-react"

const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons"
const SI = "https://cdn.simpleicons.org"

const TECH_ICONS: Record<string, string> = {
  "Python":                 `${DI}/python/python-original.svg`,
  "Java":                 `${DI}/java/java-original.svg`,
  "FastAPI":                `${DI}/fastapi/fastapi-original.svg`,
  "Go":                     `${DI}/go/go-original.svg`,
  "GCP":                    `${DI}/googlecloud/googlecloud-original.svg`,
  "Google Cloud Platform":  `${DI}/googlecloud/googlecloud-original.svg`,
  "Vertex RAG":             `${DI}/googlecloud/googlecloud-original.svg`,
  "PostgreSQL":             `${DI}/postgresql/postgresql-original.svg`,
  "PostgresSQL":            `${DI}/postgresql/postgresql-original.svg`,
  "Docker":                 `${DI}/docker/docker-original.svg`,
  "TensorFlow":             `${DI}/tensorflow/tensorflow-original.svg`,
  "Pandas":                 `${DI}/pandas/pandas-original.svg`,
  "NumPy":                  `${DI}/numpy/numpy-original.svg`,
  "React":                  `${DI}/react/react-original.svg`,
  "TypeScript":             `${DI}/typescript/typescript-original.svg`,
  "Vite":                   `${DI}/vitejs/vitejs-original.svg`,
  "Tailwind":               `${DI}/tailwindcss/tailwindcss-original.svg`,
  "tailwindcss":            `${DI}/tailwindcss/tailwindcss-original.svg`,
  "Redis":                  `${DI}/redis/redis-original.svg`,
  "MongoDB":                `${DI}/mongodb/mongodb-original.svg`,
  "MySQL":                  `${DI}/mysql/mysql-original.svg`,
  "Postman":                `${SI}/postman`,
  "Kafka":                  `${SI}/apachekafka`,
  "Apache Spark":           `${SI}/apachespark`,
  "BigQuery":               `${SI}/googlebigquery`,
  "Airflow":                `${SI}/apacheairflow`,
  "AWS S3":                 `${SI}/amazons3`,
  "Amazon Web Services":    `${SI}/amazonaws`,
  "RedHat OpenShift":       `${SI}/redhatopenshift`,
  "Google ADK":             `${SI}/google`,
  "shadcn/ui":              `${SI}/shadcnui`,
}

function TechBadge({ tag }: { tag: string }) {
  const iconUrl = TECH_ICONS[tag]
  return (
    <span className="flex items-center gap-1.5 text-[11px] font-mono tracking-wide px-2.5 py-1 rounded-full bg-muted text-muted-foreground border">
      {iconUrl && (
        <img src={iconUrl} alt={tag} className="w-3.5 h-3.5" />
      )}
      {tag}
    </span>
  )
}

const PROJECTS = [
  {
    title: "Formula-1 Bloomberg Terminal",
    description:
      "A centralized data platform for F1 enthusiasts that is data dense and LLM enabled to provide critical insights with dashboard features, and custom analytics graphs",
    tags: ["Python", "PostgreSQL", "MongoDB"],
    github: "https://github.com/qusayqadir",
    link: null,
    wip: true,
    // drop screenshot at public/images/http-framework.png
    image: "/images/http-framework.png",
  },
  {
    title: "Custom HTTP Framework",
    description:
      "Building an HTTP framework from scratch on top of a raw TCP server — no frameworks, no abstractions. An exercise in understanding the full request/response lifecycle at the protocol level.",
    tags: ["Go", "TCP", "HTTP", "Systems"],
    github: "https://github.com/qusayqadir",
    link: null,
    wip: true,
    // drop screenshot at public/images/http-framework.png
    image: "/images/http-framework.png",
  },
  {
    title: "Qusay Portfolio Website",
    description:
      "Personal portfolio built with React 19, TypeScript, and Tailwind CSS v4 — designed to be clean, interactive, and fast.",
    tags: ["TypeScript", "React", "Tailwind"],
    github: "https://github.com/qusayqadir",
    link: null,
    wip: true,
    // drop screenshot at public/images/http-framework.png
    image: "/images/http-framework.png",
  },
  {
    title: "Autonomous Rescue Drone",
    description:
      "Autonomous drone navigation system built in Java — implements an exploration command center that scouts an island map, locates points of interest, and returns mission data for a rescue simulation.",
    tags: ["Java"],
    github: "https://github.com/qusayqadir",
    link: null,
    wip: true,
    // drop screenshot at public/images/http-framework.png
    image: "/images/http-framework.png",
  },
  {
    title: "Object Oriented Principles Based - Snake Game",
    description:
      "",
    tags: ["C" ,"C++"],
    github: "https://github.com/qusayqadir",
    link: null,
    wip: true,
    // drop screenshot at public/images/http-framework.png
    image: "/images/http-framework.png",
  },
]

export default function Projects() {
  const [query, setQuery] = useState("")
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({})

  const filtered = PROJECTS.filter((p) => {
    const q = query.toLowerCase()
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    )
  })

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center gap-12 p-8 pt-16 max-w-4xl mx-auto w-full">

        <FadeIn className="w-full">
          <p className="text-xs font-mono tracking-widest uppercase text-muted-foreground mb-2">Built & shipped</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-10">Projects</h1>

          <div className="flex flex-col gap-3 mb-2">
            <p className="text-xs font-mono tracking-widest uppercase text-muted-foreground">GitHub Contributions</p>
            <div className="overflow-x-auto">
              <GitHubCalendar
                username="qusayqadir"
                colorScheme="light"
                fontSize={12}
                blockSize={13}
                blockMargin={4}
              />
            </div>
          </div>
        </FadeIn>

        <FadeIn className="w-full flex flex-col items-center">
          {/* Search */}
          <div className="relative mb-8 w-full max-w-xl">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              width="15" height="15" viewBox="0 0 15 15" fill="none"
            >
              <path d="M10 6.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-.691 3.516a4.5 4.5 0 1 1 .707-.707l2.838 2.837a.5.5 0 0 1-.708.708L9.31 10.016Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
            </svg>
            <input
              type="text"
              placeholder="Search a project, technology, etc."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Project cards */}
          <div className="grid grid-cols-1 gap-6 w-full max-w-xl">
            {filtered.map((project) => {
              const imgFailed = imgErrors[project.title]
              return (
                <div
                  key={project.title}
                  className="group flex flex-col rounded-lg border bg-card overflow-hidden hover:shadow-md hover:scale-[1.01] transition-all duration-200"
                >
                  {/* square image / fallback tag band */}
                  <div className="w-full aspect-[2/1] overflow-hidden bg-muted relative">
                    {!imgFailed ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onError={() => setImgErrors(prev => ({ ...prev, [project.title]: true }))}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <p className="text-xs font-mono tracking-widest uppercase text-muted-foreground">No preview</p>
                      </div>
                    )}
                    {project.wip && (
                      <span className="absolute top-3 left-3 text-[10px] font-mono tracking-wide px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 border border-yellow-300">
                        Preview: Changes Revealed Soon
                      </span>
                    )}
                  </div>

                  {/* card body */}
                  <div className="flex flex-col gap-3 p-5 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-base leading-snug">{project.title}</h3>
                      <div className="flex items-center gap-3 shrink-0 mt-0.5">
                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors">
                          <Github size={15} />
                        </a>
                        {project.link ? (
                          <a href={project.link} target="_blank" rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors">
                            <ExternalLink size={14} />
                          </a>
                        ) : (
                          <ExternalLink size={14} className="text-muted-foreground/30" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                    {/* tags always visible below description */}
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {project.tags.map((tag) => (
                        <TechBadge key={tag} tag={tag} />
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </FadeIn>
      </main>
      <Footer />
    </div>
  )
}
