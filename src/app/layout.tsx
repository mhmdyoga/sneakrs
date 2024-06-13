"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster"
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showHeader = pathname === "/auth/sign-in" || pathname === "/auth/sign-up"? false : true;

  return (
    <html lang="en">
      <title>Sneakers.co</title>
      <body className={inter.className}>
        {showHeader && 
          <Navbar/>
        }
        {children}
        <Toaster />
        <Footer/>
        </body>
    </html>
  );
}
