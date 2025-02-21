"use client";
import React from "react";
import { MdOutlineWindow } from "react-icons/md";
import { TiHome } from "react-icons/ti";
import { FaShoppingCart } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { ModalContent, FramerModal } from "./client-coponent/serviceDrawer";
import Link from "next/link";
import useServicecart from "@/app/store/ServiceCart";
import { usePathname } from "next/navigation";
export const NavBottom = () => {
  const items = useServicecart((state) => state.items);
  const { data: session } = useSession();
  
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      signOut({ callbackUrl: "/" });
    }
  };
  const pathname = usePathname();
  const pagename = pathname.split("/").pop();

  return (
    <div className=" md:hidden">
      <div className="fixed z-0 w-full h-16 max-w-lg -translate-x-1/2 backdrop-blur-3xl border-base-300 rounded-full bottom-4 left-1/2 ">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto text-2xl">
          <button
            data-tooltip-target="tooltip-home"
            type="button"
            className={`inline-flex ${pathname==="/"?"bg-primary-content ":"bg-none" }flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-700  group`}
          >
            <Link href="/">
              <TiHome />
            </Link>
            <span className="sr-only">Home</span>
          </button>
          <div
            id="tooltip-home"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium  transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
          >
            Home
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>

          {/* cart */}
          <button
            data-tooltip-target="tooltip-wallet"
            type="button"
            className={`inline-flex flex-col ${pathname==="/cart"?"bg-primary-content ":"bg-none" }items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group`}
          >
            <Link href="/cart">
              <div className="relative">
                <FaShoppingCart />
                <span className="absolute -top-4 badge badge-sm indicator-item bg-primary-content h-6">
                  {items.length}
                </span>
                <span className="sr-only">Wallet</span>
              </div>
            </Link>
          </button>
          <div
            id="tooltip-wallet"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
          >
            Wallet
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>

          {/* Service Modal Drawer */}
          <div className="flex items-center justify-center">
            {/*  */}
          </div>

      
          <button
            data-tooltip-target="tooltip-settings"
            type="button"
            className={`inline-flex flex-col ${pathname==="/history"?"bg-primary-content ":"bg-none" } items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group`}
          >
           <Link href="/history"> <FaHistory /></Link>
            <span className="sr-only">Settings</span>
          </button>
          <div
            id="tooltip-settings"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
          >
            Settings
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>

          {/* profile */}
          <div className={`dropdown dropdown-end ml-4`}>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar "
            >
              <div className="w-10 rounded-full mt-3">
                <div className="text-2xl backdrop-blur-sm font-">
                  {" "}
                  {session?.user?.name?.charAt(0).toUpperCase() || "H"}
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="absolute bottom-full mb-3 menu menu-sm dropdown-content bg-base-100 rounded-box z-[1]  w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
