import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Geckos",
  description: "dev",
};

export default function AvailabilityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}
