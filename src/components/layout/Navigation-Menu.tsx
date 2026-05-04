"use client"

import { Link, useLocation } from "react-router-dom"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import resumePdf from "@/assets/Qusay_Qadir_McMasterUniversity_DataPlatformEngineer.pdf"
import { ModeToggle } from "../ui/mode-toggle"
import { cn } from "@/lib/utils"

export function NavigationMenuDemo() {
  const isMobile = useIsMobile()
  const { pathname } = useLocation()

  const linkClass = (path: string) =>
    cn(
      navigationMenuTriggerStyle(),
      pathname === path
        ? "font-semibold text-foreground underline underline-offset-4 decoration-1"
        : "text-muted-foreground"
    )

  return (
    <NavigationMenu viewport={isMobile}>
      <NavigationMenuList className="flex-wrap">

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={linkClass("/")}>
            <Link to="/">Qusay</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={linkClass("/experience")}>
            <Link to="/experience">Experience</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={linkClass("/projects")}>
            <Link to="/projects">Projects</Link>
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
