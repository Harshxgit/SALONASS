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

  const type = watch("type");
  const images = watch("images");
  const [isLoading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const files = Array.from(e.target.files);
    setValue("images", files);
  };

  const submitData = async (data: ServiceFormData) => {
    setLoading(true);
    const to = toast.loading("creating")
    const service = await createService({
      servicename: data.name,
      price: Number(data.price),
      duration: Number(data.duration),
      type: data.type,
      description: "hi everyone , aur kya haal chaal",
    });

    if (!service) throw new Error(service);

    for (const item of images) {
      const { uploadUrl } = await getSignedURL(
        images.length || 0,
        item.type,
        service.serviceid || 0
      );

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
    }
    toast.success(`${data.name} has been successfully added.`,{id:to});
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
              <SelectContent className="backdrop-blur text-3xl font-bold">
                <SelectItem value="Haircut">Hair care</SelectItem>
                <SelectItem value="Coloring">Pedicure</SelectItem>
                <SelectItem value="Styling">Manicure</SelectItem>
                <SelectItem value="Facial & cleanup">Facial & cleanup</SelectItem>
                <SelectItem value="Bleach & detan">Bleach & detan</SelectItem>
                <SelectItem value="Waxing">Waxing</SelectItem>
                <SelectItem value="Threading & face waxing">Threading & face waxing</SelectItem>
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
