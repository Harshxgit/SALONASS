"use client";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
interface catService {
    item: string;
    image: string;
    label?: string;
  }

type Servicecart = {
  items: catService[];
  reset: () => void;
};

const useService = create<Servicecart>()(
  persist(
    (set, get) => ({
      items: [],
      additems: (item: catService) => {
        set((state: { items: catService[] }) => {
          const itemExists = state.items.some((i) => i.item === item.item);
          if (!itemExists) {
            return { items: [...state.items, item] };
          }
          return state;
        });
      },

      reset: () => {
        set(() => ({
          items: [],
        }));
      },
    }),
    {
      name: "services store",
      // storage: sessionStorage
    }
  )
);

export default useService;
