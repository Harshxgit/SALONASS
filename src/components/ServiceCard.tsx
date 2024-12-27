"use client";
import { Star } from "lucide-react";
import MyDrawer from "./MyDrawer";
import { create } from "zustand";

//ServiceCard component
export default function ServiceCard() {
  const showData = create((set)=>{
    data:{
    }
    setdata:(newdata:object) =>set({data:newdata})
  })
  return (
    <div className="w-full p-4 ">
        <MyDrawer>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 mt-8 text-left">
              <h3 className="font-semibold text-sm ">Bikini waxing</h3>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="text-sm font-medium">4.99</span>
                <span className="text-sm text-muted-foreground">
                  (47K reviews)
                </span>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-sm">
                  Starts at <span className="text-sm">₹949</span>
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
              <img
                src="/placeholder.svg?height=150&width=150"
                alt="Service preview"
                className="rounded-lg object-cover w-full h-[150px]"
              />
              <div className="absolute -bottom-14 right-2 flex flex-col items-center">
                <span className="w-16 h-8  text-sm border-2 rounded-md hover:bg-black" onClick={(e)=>e.stopPropagation()} >Add</span>
                <p className="text-xs text-white mt-1">2 options</p>
              </div>
            </div>
          </div>
        </div>
      </MyDrawer>
      </div>
  );
}
