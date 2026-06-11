"use client"

import { useEffect, useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import resumePdf from "@/assets/Qusay_Qadir_Intern_BackendSWE_2026.pdf"
import { ModeToggle } from "../ui/mode-toggle"
import { cn } from "@/lib/utils"

const SECTIONS = ['about', 'experience', 'projects', 'contact']

export function NavigationMenuDemo() {
  const isMobile = useIsMobile()
  const [active, setActive] = useState('about')

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    SECTIONS.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-40% 0px -40% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  const scrollTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const linkClass = (section: string) =>
    cn(
      navigationMenuTriggerStyle(),
      active === section
        ? "font-semibold text-foreground underline underline-offset-4 decoration-1"
        : "text-muted-foreground"
    )

  return (
    <NavigationMenu viewport={isMobile}>
      <NavigationMenuList className="flex-wrap">

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={linkClass('about')}>
            <a href="#about" onClick={scrollTo('about')}>Qusay</a>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={linkClass('experience')}>
            <a href="#experience" onClick={scrollTo('experience')}>Experience</a>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={linkClass('projects')}>
            <a href="#projects" onClick={scrollTo('projects')}>Projects</a>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={linkClass('contact')}>
            <a href="#contact" onClick={scrollTo('contact')}>Contact</a>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <a href={resumePdf} target="_blank" rel="noopener noreferrer">Resume</a>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <ModeToggle />
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  )
}
