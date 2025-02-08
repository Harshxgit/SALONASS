"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, UserCircle2 } from "lucide-react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import useSWR from "swr";
import useServicecart from "../store/ServiceCart";
import Link from "next/link";

const CartInterface = () => {
  const items = useServicecart((state) => state.items);
  const removeService = useServicecart((state) => state.removeService);
  const total = useServicecart((state) => state.getSubtotal);
  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-2 text-purple-600 font-medium">
          <ShoppingCart size={24} />
          <h2>Your cart</h2>
        </div>
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer  text-purple-600 font-medium">
            <FaLongArrowAltLeft size={24} />
            <h2>Back to Service</h2>
          </div>
        </Link>
      </div>
      {
        total() ===0 ? <div>Your Cart is Empty</div>  :
      
      <><div>{items.map((item, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={item.image}
                    alt="Service icon"
                    className="w-12 h-12 rounded-full" />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <div className="text-gray-500 text-sm">
                      services • ₹{item.price}
                    </div>
                  </div>
                </div>

                {/* <div className="space-y-1 mb-3">
              {item.services.map((service, serviceIndex) => (
                <div key={serviceIndex} className="text-sm text-gray-600">
                  • {service}
                </div>
              ))}
            </div> */}

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => removeService(item.id)}>
                    {" "}
                    Remove Services
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Checkout
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          </div><div className="items-center justify-center flex">
              <Card className="fixed  bottom-2 text-4xl text-center backdrop-blur-xl font-bold border-2 border-orange-700 cursor-pointer">
                <Link href={`/checkout?amount=${total()}`}>
                  {" "}
                  <div>Book Now ₹{total()}</div>{" "}
                </Link>
              </Card>
            </div></>
      }
    </div>
  );
};

export default CartInterface;
