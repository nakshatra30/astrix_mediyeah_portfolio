import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Astrix Mediyeah — Premium Digital Agency",
    template: "%s · Astrix Mediyeah",
  },
  description:
    "Astrix Mediyeah is a premium digital agency delivering branding, web development, SEO, social media and content for ambitious brands.",
  keywords: [
    "digital agency",
    "branding agency",
    "web development",
    "SEO",
    "social media management",
    "content creation",
    "Astrix Mediyeah",
  ],
  authors: [{ name: "Astrix Mediyeah" }],
  creator: "Astrix Mediyeah",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Astrix Mediyeah",
    title: "Astrix Mediyeah — Premium Digital Agency",
    description:
      "Strategy, design and engineering fused into one senior team. Brands, websites and growth systems that make your market stop scrolling.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Astrix Mediyeah — Premium Digital Agency",
    description:
      "Strategy, design and engineering fused into one senior team. Brands, websites and growth systems built for ambitious companies.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: "#050509",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="min-h-dvh bg-ink font-sans text-zinc-300 antialiased">
        <div className="site-background" aria-hidden="true" />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-black"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
