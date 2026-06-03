import { Analytics } from "@vercel/analytics/react"
import Home from "@/pages/Home"
import { ModeToggle } from "@/components/ui/mode-toggle"

function App() {
  return (
    <>
      <style>{`
        .theme-toggle-btn {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 8px !important;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.2s ease;
        }
        .theme-toggle-btn:hover {
          opacity: 0.7;
        }
        .theme-toggle-btn svg {
          color: #24adbc;
        }
      `}</style>
      <div style={{ position: 'fixed', top: '1rem', left: '1rem', zIndex: 1000 }}>
        <ModeToggle />
      </div>
      <Home />
      <Analytics />
    </>
  )
}

export default App
