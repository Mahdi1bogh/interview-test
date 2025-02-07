"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

// const components: { title: string; href: string; description: string }[] = [
//   {
//     title: "All job postings",
//     href: "/jobs",
//     description: "Browse all available job postings.",
//   },
//   {
//     title: "Internships",
//     href: "/docs/primitives/hover-card",
//     description: "Discover internships that match your skills and interests.",
//   },
//   {
//     title: "Data scientists",
//     href: "/docs/primitives/progress",
//     description: "Browse data scientists that match your skills and interests.",
//   },
//   {
//     title: "Remote jobs",
//     href: "/docs/primitives/tooltip",
//     description: "Discover remote jobs that match your skills and interests.",
//   },
//   {
//     title: "Designers",
//     href: "/docs/primitives/scroll-area",
//     description: "Check where your next craft attempt should be.",
//   },
//   {
//     title: "Mobile developers",
//     href: "/docs/primitives/tabs",
//     description:
//       "Browse mobile developers that match your skills and interests.",
//   },
//   {
//     title: "Entry Level",
//     href: "/docs/primitives/tabs",
//     description:
//       "Browse entry level developers that match your skills and interests.",
//   },
// ];

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">
            Getting started
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-green-500/50 to-green-500/30 p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Sharefolio
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Share your portfolio with the world for recruiters and
                      teams to find you.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem
                href="/protected/on-boarding"
                title="Create your portfolio"
              >
                Create your portfolio and share it with recruiters.
              </ListItem>
              <ListItem href="/docs/installation" title="For recruiters">
                How can sharefolio help you find the best talents for your team?
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-transparent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
