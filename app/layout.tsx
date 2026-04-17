import type { Metadata } from "next";
import { Russo_One, Rajdhani, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const russo = Russo_One({
  weight: "400",
  variable: "--font-display-family",
  subsets: ["latin", "cyrillic"],
});

const rajdhani = Rajdhani({
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  weight: ["400", "700"],
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "РАНДОМАЙЗЕР",
  description: "Пусть удача решит за вас",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${russo.variable} ${rajdhani.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050508] text-[#d1d5db] font-body overflow-x-hidden">
        {/* Scanlines overlay */}
        <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.04] scanlines" />
        {/* Vignette */}
        <div className="pointer-events-none fixed inset-0 z-40 bg-radial-vignette" />
        {children}
      </body>
    </html>
  );
}
