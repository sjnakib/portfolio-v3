import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "Shafaat Jamil Nakib - Full-stack & UI/UX Developer",
  description:
    "Portfolio of Shafaat Jamil Nakib, a full-stack developer and UI/UX designer specializing in React, Next.js, TypeScript, and creating exceptional digital experiences.",
  generator: "Next.js",
  authors: [{ name: "Shafaat Jamil Nakib" }],
  openGraph: {
    title: "Shafaat Jamil Nakib - Full-stack & UI/UX Developer",
    description: "Portfolio showcasing full-stack development and UI/UX design work",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shafaat Jamil Nakib - Full-stack & UI/UX Developer",
    description: "Portfolio showcasing full-stack development and UI/UX design work",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
