"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Providers } from "./providers";
import { usePathname } from "next/navigation";
import AUTHCOMP from "@/Containers/AuthModal/page";
import { Toaster } from "react-hot-toast";
import { NavBottom } from "@/components/NavBottom";
import { MdOutlineWindow } from "react-icons/md";
import {
  FramerModal,
  ModalContent,
} from "@/components/client-coponent/serviceDrawer";
import { useState } from "react";
// import { useCheckAuth } from "./checkauth/checkauth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [modalOpen, setModalOpen] = useState(false);

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
            <>
              <AUTHCOMP type="USER" />
              <FramerModal open={modalOpen} setOpen={setModalOpen}>
              <ModalContent>
                <div>
                  services
                </div>
              </ModalContent>
            </FramerModal>
              <div className="md:hidden fixed left-[43%]  bottom-10 z-50 ">
                <div
                  data-tooltip-target="tooltip-new"
                  className=" inline-flex items-center justify-center w-14 h-14 font-medium bg-primary-content  rounded-full focus:ring-4 focus:ring-blue-300 focus:outline-none"
                  onClick={() => setModalOpen(true)}
                >
                  <MdOutlineWindow className="text-2xl" />
                </div>
              </div>
              <NavBottom />
            </>
          )}
        </body>
      </Providers>
    </html>
  );
}
