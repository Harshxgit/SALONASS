import { create } from "zustand";
import { persist } from "zustand/middleware";
interface Item {
  id: number;
  servicename: string;
  price: number;
  duration: number;
  type: string;
  img: string[];
}

type AdminService = {
  items: Item[];
  additem: (item: Item[]) => void;
};
const useAdminService = create<AdminService>()(
 
    (set) => ({
      items: [],
      additem: (item: Item[]) =>
        set((state) => {
            console.log(item + "sdfsdfdsfdsfsdf")
          const existingids = new Set( state.items.map((item) => item.id));
          const uniqservices = item.filter(
            (item) => !existingids.has(item.id)
          );
          if (item.length === 0) return state;
          return { items: [...state.items, ...uniqservices] };
        }),
    }),


);
export default useAdminService;
