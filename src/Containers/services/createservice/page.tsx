"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { getSignedURL } from "@/app/actions/awsS3/actions";
import createService from "@/app/actions/service/actions";
import { useForm } from "react-hook-form";

type ServiceType = "Haircut" | "Coloring" | "Styling" | "Treatment";

interface ServiceFormData {
  name: string;
  price: number;
  type: ServiceType;
  duration: number;
  images: File[];
}

export default function CreateServiceForm() {
  const {
    register: registerService,
    handleSubmit,
    setValue,
    watch,
    getValues,
    reset,
  } = useForm<ServiceFormData>({
    defaultValues: {
      name: "",
      type: "Coloring",
      images: [],
    },
  });
  const formData = getValues();

  const type = watch("type");
  const [isLoading, setLoading] = useState(false);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const isMultiple = e.target.multiple;
    setValue("images", isMultiple ? files : [files[0]]);
  };

  const submitData = async (data: ServiceFormData) => {
    setLoading(true);
    const service = await createService({
      servicename: data.name,
      price: Number(data.price),
      duration: Number(data.duration),
      type: data.type,
      description: "hi everyone , aur kya haal chaal",
    });

    if (!service) throw new Error(service);
    console.log("each");
    console.log(formData.images);
    await Promise.all(
      formData.images.map(async (item) => {
        console.log("each2");
        const { uploadUrl } = await getSignedURL(
          formData.images.length || 0,
          item.type,
          service.serviceid || 0
        );
        console.log(uploadUrl);
        if (uploadUrl) {
          try {
            const response = await fetch(uploadUrl, {
              method: "PUT",
              headers: {
                "Content-Type": item.type,
              },
              body: item,
              mode: "cors",
            });
            if (!response) throw new Error("Upload failed");
          } catch (error) {
            console.log(error);
          }
        }
      })
    );

    toast.success(`${data.name} has been successfully added.`);
    reset();
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Service</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(submitData)} className="space-y-4">
          <div className="flex flex-row  gap-8">
            <div className="space-y-2 w-full">
              <Label htmlFor="name">Service Name</Label>
              <Input
                id="name"
                {...registerService("name", { required: true })}
                required
              />
            </div>

            <div className="space-y-2 w-full relative">
              <Label htmlFor="price">Price ₹</Label>
              <Input
                id="price"
                type="tel"
                min="0"
                step="0.01"
                {...registerService("price")}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Service Type</Label>
            <Select
              onValueChange={(value) => setValue("type", value as ServiceType)}
              value={type}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent className="backdrop-blur">
                <SelectItem value="Haircut">Haircut</SelectItem>
                <SelectItem value="Coloring">Coloring</SelectItem>
                <SelectItem value="Styling">Styling</SelectItem>
                <SelectItem value="Treatment">Treatment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              type="tel"
              min="0"
              // value={formData.duration}
              {...registerService("duration", { required: true })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="images">Images</Label>
            <Input
              type="file"
              onChange={handleImageUpload}
              multiple
              accept="image/*"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                Creating{" "}
                <span className="loading loading-ring loading-xs"></span>
              </>
            ) : (
              <>Create Serivce</>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
