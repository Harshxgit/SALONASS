"use client";

import Container from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import ThemeToggle from "@/Containers/header/ThemeToggle";
import Profile from "@/Containers/header/Profile";
import useGetMountStatus from "@/hooks/useGetMountStatus";
import Toggle from "@/components/Toggle";
import NavMenuToggle from "./NavMenuToggle";

export default function Headerr() {
  const mounted = useGetMountStatus();
  return (
    <header className="sticky backdrop-blur-lg top-0 left-0 w-full bg-popover py-4 shadow-sm z-40">
      <Container>
        <div className="flex justify-between">
          {mounted ? (
            <NavMenuToggle/>
          ) : (
            <Skeleton className="size-10 rounded-full" />
          )}


          {/* left side  */}
          <div className="flex items-center gap-x-2 ml-auto">
            <Toggle />
     
            <Profile />
          </div>

        </div>
      </Container>
    </header>
  );
}
