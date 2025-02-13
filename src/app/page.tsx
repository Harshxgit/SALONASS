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
import Carousel from "@/components/carousel";
import ServiceShowcase from "@/components/Aboutservice";
import { NavBottom } from "@/components/NavBottom";
import {
  FramerModal,
  ModalContent,
} from "@/components/client-coponent/serviceDrawer";
import { useState } from "react";
import { MdOutlineWindow } from "react-icons/md";
import { Metadata } from "next";
import { useSession } from "next-auth/react";

export default function Home() {
  

  const [modalOpen, setModalOpen] = useState(false);
  const { data: services, isLoading } = useSWR("/service", getServices);
  const { data: packages } = useSWR("/package", getServices);
  const session = useSession()
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
      <div className="grid md:grid-rows-3 md:grid-cols-3  md:grid-flow-row gap-4 h-full  md:h-screen text-sm ">
        {/* left grid  services category section*/}
        <div className="md:hidden ">
          {/* <Image src={"https://mysalonsassbucket.s3.eu-north-1.amazonaws.com/DALL%C2%B7E+2025-02-10+21.47.13+-+A+stylish+and+modern+wide+banner+for+'ClassOne+UNISEX+SALON'.+The+design+features+a+sleek+black+and+gold+color+scheme+with+a+luxurious+feel.+The+text+.webp"} alt={""} height={9} layout="responsive"
                width={16}
                quality={100} className="object-cover p-4 " /> */}
          <Carousel />
        </div>
                {/* dfs */}
        <div className=" md:row-span-6 h-fit md:h-[110%]   md:max-w-[400px] mx-8 backdrop-blur-sm ">
          <Services
            category={categories}
            onshowfunction={onshowfunc}
            ref={ref}
            isLoading={isLoading}
            setModalOpen={setModalOpen}
          />
        </div>

        {/* right grid */}
        <div className="hidden md:block md:col-span-2 md:row-span-2  overflow-hidden ">
          {/* <Image src={"https://mysalonsassbucket.s3.eu-north-1.amazonaws.com/DALL%C2%B7E+2025-02-10+21.47.13+-+A+stylish+and+modern+wide+banner+for+'ClassOne+UNISEX+SALON'.+The+design+features+a+sleek+black+and+gold+color+scheme+with+a+luxurious+feel.+The+text+.webp"} alt={""} height={9} layout="responsive"
                width={16} 
                quality={100} className="object-fill  " /> */}
          <Carousel />
        </div>

        {/* All services List */}
        <div className=" border-l-orange-950 grid md:grid-flow-col md:grid-cols-2 md:row-span-2 md:col-span-2  gap-4">
          <div className="h-[calc(110vh-100px)] border border-base-300   overflow-y-scroll scrollbar-hide">
            {isLoading ? (
              <div className="flex items-center justify-center ">
                {" "}
                <span className="loading loading-dots loading-lg text-8xl"></span>
              </div>
            ) : (
              categories?.map((category: any) => (
                <div key={category} ref={ref[category]}>
                  <div className="w-full border-2 " />
                  <h1 className="text-3xl text-center font-bold mt-6 text-gray-700 ">
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

          <FramerModal open={modalOpen} setOpen={setModalOpen}>
            <ModalContent>
            <Services
            category={categories}
            onshowfunction={onshowfunc}
            ref={ref}
            isLoading={isLoading}
            setModalOpen={setModalOpen}
          />
            </ModalContent>
          </FramerModal>
          <div className="md:hidden fixed left-[43%]  bottom-10 z-50 ">

          
          <button
            data-tooltip-target="tooltip-new"
            type="button"
            className=" inline-flex items-center justify-center w-14 h-14 font-medium bg-primary-content  rounded-full  focus:ring-4 focus:ring-blue-300 focus:outline-none  "
            onClick={() => setModalOpen(true)}
          >
            <MdOutlineWindow className="text-2xl"/>

            <span className="sr-only">Services</span>
          </button>
          </div>
          <div className=" hidden md:block border border-base-300  md:h-[calc(110vh-100px)]  scrollbar-hide overflow-y-scroll overflow-x-hidden ">
            <ServiceShowcase />
          </div>
        </div>
      </div>
    </>
  );
}
