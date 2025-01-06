"use client";

import { create } from "zustand";

//zustand store for sidebar
interface useSidebar{
  sidebarOpen :boolean
  toggleSidebar : () => void
}
const useSidebar = create<useSidebar>((set) => ({
    sidebarOpen: true,
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen }))
}));
export default useSidebar