"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MdOutlineDeleteForever } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import useSWR from "swr";
import { deleteService, getServices } from "@/app/actions/service/actions";
import Service from "@/types/service";

import useAdminService from "@/app/store/adminservice";
import React from "react";
import toast from "react-hot-toast";
export default function ServiceList() {
  const { data, error, isLoading, mutate } = useSWR(
    "action/services",
    getServices,
    {
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  ); //fetch data
  const additem = useAdminService((state) => state.additem); //subscribed service for add items
  // console.log(data)
  useEffect(() => {
    if (data) {
      //store fetched data to useAdminService zustand
      additem(data);
    }
    return () =>
      useAdminService.setState((state) => ({ ...state, items: [] }), true);
  }, [data, additem]);

  const services = useAdminService((state) => state.items);
  const [filter, setFilter] = useState<string>("All");
  const filteredServices = useMemo(() => {
    return filter === "All"
      ? services
      : services.filter((service) => service.type === filter);
  }, [filter, JSON.stringify(services)]);
  if (error) return <div>something went wrong</div>;
  if (isLoading)
    return (
      <div>
        <span className="loading loading-dots loading-lg">Loading</span>
      </div>
    );
  const deleteItem = async (servicename: string) => {
    const isdelete = await deleteService(servicename);
    if (!isdelete) toast.error("failed to delete");
    mutate();
    toast.success("deleted");
  };
  console.log(services);
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Our Services</h1>
        <Select onValueChange={setFilter} defaultValue="All">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent className="backdrop-blur-lg text-4xl font-bold">
            <SelectItem value="All">All Services</SelectItem>
            <SelectItem value="Haircut">Hair care</SelectItem>
            <SelectItem value="Coloring">Pedicure</SelectItem>
            <SelectItem value="Styling">Manicure</SelectItem>
            <SelectItem value="Facial & cleanup">Facial & cleanup</SelectItem>
            <SelectItem value="Bleach & detan">Bleach & detan</SelectItem>
            <SelectItem value="Waxing">Waxing</SelectItem>
            <SelectItem value="Threading & face waxing">
              Threading & face waxing
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service, index) => (
          <MemoizedServiceCard
            key={service.id || index}
            service={service}
            deleteItem={deleteItem}
          />
        ))}
      </div>
    </div>
  );
}

const ServiceCard = ({
  service,
  deleteItem,
}: {
  service: Service;
  deleteItem: (servicename: string) => Promise<void>;
}) => {
  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle>{service.servicename}</CardTitle>
        <div className="absolute p-4 top-1 right-2 text-red-700 cursor-pointer text-4xl">
          <MdOutlineDeleteForever
            onClick={() => deleteItem(service.servicename)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          {service.img?.length > 0 && (
            <Image
              src={service.img[0]} // Show only the first image
              alt={service.servicename}
              width={150}
              height={150}
              className="rounded-lg mt-2"
            />
          )}
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
