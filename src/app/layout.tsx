import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Akarati — Assigned Properties",
  description: "Akarati Collections — Assigned Properties proposal screen",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
