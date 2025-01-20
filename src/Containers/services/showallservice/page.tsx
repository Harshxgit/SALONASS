"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import useSWR from "swr";
import { getServices } from "@/app/actions/service/servic";
import Service from "@/types/service";

import useAdminService from "@/app/store/adminservice";
import React from "react";
export default function ServiceList() {
  const { data, error, isLoading } = useSWR("services", getServices); //fetch data
  const additem = useAdminService((state) => state.additem); //subscribed service for add items

  useEffect(()=>{

    if (data) { //store fetched data to useAdminService zustand
      additem(data)
    }
  },[])
  const services = useAdminService((state) => state.items);

  const [filter, setFilter] = useState<string>("All");


  // const filteredServices = useMemo(() => {
  //   return filter === "All"
  //     ? services ?? []
  //     : (services ?? []).filter((service) => service.type === filter);
  // }, [filter, services]);

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Our Services</h1>
        <Select onValueChange={setFilter} defaultValue="All">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Services</SelectItem>
            <SelectItem value="Haircut">Haircut</SelectItem>
            <SelectItem value="Coloring">Coloring</SelectItem>
            <SelectItem value="Styling">Styling</SelectItem>
            <SelectItem value="Treatment">Treatment</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <MemoizedServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}

const ServiceCard = ({ service }: { service: Service }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{service.servicename}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          {/* <Image
            src={
              Array.isArray(service.img)
                ? service.img[0]
                : service.img || "/default-image.png"
            }
            alt={service.servicename || "Service image"}
            width={100}
            height={100}
            className="rounded-md"
          /> */}
          <div>
            <p className="font-semibold">{service.servicename}</p>
            <p className="font-semibold">₹{service.price}</p>
            <p className="text-sm text-gray-500">{service.type}</p>
            <p className="text-sm text-gray-500">{service.duration} minutes</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export const MemoizedServiceCard = React.memo(ServiceCard);