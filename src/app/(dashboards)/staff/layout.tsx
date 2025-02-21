"use client"

import Authmodal from "@/components/Authmodal";
import Container from "@/components/ui/container";
import AUTHCOMP from "@/Containers/AuthModal/page";
import Headerr from "@/Containers/staffheader";
import Sideebar from "@/Containers/staffsidebar";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if the user is authenticated by calling the isAuth function.

  // If the user is not authenticated (no session), redirect them to the login page.
  // if (!session) {
  //   return redirect("/login");
  // }

  return (
    <QueryClientProvider client={new QueryClient()}>
      <div className="flex h-dvh overflow-hidden">
        <Sideebar />

        <div className="w-full relative overflow-y-auto">
          <Headerr />
          <main className="pt-6 pb-8">
            <Container>{children}</Container>
          </main>
        </div>
      </div>
        <AUTHCOMP type="STAFF"/>
    </QueryClientProvider>
  );
}
