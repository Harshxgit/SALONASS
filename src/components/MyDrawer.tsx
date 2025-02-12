"use client";
import { useState } from "react";
import { Drawer } from "vaul";
import { useMediaQuery } from "react-responsive";
import ServiceShowcase from "./Aboutservice";
export default function MyDrawer({ children }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const isMDScren = useMediaQuery({ query: "(min-width: 768px)" });

  return (
    <div className="flex justify-center mt-24 z-50">
      {/* In median screen drawer is hidden */}
      <Drawer.Root shouldScaleBackground  open={!isMDScren?isOpen:false} onOpenChange={setIsOpen}>
        <Drawer.Trigger asChild>
          <button className="">
            <div>{children}</div>
          </button>
        </Drawer.Trigger>
        <Drawer.Portal >
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="flex  backdrop-blur-3xl flex-col md:w-1/2 md:m-auto rounded-t-[10px] h-full mt-24 max-h-[75%] fixed bottom-0 left-0 right-0">
           <ServiceShowcase/>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
