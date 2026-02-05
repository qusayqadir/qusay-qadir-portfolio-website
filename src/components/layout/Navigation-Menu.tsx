"use client"
// import Link from "next/link"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import resumePdf from "@/assets/Qusay_Qadir_McMasterUniversity_DataPlatformEngineer.pdf"

export function NavigationMenuDemo() {
  const isMobile = useIsMobile()

  return (
    <NavigationMenu viewport={isMobile}>
      <NavigationMenuList className="flex-wrap">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <a href="#about-me">About Me</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <a href="#experience">Experience</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {/* <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>List</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <a href="#">
                    <div className="font-medium">Components</div>
                    <div className="text-muted-foreground">
                      Browse all components in the library.
                    </div>
                  </a>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <a href="#">
                    <div className="font-medium">Documentation</div>
                    <div className="text-muted-foreground">
                      Learn how to use the library.
                    </div>
                  </a>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <a href="#">
                    <div className="font-medium">Blog</div>
                    <div className="text-muted-foreground">
                      Read our latest blog posts.
                    </div>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem> */}
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>Socials & Connect</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <a href="https://www.linkedin.com/in/qusay-qadir/" target = "_blank" rel="noopener noreferrer">LinkedIn</a>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <a href="https://github.com/qusayqadir" target="_blank" rel="noopener noreferrer">Github</a>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <a href="https://www.instagram.com/qusay.qadir/" target="_blank" rel="noopener noreferrer">Instagram</a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* Resume: opens PDF in a new tab */}
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <a href={resumePdf} target="_blank" rel="noopener noreferrer">Resume</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
// (Optional) list rendering helpers removed as unused
