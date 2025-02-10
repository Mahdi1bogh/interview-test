import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "sonner";
import { CartProvider } from "@/contexts/cart-context";

import { UserProvider } from "@/contexts/user-context";
import Navbar from "@/components/navbar";
import type React from "react";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "4+Ventures store",
  description: "Best ecommerce store in the world",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="dark:bg-background bg-muted text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>
            <CartProvider>
              <div className="w-full h-full">
                <div className="max-w-screen lg:max-w-[900px] sm:mx-8 mx-4 lg:mx-auto overflow-hidden">
                  <Navbar />
                  <main className="mt-12 lg:mt-24">
                    <div className="container py-20 px-4 max-w-4xl md:px-0 w-full">
                      {children}
                    </div>
                  </main>
                </div>
              </div>
            </CartProvider>
          </UserProvider>
        </ThemeProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
