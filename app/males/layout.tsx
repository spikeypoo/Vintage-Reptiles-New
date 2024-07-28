import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Males",
  description: "dev",
};

export default function MalesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}
