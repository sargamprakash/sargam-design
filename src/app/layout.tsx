import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { Brand } from "@/components/brand";
import { SITE } from "@/lib/site";
import "./globals.css";

const manrope = localFont({
  src: "../assets/manrope-latin-wght-normal.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});

const designContract = `<!--
THESIS: An occasional personal project directory, not a portfolio or dashboard.
OWN-WORLD: Supplied monochrome monogram, Manrope, restrained cobalt, white or true-black canvas, rounded small icon surfaces.
STORY: Recognize a project and follow its durable link. Until projects are published, show an honest finished empty state.
FIRST VIEWPORT: Compact brand header; left-aligned "My little toolkit."; Projects; centered bookmarked-tile illustration and quiet empty copy; small credit.
FORM: User-approved icon/name grid, two columns on phones and four on desktop. Direction fixed by the approved study, not a randomized concept. Native links, interaction-only icon motion, no fake entries.
-->`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.origin),
  title: {
    default: `My little toolkit | ${SITE.name}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE.name,
    title: SITE.heading,
    description: SITE.description,
    images: [
      {
        url: "/social-preview.png",
        width: 1200,
        height: 630,
        alt: `${SITE.name} - ${SITE.heading}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.heading,
    description: SITE.description,
    images: ["/social-preview.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: {
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <div hidden dangerouslySetInnerHTML={{ __html: designContract }} />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <header className="site-header">
          <div className="container">
            <Brand />
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="container">Made by Sargam.</div>
        </footer>
      </body>
    </html>
  );
}
