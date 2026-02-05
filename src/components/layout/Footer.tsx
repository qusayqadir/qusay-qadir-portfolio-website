import ButtonIconHoverDemo from '@/components/ui/button-04'
import { Linkedin, Github } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="relative border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full min-h-20 py-6">
      {/* Bottom-left button */}
      <div className="absolute left-4 bottom-4">
        <ButtonIconHoverDemo />
      </div>
      {/* Bottom-right: LinkedIn & GitHub icons */}
      <div className="absolute right-4 bottom-4 flex items-center gap-3">
      <a
          href="https://github.com/qusayqadir"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
          className="text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
        >
          <Github className="w-6 h-6" />
        </a>
        <a
          href="https://www.linkedin.com/in/qusay-qadir/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
          className="text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
        >
          <Linkedin className="w-6 h-6" />
        </a>
      </div>

    </footer>
  )
}

export default Footer
