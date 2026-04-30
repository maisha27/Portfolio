import type { Metadata } from "next";
import { Playfair_Display, EB_Garamond, Geist_Mono, Lora } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maisha Nanjeeba — Full Stack Developer & UI/UX Designer",
  description:
    "Portfolio of Maisha Nanjeeba. I design and build full-stack web and mobile applications with a strong focus on user experience, real-world problem solving, and clean, scalable systems.",
  keywords: ["Full Stack Developer", "UI/UX Designer", "React", "Next.js", "TypeScript", "Mobile Apps"],
  authors: [{ name: "Maisha Nanjeeba" }],
  openGraph: {
    title: "Maisha Nanjeeba — Full Stack Developer & UI/UX Designer",
    description: "I design and build full-stack web and mobile applications with a strong focus on user experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${ebGaramond.variable} ${geistMono.variable} ${lora.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* SVG filter for paper grain — body::before in globals.css references #paper-grain */}
        <svg
          aria-hidden="true"
          style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
        >
          <defs>
            <filter
              id="paper-grain"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              colorInterpolationFilters="sRGB"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65"
                numOctaves={3}
                stitchTiles="stitch"
                result="noise"
              />
              <feColorMatrix type="saturate" values="0" in="noise" />
            </filter>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}
