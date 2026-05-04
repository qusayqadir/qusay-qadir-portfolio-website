import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { NavigationMenuDemo } from "@/components/layout/Navigation-Menu"
import Home from "@/pages/Home"
import Experience from "@/pages/Experience"
import Projects from "@/pages/Projects"

function ScrollToAnchor() {
  const { hash, pathname } = useLocation()
  useEffect(() => {
    if (!hash) return
    const id = hash.slice(1)
    const attempt = () => {
      const el = document.getElementById(id)
      if (el) { el.scrollIntoView({ behavior: "smooth" }); return true }
      return false
    }
    if (!attempt()) {
      const t = setTimeout(attempt, 120)
      return () => clearTimeout(t)
    }
  }, [hash, pathname])
  return null
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
  }, [pathname, hash])
  return null
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <ScrollToTop />
        <ScrollToAnchor />
        <header className="sticky top-4 z-50 w-full flex justify-center px-4">
          <div className="rounded-full border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg px-6 py-2">
            <NavigationMenuDemo />
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
