"use client";
import { Service } from "@/types/packages";
import React from "react";
import useSWR from "swr";
import { Card } from "./ui/card";

export default function Services({
  category,
  onshowfunction,
  ref,
  isLoading,
}: {
  category: any;
  onshowfunction: any;
  ref: any;
  isLoading: any;
}) {
  return (
    <div className="md:top-40 md:sticky border-2 rounded-lg">
      <div className="text-3xl relative mt-2 p-2">
        <h1 className="text-md">Select a Service</h1>
        {/* <div className=" absolute top-2 right-4 text-white h-2 w-80"/> */}
      </div>

      {/* service container  */}

      <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
        {category.map((item: any) => (
          // <Link key={service.name} href={service.href}>
          <div
            className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
            key={item}
            onClick={() => onshowfunction(ref[item])}
          >
            {isLoading ? (
              <span className="loading loading-dots loading-lg"></span>
            ) : (
              <div className="flex flex-col items-center justify-center text-center space-y-3">
                {
                  <div className="relative w-16 h-16 border-2 rounded-lg">
                    {/* <Image
                      src={}
                      alt={service.name}
                      fill
                      className="object-cover rounded-md"
                    /> */}
                  </div>
                }
                <span className="text-sm font-medium mt-2">{item}</span>
              </div>
            )}
          </div>
          // </Link>
        ))}
      </div>
    </div>
  );
}
