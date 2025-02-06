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
  const { data: services } = useSWR("/service", getServices);
  const { data: packages } = useSWR("/package", getServices);

  const category = useMemo(() => {
    const catg = Array.from(new Set(services?.map((service) => service.type)));
    return [...catg, "packages"];
  }, [services]);

  const catService = useMemo(() => {
    services?.reduce((acc: { [key: string]: typeof services }, item) => {
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
      acc[item.type].push(item);
      return acc;
    }, {});
  }, [services]);

  const onshowfunc = (ref: any) => {
    ref.current?.scrollInView({ behaviour: "smooth" });
  };

  const ref = useMemo(() => {
    return Object.fromEntries(
      category.map((type: any) => [type, React.createRef()])
    );
  }, [category]);

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
      <div className=" text-7xl grid grid-rows-3 md:grid-cols-3 grid-flow-col md:grid-flow-row gap-4 h-screen">
        {/* left grid */}
        <div className=" md:row-span-3  md:max-w-[400px] ">
          <Services category={category} onshowfunction={onshowfunc} ref={ref} />
        </div>

        {/* right grid */}
        <div className=" md:col-span-2  border-2 ">1</div>
        <div className=" border-l-orange-950 grid md:grid-flow-col md:grid-cols-2 md:row-span-2 md:col-span-2  gap-4">
          <div className="h-[calc(110vh-100px)] border-2   overflow-y-scroll scrollbar-hide">
            {services?.map((service) => {
              return <ServiceCard service={service} key={service.id} />;
            })}
          </div>
          <div className="border-2  md:h-[calc(110vh-100px)]  scrollbar-hide overflow-y-scroll overflow-x-hidden ">
            <Aboutservice />
          </div>
        </div>
      </div>
    </>
  );
}
