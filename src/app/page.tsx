import Services from "@/componets/Services";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className=" text-7xl grid grid-rows-3 grid-flow-col gap-4 h-screen">
        <div className="  md:row-span-3 border-2 max-w-[400px]  ">
          <Services />
        </div>
        <div className=" md:col-span-2  border-2 ">2</div>
        <div className="border-l-orange-950 grid md:grid-flow-col md:row-span-2 md:col-span-2  gap-4">
          <div className="border-2 ">1</div>
          <div className="border-2 ">2</div>
        </div>
      </div>
    </>
  );
}
