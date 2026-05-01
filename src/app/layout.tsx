import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KABDOLA | Premium Creative Agency",
  description:
    "We build brands that dominate. Narrative strategy, cinematic production, brand identity, digital experience architecture, and growth engineering — all under one roof.",
  keywords: ["creative agency", "brand strategy", "digital marketing", "production house", "design systems"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)] antialiased`}
      >
        {/* Noise overlay */}
        <div className="noise-overlay" />

        {/* Custom cursor (desktop only) */}
        <CustomCursor />

        {children}
      </body>
    </html>
  );
}
