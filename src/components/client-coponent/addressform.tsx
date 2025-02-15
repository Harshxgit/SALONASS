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

interface Location {
  lat: number;
  lon: number;
  display_name?: string;
}

function SetViewOnClick({ coords }: { coords: [number, number] }) {
  const map = useMap();
  map.setView(coords, map.getZoom());
  return null;
}
export default function LocationMap({ setValue }: { setValue: (field: string, value: any) => void }) {
  const [location, setLocation] = useState<Location | null>(null);
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
 
console.log(location)
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
            setValue("address",{
              road   : location?.display_name?.[0],
              area   : location?.display_name?.[1],
              city   : location?.display_name?.[3],
              state   : location?.display_name?.[4],
              
            })
          } catch (error) {
            console.error("Error fetching address:", error);
            setError("Failed to fetch address");
          }
        },
        (error) => {
          console.error("Error getting location:", error);
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
      console.error("Error searching address:", error);
      setError("Failed to search address");
    }
  };

  return (
    <div className="space-y-4">
      <div >
        <div className="flex flex-row gap-1 justify-center">
          <Input
            type="text"
            placeholder="Search address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button onClick={searchAddress}>Search</Button>
        </div>
          <Button className="mt-1 " onClick={getLocation}>Get Live Location</Button>
   
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
    </div>
  );
}
