"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { FormValues } from "@/types/form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "@radix-ui/react-label";

interface Location {
  lat: number;
  lon: number;
  display_name?: string;
}
interface ServiceTypeSelectorProps {
  setValue: UseFormSetValue<FormValues>;
  register: UseFormRegister<FormValues>
}
function SetViewOnClick({ coords }: { coords: [number, number] }) {
  const map = useMap();
  map.setView(coords, map.getZoom());
  return null;
}
export default function LocationMap({ register,setValue }: ServiceTypeSelectorProps) {
  const [location, setLocation] = useState<Location | null>(null);
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [ byAdress, setByAdress] = useState(false)
  const setAdddress =()=>{
      setByAdress(true)
  }
  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            setLocation({
              lat: latitude,
              lon: longitude,
              display_name: data.display_name.split(","),
            });
            setValue("address", {
              street: location?.display_name?.[0] ?? '',
              area: location?.display_name?.[1] ?? '',
              city: location?.display_name?.[3] ?? '',
              state: location?.display_name?.[4] ?? ''
            });
          } catch (error) {
            setError("Failed to fetch address");
          }
        },
        (error) => {
          setError("Failed to get location");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
  };

  const searchAddress = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        setLocation({
          lat: Number.parseFloat(data[0].lat),
          lon: Number.parseFloat(data[0].lon),
          display_name: data[0].display_name,
        });
      } else {
        setError("Address not found");
      }
    } catch (error) {
      setError("Failed to search address");
    }
  };

  return (
    <div className="space-y-4">
      <div className=" flex gap-1">
        <Button className="mt-1 " onClick={setAdddress}>
          Enter Your Address
        </Button>
        <Button className="mt-1 " onClick={getLocation}>
          Get Live Location
        </Button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {location && (
        <div>
          <div style={{ height: "100px", width: "100%" }}>
            <MapContainer
              center={[location.lat, location.lon]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[location.lat, location.lon]} />
              <SetViewOnClick coords={[location.lat, location.lon]} />
            </MapContainer>
          </div>
          <p className="mb-2">
            Location:{" "}
            {location.display_name || `${location.lat}, ${location.lon}`}
          </p>
        </div>
      )}
      {byAdress && <Card className="w-full max-w-3xl mx-auto border border-primary-content">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Address Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-wrap gap-4">
          <div className="flex-grow min-w-[200px] space-y-2">
            <Label htmlFor="houseNumber">House Number</Label>
            <Input {...register('address.houseNo')} id="houseNumber" placeholder="e.g. 123" />
          </div>
          <div className="flex-grow min-w-[200px] space-y-2">
            <Label htmlFor="street">Street</Label>
            <Input {...register('address.street')}id="street" placeholder="e.g. Main Street" />
          </div>
          <div className="flex-grow min-w-[200px] space-y-2">
            <Label htmlFor="area">Area</Label>
            <Input {...register('address.area')} id="area" placeholder="e.g. Downtown" />
          </div>
          <div className="flex-grow min-w-[200px] space-y-2">
            <Label htmlFor="colony">Colony</Label>
            <Input {...register('address.colony')} id="colony" placeholder="e.g. Green Park" />
          </div>
        </form>
      </CardContent>
      
    </Card>}
    </div>
  );
}
