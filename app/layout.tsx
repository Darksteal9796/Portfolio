import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { CommandPalette } from "@/components/CommandPalette";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getAllCaseStudies } from "@/lib/case-studies";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gautam Joshi — Senior AI Full-Stack Engineer",
  description:
    "LLM systems in production: RAG pipelines, fine-tuned models, voice agents. Four years of production code.",
};

// Runs before hydration to prevent a flash of the wrong theme.
// Matches the precedence used in ThemeProvider: localStorage > prefers-color-scheme.
const themeInitScript = `(function(){try{var s=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(s==='dark'||(!s&&m)){document.documentElement.classList.add('dark');}}catch(e){document.documentElement.classList.add('dark');}})();`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const studies = await getAllCaseStudies();
  const paletteCaseStudies = studies.map((s) => ({
    slug: s.frontmatter.slug,
    title: s.frontmatter.title,
  }));

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <ThemeProvider>
          <TooltipProvider>
            {children}
            <CommandPalette caseStudies={paletteCaseStudies} />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
