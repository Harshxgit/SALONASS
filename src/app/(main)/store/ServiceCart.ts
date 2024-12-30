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
};

const useServicecart = create<Servicecart>()(
  persist(
    (set) => ({
      items: [
        {
          id: 1,
          name: "Bikini waxing",
          price: 949,
          image: "/placeholder.svg?height=150&width=150",
          quantity: 1,
        },
        {
          id: 2,
          name: "Bikini waxing",
          price: 500,
          image: "/placeholder.svg?height=150&width=150",
          quantity: 1,
        },
      ],
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
    }),
    { name: "service store",
      // storage: sessionStorage
     }
  )
);

export default useServicecart;
