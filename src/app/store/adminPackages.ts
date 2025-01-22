import { create } from "zustand";
import Service from "@/types/service";
import { Packages } from "@/types/packages";

type AdminService = {
  items: Packages[];
  additem: (item: Packages[]) => void;
};

const useAdminPackages = create<AdminService>()((set,get) => ({
  items: [],
  additem: (item: Packages[]) =>
    set((state) => {
      const existingids = new Set(state.items.map((item) => item.id));
      const uniqservices = item.filter((item) => !existingids.has(item.id));
      if (item.length === 0) return state;
      return { items: [...state.items, ...uniqservices] };
    }),
}));
export default useAdminPackages;
