import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Plants",
  description: "dev",
};

export default function PlantsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}
