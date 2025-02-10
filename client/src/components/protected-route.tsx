"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/user-context";
import type React from "react";
import Link from "next/link";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !user) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router, user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (user && !user.roles.includes("admin")) {
    return (
      <div>
        You are not an admin
        <Link className="underline ml-2 text-red-400" href="/">
          Go Home
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
