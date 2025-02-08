"use client"
import { create } from "zustand";
import { devtools ,persist } from "zustand/middleware";
type Item = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type Servicecart = {
  items: Item[];
  additems: (item: Item) => void;
  increaseqty: (id: number) => void;
  decreaseqty: (id: number) => void;
  removeService: (id: number) => void;
  getSubtotal: () => number;
  reset :()=>void
};

const useServicecart = create<Servicecart>()(
  persist(
    (set,get) => ({
      items: [],
      additems: (item: Item) => {
        set((state: { items: Item[] }) => ({
          items: [...state.items, item],
        }));
      },

      increaseqty: (id: number) => {
        set((state: { items: Item[] }) => ({
          items: state.items.map((item) => {
            if (item.id === id) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          }),
        }));
      },
      decreaseqty: (id: number) => {
        set((state: { items: Item[] }) => ({
          items: state.items.map((item) => {
            if (item.id === id) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          }),
        }));
      },
      removeService: (id: number) => {
        set((state: { items: Item[] }) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      getSubtotal :()=>{
            return get().items.reduce((acc, item) =>acc+item.price * item.quantity,0 );
      },
      reset :()=>{
            set(()=>({
              items:[]
            }))
      }
    }),
    { name: "service store",
      // storage: sessionStorage
     }
  )
);

export default useServicecart;
