"use client";

import { useState, useEffect } from "react";

import SidebarContent from "@/Containers/sidebar/SidebarContent"
import useGetWindowWidth from "@/hooks/useGetWindowWidth";
import StaffuseSidebar from "@/context/App";

export default function Sidebar() {
  const sidebarOpen  = StaffuseSidebar(state=>state.sidebarOpen)
  const [isVisible, setIsVisible] = useState(sidebarOpen);
  const windowWidth = useGetWindowWidth();
  useEffect(() => {
    if (sidebarOpen && windowWidth && windowWidth >= 1024) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [sidebarOpen, windowWidth]);

  return (
    isVisible && (
      <aside className="hidden lg:block bg-popover h-dvh overflow-hidden flex-shrink-0 shadow-md relative z-40 w-sidebar">
        <SidebarContent />
      </aside>
    )
  );
}
