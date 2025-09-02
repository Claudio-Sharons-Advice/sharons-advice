"use client";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { useEffect } from "react";
import posthog from "posthog-js";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Note: metadata export removed since this is now a client component
// You can add these meta tags directly in the head section below

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (key) {
      posthog.init(key, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
        capture_pageview: true,
        capture_pageleave: true,
      });
    }
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Sharon&apos;s Advice</title>
        <meta name="description" content="Compassionate, practical funeral guidance for Vancouverites." />
        <meta name="robots" content="noindex, nofollow, noarchive" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-neutral-50 text-neutral-900 antialiased`}
      >
        <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/90 backdrop-blur print:hidden">
          <nav className="mx-auto flex max-w-5xl items-center justify-between p-4">
            <Link href="/" className="font-semibold text-neutral-900">Sharon&apos;s Advice</Link>
            <div className="space-x-4">
              <Link href="/guides" className="text-neutral-700 hover:text-neutral-900">Guides</Link>
              <Link href="/chat" className="text-neutral-700 hover:text-neutral-900">Chat</Link>
            </div>
          </nav>
        </header>

        <main className="mx-auto max-w-5xl p-6 lg:p-10">{children}</main>
      </body>
    </html>
  );
}