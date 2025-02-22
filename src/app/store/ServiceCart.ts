"use client"
import { create } from "zustand";
import { devtools ,persist } from "zustand/middleware";
type Item = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  duration? :number
};

type Servicecart = {
  items: Item[];
  additems: (item: Item) => void;
  increaseqty: (id: number) => void;
  decreaseqty: (id: number) => void;
  removeService: (id: number) => void;
  getSubtotal: () => number;
  reset :()=>void;
  getDuration :()=>number
};

const useServicecart = create<Servicecart>()(
  persist(
    (set,get) => ({
      items: [],
      additems: (item: Item) => {
        set((state: { items: Item[] }) => {
          const itemExists = state.items.some((i) => i.id === item.id);
          if (!itemExists) {
            return { items: [...state.items, item] };
          } 
          return state;
        });
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
      },
      getDuration: () => {
        return get().items.reduce((acc, item) =>acc+(item.duration ??0) * item.quantity,0 );
      }
    }),
    { name: "service store",
      // storage: sessionStorage
     }
  )
);

export default useServicecart;
function increaseqty(id: number) {
  throw new Error("Function not implemented.");
}

