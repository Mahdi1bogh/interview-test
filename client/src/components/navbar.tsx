"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import CartButton from "@/components/cart-button";
import { useUser } from "@/contexts/user-context";
import { useCallback } from "react";

export default function Navbar() {
  const { user, logout, isLoading } = useUser();

  const handleLogout = useCallback(async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  }, [logout]);

  return (
    <nav className="backdrop-blur bg-background/50 lg:max-w-[900px] sm:mx-8 mx-4 lg:mx-auto shadow-sm z-50 m-4 border rounded-xl mb-0 border-muted-accent/40 fixed top-0 left-0 right-0">
      <div className="flex flex-row justify-between px-4 py-2 z-100">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <Image
              src="https://media.licdn.com/dms/image/v2/D4D0BAQFYDZFOuXPAOA/company-logo_100_100/company-logo_100_100/0/1738788906242/4_ventures_logo?e=1747267200&v=beta&t=tmp8v40aXXXq9EAUG4LYeAIa3JTkM4ohjHP96IRBCuc"
              alt="logo"
              width={32}
              height={32}
              className="max-md:hidden"
            />
            <span className="text-sm font-[family-name:var(--font-geist-mono)]">
              4+Ventures store
            </span>
          </Link>
        </div>
        <div className="space-x-4 z-1000 ml-auto">
          <div className="flex items-center gap-x-2">
            <ThemeSwitcher />

            {!isLoading && (
              <>
                {user ? (
                  <>
                    <Button
                      asChild
                      variant="ghost"
                      className="w-fit bg-transparent"
                    >
                      <Link href="/admin">Admin</Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-fit bg-transparent"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      asChild
                      variant="ghost"
                      className="w-fit bg-transparent"
                    >
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button
                      asChild
                      variant="ghost"
                      className="w-fit bg-transparent"
                    >
                      <Link href="/register">Register</Link>
                    </Button>
                  </>
                )}
              </>
            )}
            <CartButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
