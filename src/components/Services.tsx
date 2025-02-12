"use client";
import { Service } from "@/types/packages";
import React from "react";
import useSWR from "swr";
import { Card } from "./ui/card";
import Image from "next/image";
export default function Services({
  category,
  onshowfunction,
  ref,
  isLoading,
  setModalOpen
}: {
  category: any;
  onshowfunction: any;
  ref: any;
  isLoading: any;
  setModalOpen:any
}) {
  return (
    <div className="md:top-40 md:sticky border border-base-300 rounded-lg">
      <div className="text-3xl relative mt-2 mx-3">
        <h1 className="text-xl">Select a Service </h1>
        {/* <div className=" absolute top-2 right-4 text-white h-2 w-80"/> */}
      </div>

      {/* service container  */}

      <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
        {category.map((item: any) => (
          // <Link key={service.name} href={service.href}>
          <div
            className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
            key={item}
            onClick={() => {
              onshowfunction(ref[item])
              setModalOpen(false)
            }}

          >
            {isLoading ? (
              <span className="loading loading-dots loading-lg"></span>
            ) : (
              <div className="flex flex-col items-center justify-center text-center space-y-3">
                {
                  <div className="relative bg-gray-700 rounded-lg w-20 aspect-video">
                    <Image
                      src={"/df.jpg"}
                      alt={item}
                      fill
                      className="object-cover rounded-md "
                    />
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
