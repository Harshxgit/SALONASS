"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Providers } from "./providers";
import { usePathname } from "next/navigation";
import AUTHCOMP from "@/Containers/AuthModal/page";
import { Toaster } from "react-hot-toast";
import { NavBottom } from "@/components/NavBottom";
// import { useCheckAuth } from "./checkauth/checkauth";

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
        <body className={`antialiased`}>
          <Toaster position="top-center" />
          {!pathname.includes("/admin") && !pathname.includes("/staff") && (
            <Navbar />
          )}
          {children}

          {!pathname.includes("/admin") && !pathname.includes("/staff") && (
            <AUTHCOMP type="USER" />
          )}
            <NavBottom/>
        </body>
      </Providers>
    </html>
  );
}
