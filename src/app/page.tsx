import Navbar from "@/componets/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Navbar/>
    <div className="text-red-600 text-7xl grid grid-rows-3 grid-flow-col gap-4 h-screen">
      <div className="bg-red-400  md:row-span-3">1</div>
      <div className="bg-cyan-400 md:col-span-2  ">2</div>
      <div className="border-l-orange-950 grid md:grid-flow-col md:row-span-2 md:col-span-2  gap-4">
        <div className="">1</div>
        <div className="">2</div>
      </div>
    </div>
    </>
  );
}
