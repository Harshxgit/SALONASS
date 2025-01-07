"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SidebarContent from "@/Containers/sidebar/SidebarContent";
import useGetWindowWidth from "@/hooks/useGetWindowWidth";
import useSidebar from "@/context/App";
export default function NavMenuToggle() {
  const [isOpen, setIsOpen] = useState(false);

  const windowWidth = useGetWindowWidth();
  const toggle = useSidebar((state) => state.toggleSidebar);

  // Function to handle closing the sheet
  const handleCloseSheet = () => {
    setIsOpen(false);
  };
  if (!windowWidth) return null;

  //big size screen
  if (windowWidth >= 1024) {
    return (
      <Button variant="ghost" size="icon" onClick={toggle}>
        <Menu />
      </Button>
    );
  }

  //phone screen
  return (
    <Sheet>
      <SheetTrigger asChild onClick={() => setIsOpen(true)}>
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>

      {/* sidebar on phone */}
      <Sheet open={isOpen} >
      <SheetContent
        side="left"
        className="w-full !max-w-sidebar bg-popover p-0"
        
      > 
        <SidebarContent onclickclose={handleCloseSheet}/>
      </SheetContent>
      </Sheet>
    </Sheet>
  );
}
