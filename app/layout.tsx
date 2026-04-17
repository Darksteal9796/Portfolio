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

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://gautamjoshi.dev";

const SITE_DESCRIPTION =
  "LLM systems in production: RAG pipelines, fine-tuned models, voice agents. Four years of production code.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Gautam Joshi — Senior AI Full-Stack Engineer",
    template: "%s — Gautam Joshi",
  },
  description: SITE_DESCRIPTION,
  applicationName: "gautamjoshi.dev",
  authors: [{ name: "Gautam Joshi" }],
  creator: "Gautam Joshi",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "gautamjoshi.dev",
    title: "Gautam Joshi — Senior AI Full-Stack Engineer",
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gautam Joshi — Senior AI Full-Stack Engineer",
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
