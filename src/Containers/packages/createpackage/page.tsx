"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import useAdminService from "@/app/store/adminservice";
import Service from "@/types/service";
import createPackages from "@/app/actions/packages/actions";
import { useForm } from "react-hook-form";

interface PackageFormData {
  name: string;
  price: number;
  duration?: number;
  description: string;
  services: Service[];
  images?: File[];
}

export default function CreatePackageForm() {
  const [isLoading, setLoading] = useState(false);
  const service = useAdminService((state) => state.items);
  const { register, handleSubmit, setValue, watch, getValues } =
    useForm<PackageFormData>({
      defaultValues: { name: "", price: 0, duration: 0, services: [] ,description:""},
    });
  const formdata = getValues();

  const selectService = (value: string) => {
    console.log("clicked");
    const item = service.find((s) => s.servicename === value) as Service;

    if (item) {
      const updateService = (previousService: Service[]) => {
        console.log("services"+previousService)
        const isexisted = previousService.includes(item);
        console.log(isexisted)
        return isexisted
          ? previousService.filter((s) => s.id !== item.id)
          : [...previousService, item];
      };
      console.log(updateService(getValues("services")))
      setValue("services", updateService(formdata.services));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = Array.from(e.target.files);
      setValue("images", file);
    }
  };

  const Submitform = async (data: PackageFormData) => {
    // Here you would typically send the data to your backend
    // For this example, we'll just log it and show a success message

    setLoading(true);
    await createPackages({
      packageName: data.name,
      price: Number(data.price),
      service: data.services,
      description: data.description,
    });
    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Package created!");

    // Reset form after submission
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Package</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(Submitform)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Package Name</Label>
            <Input id="name" {...register("name")} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="tel"
              min="0"
              step="0.01"
              {...register("price")}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Select Services</Label>{" "}
            <Label>
              {formdata.services.length > 0 ? (
                <div className="flex flex-wrap">
                  {formdata.services.map((service) => (
                    <div key={service.id} className="flex items-center">
                      {service.servicename}
                      <button
                        className="ml-2 text-red-500"
                        onClick={() => selectService(service.servicename)}
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4">
                          <path
                            fill="currentColor"
                            d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}
            </Label>
            <Select onValueChange={selectService}>
              <SelectTrigger>
                <SelectValue placeholder="Select Services" />
              </SelectTrigger>
              <SelectContent className=" backdrop-blur">
                {service.map((service) => (
                  <SelectItem key={service.id} value={service.servicename}>
                    {service.servicename}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              type="tel"
              min="0"
              {...register("duration")}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="images">Images</Label>
            <Input
              id="images"
              name="images"
              type="file"
              onChange={handleImageUpload}
              multiple
              accept="image/*"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {!isLoading ? <>Create Package </> : <> Creating...........</>}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
