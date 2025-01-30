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

interface PackageFormData {
  name: string;
  price: string;
  duration?: string;
  description: string;
  services: Service[];
}

export default function CreatePackageForm() {
  const [isLoading, setLoading] = useState(false);
  const service = useAdminService((state) => state.items);
  const [formData, setFormData] = useState<PackageFormData>({
    name: "",
    price: "",
    description: "",
    services: [],
  });

  console.log(formData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const selectService = (value: string) => {
    const item = service.find((s) => s.servicename === value) as Service;
    if (item) {
      setFormData((prev) => {
        const isSelected = prev.services.includes(item);
        const items = isSelected
          ? prev.services.filter((service: Service) => service.id !== item.id)
          : [...prev.services, item];
        return { ...prev, services: items };
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, images: Array.from(e.target.files!) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Here you would typically send the data to your backend
    // For this example, we'll just log it and show a success message
    console.log("Submitting service:", formData);

    setLoading(true);
    await createPackages({
      packageName: formData.name,
      price: parseFloat(formData.price),
      service: formData.services,
      description: formData.description,      
    });
    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Package created!");

    // Reset form after submission
    setFormData({
      name: "",
      price: "",
      duration: "",
      description: "",
      services: [],
    });
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Package</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Package Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Select Services</Label> <Label>{formData.services.length > 0
                  ? (
                    <div className="flex flex-wrap">{
                    formData.services
                      .map((service) => (
                        <div key={service.id} className="flex items-center">
                          {service.servicename}
                          <button className="ml-2 text-red-500" onClick={() => selectService(service.servicename)}>
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
                      ):(
                   "")}</Label>
            <Select
              onValueChange={selectService}
            >
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
              name="duration"
              type="number"
              min="0"
              value={formData.duration}
              onChange={handleInputChange}
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