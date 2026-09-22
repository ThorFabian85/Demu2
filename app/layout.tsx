import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "DEMU2 — Infinite Regress and the Possibility of New Energy",
  description: "Explore Thor Fabian Pettersen’s philosophical investigation of timeless motion, explanatory closure, consciousness, and entropy reset. Read the complete 25-chapter thesis.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
