import type { Metadata } from "next";
import { Yeseva_One, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const yeseva = Yeseva_One({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Рандомайзер",
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
      className={`${yeseva.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a1628] text-[#faf8f3] font-body overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
