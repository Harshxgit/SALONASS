"use client";

import AUTHCOMP from "@/Containers/AuthModal/page";
import Header from "@/Containers/header";
import Sidebar from "@/Containers/sidebar";
import Container from "@/components/ui/container";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
    <QueryClientProvider client={new QueryClient()}>
      <div className="flex h-dvh overflow-hidden">
        <Sidebar />

        <div className="w-full relative overflow-y-auto">
          <Header />

          <main className="pt-6 pb-8">
            <Container>{children}</Container>
          </main>
        </div>
      </div>
       <AUTHCOMP type="ADMIN"/>
    </QueryClientProvider>
  );
}
