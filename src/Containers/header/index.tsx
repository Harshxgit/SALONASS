"use client";

import Container from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import ThemeToggle from "@/Containers/header/ThemeToggle"
import NavMenuToggle from "@/Containers/header/NavMenuToggle";
import Notifications from "@/Containers/header/Notifications";
import Profile from "@/Containers/header/Profile";
import useGetMountStatus from "@/hooks/useGetMountStatus";

export default function Header() {
  const mounted = useGetMountStatus();

  return (
    <header className="sticky top-0 left-0 w-full bg-popover py-4 shadow-sm z-40">
      <Container>
        <div className="flex justify-between">
          {mounted ? (
            <NavMenuToggle />
          ) : (
            <Skeleton className="size-10 rounded-full" />
          )}

          <div className="flex items-center gap-x-2 ml-auto">
            {mounted ? (
              <ThemeToggle />
            ) : (
              <Skeleton className="size-10 rounded-full" />
            )}

            <Notifications />
            <Profile />
          </div>
        </div>
      </Container>
    </header>
  );
}
