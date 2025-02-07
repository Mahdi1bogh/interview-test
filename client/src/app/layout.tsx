import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "sonner";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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
          <div className="w-full h-full">
            <div className="max-w-screen lg:max-w-[900px] sm:mx-8 mx-4 lg:mx-auto overflow-hidden">
              <nav className="backdrop-blur bg-background/50 lg:max-w-[900px] sm:mx-8 mx-4 lg:mx-auto shadow-sm z-50 m-4 border rounded-xl mb-0 border-muted-accent/40 fixed top-0 left-0 right-0">
                <div className="flex flex-row justify-between px-4 py-2 z-100">
                  <div className="flex items-center space-x-2">
                    <Link href="/">
                      <Image
                        src="https://media.licdn.com/dms/image/v2/D4D0BAQFYDZFOuXPAOA/company-logo_100_100/company-logo_100_100/0/1738788906242/4_ventures_logo?e=1747267200&v=beta&t=tmp8v40aXXXq9EAUG4LYeAIa3JTkM4ohjHP96IRBCuc"
                        alt="logo"
                        width={32}
                        height={32}
                      />
                    </Link>
                    <span className="text-sm font-[family-name:var(--font-geist-mono)]">
                      4+Ventures store
                    </span>
                  </div>
                  <div className="hidden md:block space-x-4 z-1000 ml-auto">
                    <div className="flex items-center gap-x-2">
                      <ThemeSwitcher />
                      <Button
                        asChild
                        variant={"ghost"}
                        className="w-fit bg-transparent"
                      >
                        <Link href="/create">Create product</Link>
                      </Button>
                      <Button
                        asChild
                        variant={"ghost"}
                        className="w-fit bg-transparent"
                      >
                        <Link href="/">Products</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </nav>
              <main className="mt-12 lg:mt-24">
                <div className="container py-20 px-4 max-w-4xl md:px-0 w-full">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </ThemeProvider>
        <Toaster position="top-center" />{" "}
      </body>
    </html>
  );
}
