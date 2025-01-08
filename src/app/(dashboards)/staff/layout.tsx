"use client";


import Container from "@/components/ui/container";
import Header from "@/Containers/staffheader";
import Sidebar from "@/Containers/staffsidebar";
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
        <Sidebar/>

        <div className="w-full relative overflow-y-auto">
         <Header/>

          <main className="pt-6 pb-8">
            <Container>{children}</Container>
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
}
