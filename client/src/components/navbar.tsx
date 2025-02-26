"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import CartButton from "@/components/cart-button";
import { useUser } from "@/contexts/user-context";
import { useCallback, useEffect, useState } from "react";
import { Github } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { user, logout, isLoading } = useUser();
  const [userInfo, setUserInfo] = useState(() => {
    if (typeof window !== "undefined") {
      const userItem = localStorage.getItem("user");
      return userItem ? JSON.parse(userItem) : user;
    }
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, forceRender] = useState(false);
  const handleLogout = useCallback(async () => {
    try {
      setUserInfo(null);
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  }, [logout]);
  const pathname = usePathname();
  useEffect(() => {
    if (pathname.includes("/admin")) {
      forceRender((prev) => !prev); // Force re-render when user updates
      if (typeof window !== "undefined") {
        const userItem = localStorage.getItem("user");
        if (userItem !== null) {
          setUserInfo(JSON.parse(userItem));
        }
      }
    }
  }, [pathname]);

  return (
    <nav className="backdrop-blur bg-background/50 lg:max-w-[900px] sm:mx-8 mx-4 lg:mx-auto shadow-sm z-50 m-4 border rounded-xl mb-0 border-muted-accent/40 fixed top-0 left-0 right-0">
      <div className="flex flex-row items-center justify-between px-4 py-2 z-100">
        <div className="flex items-center space-x-2">
          <Link href="/">Test Store</Link>
        </div>
        <div className="flex max-md:hidden items-center space-x-2">
          <Link
            target="_blank"
            href="https://github.com/Mahdi1bogh/interview-test"
            className="flex items-center hover:text-gray-500 underline p-2 border-2 rounded-lg"
          >
            <Github className="mr-1 h-3 w-3" />
            <span>frontend</span>
          </Link>
          <Link
            target="_blank"
            href="https://github.com/Mahdi1bogh/interview-backend"
            className="flex items-center hover:text-gray-500 underline p-2 border-2 rounded-lg"
          >
            <Github className="mr-1 h-3 w-3" />
            <span>backend</span>
          </Link>
        </div>
        <div className="space-x-4 z-1000 ">
          <div className="flex items-center gap-x-2">
            <ThemeSwitcher />

            {isLoading ? (
              <span>Loading...</span>
            ) : userInfo ? (
              <>
                <Button asChild variant="ghost">
                  <Link href="/admin">Admin</Link>
                </Button>
                <Button onClick={handleLogout} variant="ghost">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )}

            <CartButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
