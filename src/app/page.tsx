"use client";
import Aboutservice from "@/components/Aboutservice";
import MyDrawer from "@/components/MyDrawer";
import ServiceCard from "@/components/ServiceCard";
import Services from "@/components/Services";
import Image from "next/image";
import useAdminService from "./store/adminservice";
import useSWR from "swr";
import { getServices } from "./actions/service/actions";
import React, { useMemo } from "react";

export default function Home() {
  const { data: services, isLoading } = useSWR("/service", getServices);
  const { data: packages } = useSWR("/package", getServices);

  const categories = useMemo(() => {
    const catg = Array.from(new Set(services?.map((service) => service.type)));
    return [...catg, "packages"];
  }, [services]);

  const catService = useMemo(() => {
    return services?.reduce((acc: { [key: string]: typeof services }, item) => {
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
      acc[item.type].push(item);
      return acc;
    }, {});
  }, [services]);

  const onshowfunc = (ref: any) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const ref = useMemo(() => {
    return Object.fromEntries(
      categories.map((type: any) => [type, React.createRef()])
    );
  }, [categories]);

  console.log(services);
  return (
    <>
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {npm 
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="grid md:grid-rows-3 md:grid-cols-3  md:grid-flow-row gap-4 h-full  md:h-screen text-sm">
        {/* left grid  services category section*/}
        <div className=" md:row-span-6 h-fit md:h-[110%]   md:max-w-[400px] mx-8 ">
          <Services
            category={categories}
            onshowfunction={onshowfunc}
            ref={ref}
            isLoading={isLoading}
          />
        </div>

        {/* right grid */}
        <div className=" md:col-span-2 h-fit border-2 ">1</div>

        {/* All services List */}
        <div className=" border-l-orange-950 grid md:grid-flow-col md:grid-cols-2 md:row-span-2 md:col-span-2  gap-4">
          <div className="h-[calc(110vh-100px)] border-2   overflow-y-scroll scrollbar-hide">
            {isLoading ? (
            <div className="flex items-center justify-center "> <span className="loading loading-dots loading-lg text-8xl"></span></div> 
            ) : (
              categories?.map((category: any) => (
                <div key={category} ref={ref[category]}>
                  <h1 className="text-4xl font-bold mb-4 text-gray-700 ">
                    {" "}
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </h1>
                  {catService?.[category]?.map((service: any) => (
                    <ServiceCard service={service} key={service.id} />
                  ))}
                </div>
              ))
            )}
          </div>

          <div className="border-2  md:h-[calc(110vh-100px)]  scrollbar-hide overflow-y-scroll overflow-x-hidden ">
            <Aboutservice />
          </div>
        </div>
      </div>
    </>
  );
}
