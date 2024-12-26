"use client";
import MyDrawer from "@/componets/MyDrawer";
import ServiceCard from "@/componets/ServiceCard";
import Services from "@/componets/Services";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className=" text-7xl grid grid-rows-3 md:grid-cols-3 grid-flow-col gap-2 h-screen ">
        <div className=" md:row-span-3 border-2 w-fit md:max-w-[400px]    ">
          <Services />
        </div>
        <div className=" md:col-span-2  border-2 ">1</div>
        <div className="border-l-orange-950 grid md:grid-flow-col md:grid-cols-2 md:row-span-2 md:col-span-2  gap-4">
          <div className="h-[calc(110vh-100px)] border-2    overflow-y-scroll scrollbar-hide">
            <style jsx global>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
              .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>{" "}
           <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard /> 
            
          </div>
          <div className="border-2 ">2</div>
        </div>
      </div>
    </>
  );
}
