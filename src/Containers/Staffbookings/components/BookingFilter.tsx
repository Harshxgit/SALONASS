"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
export default function BookingsFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState<string | null>(null);
  const setFilterr = (filter: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (filter) {
      params.set("status", filter);
    } else {
      params.delete("status");
    }
    router.push(`/staff/bookings?${params.toString()}`);
  };
  useEffect(() => {
    setFilterr(filter);
  }, [filter]);

  return (
    <div className="mb-4 space-x-2">
      <Button
        variant={!searchParams.get("status") ? "default" : "outline"}
        onClick={() => setFilter(null)}
      >
        All
      </Button>
      <Button
        variant={
          searchParams.get("status") === "completed" ? "default" : "outline"
        }
        onClick={() => setFilter("CONFIRMED")}
      >
        CONFIRMED
      </Button>
      
      <Button
        variant={
          searchParams.get("status") === "pending" ? "default" : "outline"
        }
        onClick={() => setFilter("ACCEPTED")}
      >
        ACCEPTED
      </Button>
      <Button
        variant={
          searchParams.get("status") === "pending" ? "default" : "outline"
        }
        onClick={() => setFilter("DONE")}
      >
        DONE
      </Button>
    </div>
  );
}
