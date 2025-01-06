"use client";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SidebarContent from "@/Containers/sidebar/SidebarContent";
import useGetWindowWidth from "@/hooks/useGetWindowWidth";
import useSidebar from "@/context/App";
export default function NavMenuToggle() {
  const windowWidth = useGetWindowWidth();

  const toggle = useSidebar((state) => state.toggleSidebar);

  if (!windowWidth) return null;

  if (windowWidth >= 1024) {
    return (
      <Button variant="ghost" size="icon" onClick={toggle}>
        <Menu />
      </Button>
    );
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-full !max-w-sidebar bg-popover p-0"
      >
        <SidebarContent />
      </SheetContent>
    </Sheet>
  );
}
