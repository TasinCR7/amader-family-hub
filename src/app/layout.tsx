import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "আমাদের পরিবার | Amader Family Hub",
  description: "মরহুম আব্দুল গফুর পরিবার পোর্টাল — A premium family management hub for tasks, expenses, land records, and legacy.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@300;400;500;600;700;800&family=Hind+Siliguri:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex">
        {/* Decorative particles */}
        <div className="bg-particle" style={{ width: 300, height: 300, top: '10%', left: '5%', background: 'var(--primary)' }} />
        <div className="bg-particle" style={{ width: 200, height: 200, top: '60%', right: '10%', background: 'var(--gold)', animationDelay: '7s' }} />
        <div className="bg-particle" style={{ width: 150, height: 150, bottom: '10%', left: '50%', background: 'var(--info)', animationDelay: '14s' }} />
        {children}
      </body>
    </html>
  );
}
