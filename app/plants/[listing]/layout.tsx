import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({ params }) {

  return {
    title: params,
    desc: "chicken"
  }
}

export default function PlantsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}
