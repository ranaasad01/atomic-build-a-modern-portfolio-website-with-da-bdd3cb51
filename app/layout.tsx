import type { Metadata } from "next";

import { Inter, Syne } from "next/font/google";

import "./globals.css";

import Navbar from "@/components/Navbar";

import Footer from "@/components/Footer";

import AtomicLangToggle from "@/components/AtomicLangToggle"



const inter = Inter({

  subsets: ["latin"],

  variable: "--font-inter",

  display: "swap",

});



const syne = Syne({

  subsets: ["latin"],

  variable: "--font-syne",

  display: "swap",

});



export const metadata: Metadata = {

  formatDetection: { telephone: false, date: false, email: false, address: false },

  title: "ASad Rana — Creative Developer",

  description:

    "Full-stack developer and creative technologist crafting immersive digital experiences. Specializing in React, Next.js, and modern web architecture.",

  keywords: ["developer", "portfolio", "full-stack", "React", "Next.js", "creative"],

  authors: [{ name: "ASad Rana" }],

  openGraph: {

    title: "ASad Rana — Creative Developer",

    description: "Full-stack developer crafting immersive digital experiences.",

    type: "website",

  },

};



export default function RootLayout({

  children,

}: {

  children: React.ReactNode;

}) {

  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable}`}
      data-atomic-id="a14ww207">
      <body
        className="bg-[#0f0f0f] text-white antialiased font-sans selection:bg-purple-500/30 selection:text-purple-200"
        data-atomic-id="a1ri5537">

        <Navbar />

        <main
          data-atomic-id="a1vhymfz"
          style={{
            color: "#a855f7"
          }}>{children}</main>

        <Footer />

            <AtomicLangToggle />

    </body>
    </html>
  );

}

