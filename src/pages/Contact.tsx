import { useState, type FormEvent } from "react"
import Footer from "@/components/layout/Footer"
import FadeIn from "@/components/layout/FadeIn"

export default function Contact() {
  const [name, setName]       = useState("")
  const [email, setEmail]     = useState("")
  const [message, setMessage] = useState("")

  const handleSend = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio contact from ${name}`)
    const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:qusayqadir78@gmail.com?subject=${subject}&body=${body}`
  }

  const field = "w-full rounded-xl bg-muted/60 border border-border px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-colors"

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex items-center justify-center p-8 pt-16">
        <FadeIn className="w-full max-w-lg">
          <div className="rounded-2xl border bg-card overflow-hidden shadow-sm">

            {/* top section */}
            <div className="p-8 flex flex-col gap-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold leading-snug">Get in touch</h1>
                  <p className="text-sm text-muted-foreground mt-1">Fill out the form and I'll get back to you.</p>
                </div>
                <a
                  href="https://www.linkedin.com/in/qusay-qadir/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors shrink-0 mt-0.5"
                >
                  LinkedIn
                </a>
              </div>

              <form id="contact-form" onSubmit={handleSend} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className={field}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className={field}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">Message</label>
                  <textarea
                    placeholder="What's on your mind?"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    required
                    rows={4}
                    className={`${field} resize-none`}
                  />
                </div>
              </form>
            </div>

            {/* divider */}
            <div className="border-t" />

            {/* bottom section */}
            <div className="p-6 flex flex-col gap-3">
              <button
                type="submit"
                form="contact-form"
                className="w-full rounded-xl bg-foreground text-background py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Send message
              </button>
              <a
                href="https://github.com/qusayqadir"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-xl border py-3 text-sm font-semibold text-center hover:bg-muted transition-colors"
              >
                GitHub
              </a>
            </div>

          </div>
        </FadeIn>
      </main>
      <Footer />
    </div>
  )
}
