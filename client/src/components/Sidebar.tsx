"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  ShoppingBag,
  FolderTree,
  MessageSquare,
  Users,
} from "lucide-react";

const routes = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: ShoppingBag },
  { name: "Categories", href: "/admin/categories", icon: FolderTree },
  { name: "Reviews", href: "/admin/reviews", icon: MessageSquare },
  { name: "Users", href: "/admin/users", icon: Users },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 bg-gray-800 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
      <nav className="flex-1">
        {routes.map((route) => (
          <Link key={route.href} href={route.href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start px-4 py-2 text-left",
                pathname === route.href && "bg-gray-700"
              )}
            >
              <route.icon className="mr-2 h-5 w-5" />
              {route.name}
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  );
}
