"use client";
import { Service } from "@/types/packages";
import React from "react";
import useSWR from "swr";

export default function Services({
  category,
  onshowfunction,
  ref,
}: {
  category: any;
  onshowfunction: any;
  ref: any;
}) {
  return (
    <div className=" top-36  sticky border-2 ">
      <div className="text-3xl relative mt-2 p-2">
        <h1>Select a Service</h1>
        {/* <div className=" absolute top-2 right-4 text-white h-2 w-80"/> */}
      </div>

      {/* service container  */}
      <div className=" md:gap-12 grid grid-cols-4 gap-8  textarea-sm  ">
        {category.map((item: any) => (
          <div
            className="md:w-20 md:h-20 h-14 w-14 border-2 rounded-lg   "
            key={item}
          >
            <div>{/* <img src="" alt="" /> */} img</div>
            <div className="">{item}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
