"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Providers } from "./providers";
import { usePathname } from "next/navigation";
import AUTHCOMP from "@/Containers/AuthModal/page";
<<<<<<< HEAD
const geistSans = Geist({
  variable: "--font-geist-sans",
=======
// import { useCheckAuth } from "./checkauth/checkauth";
import { useSession } from "next-auth/react";
const geistSans = Geist({  variable: "--font-geist-sans",
>>>>>>> 9225931
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  // const { showAuthModal } = useCheckAuth(["client"]);
 
  return (
    <html lang="en">
      <Providers>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {!pathname.includes("/admin") && !pathname.includes("/staff") && (
            <Navbar />
          )}
          {children}
<<<<<<< HEAD
          {/* <Authmodal /> */}
          <AUTHCOMP/>
=======

          <AUTHCOMP mode="" />
>>>>>>> 9225931
        </body>
      </Providers>
    </html>
  );
}
