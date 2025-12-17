import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tulungagung Music School - Sistem Manajemen Jadwal Les Musik",
  description: "Aplikasi untuk mengelola jadwal les musik di Tulungagung Music School",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}>
        <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-950 dark:to-indigo-950 flex flex-col pt-16 md:pt-20 overflow-x-hidden">
          <Header />
          
          <main className="flex-1 flex items-start justify-center pb-32 md:pb-40">
            <div className="w-full max-w-7xl mx-auto pl-4 pr-8 sm:pl-6 sm:pr-12 lg:pl-8 lg:pr-16 pt-16 md:pt-20">
              {children}
            </div>
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
