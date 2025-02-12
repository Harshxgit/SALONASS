"use client";
import { Star } from "lucide-react";
import Image from "next/image";
import MyDrawer from "./MyDrawer";
import { create } from "zustand";
import useServicecart from "../app/store/ServiceCart";
import { Service } from "@/types/packages";
import toast from "react-hot-toast";
import { useState } from "react";
import { resolve } from "path";
//ServiceCard component
export default function ServiceCard({service}:{service : Service}) {
 
  const { additems } = useServicecart();
  const [isLoading , setLoading] = useState(false)
  return (
    <div className=" p-4 ">
      <MyDrawer>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 mt-2 text-left">
              <h3 className="font-semibold text-sm ">{service.servicename}</h3>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="text-sm font-medium">4.99</span>
                <span className="text-sm text-muted-foreground">
                  (47K reviews)
                </span>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-sm">
                  Starts at <span className="text-sm">₹{service.price}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Waxing covers the entire pelvis area
                </p>
                <div className="text-sm text-primary hover:underline">
                  View details
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src={service.img[0]}
                height={100}
                width={100}
                quality={100}
                alt="Service preview"
                className="rounded-lg object-cover  w-fit h-[150px]"
              />
              <div className="absolute justify-center m-auto -mt-3  w-full flex flex-col items-center">
                <span
                  className="w-16 h-8  text-sm border-2 rounded-md hover:bg-black backdrop-blur-md font-bold"
                  onClick={async (e) => {
                    setLoading(true)
                    await new Promise((resolve) => setTimeout(resolve, 1000))
                    e.stopPropagation();
                    additems({
                      id: service.id,
                      name: service.servicename,
                      price: service.price,
                      image: service.img[0],
                      quantity: 1,
                    });
                    toast.success("Your services added to Cart")
                    setLoading(false)
                  }}
                >
                 <div className="mt-1">{isLoading?<span className="loading loading-dots loading-xs"></span>:<span>Add</span>}</div> 
                </span>
              </div>
            </div>
          </div>
        </div>
      </MyDrawer>
    </div>
  );
}
