import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "sonner";
import { CartProvider } from "@/contexts/cart-context";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "@/components/navbar";
import type React from "react";
import { UserProvider } from "@/contexts/user-context";
import Link from "next/link";
import { Github } from "lucide-react";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "test store",
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
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <div className="w-full h-full">
              <div className="max-w-screen lg:max-w-[900px] sm:mx-8 mx-4 lg:mx-auto overflow-hidden">
                <UserProvider>
                  <Navbar />
                </UserProvider>
                <main className="mt-12 lg:mt-24">
                  <div className="container py-20 px-4 max-w-4xl md:px-0 w-full">
                    <div className="flex justify-center md:hidden items-center space-x-2">
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
                    {children}
                  </div>
                </main>
              </div>
            </div>
          </CartProvider>
        </ThemeProvider>
        <SpeedInsights />

        <Toaster position="top-center" />
      </body>
    </html>
  );
}
