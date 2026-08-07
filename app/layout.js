import { Knewave, Barlow, Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";

const knewave = Knewave({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const barlow = Barlow({
  weight: ["500", "700"],
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-subhead",
  display: "swap",
});

const inter = Inter({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "Dylan Scoble — Graphic, Branding & Web Design",
  description:
    "I help businesses build visual identities and digital experiences that are impossible to ignore — from first logo to full website.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${knewave.variable} ${barlow.variable} ${barlowCondensed.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
