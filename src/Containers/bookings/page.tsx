"use client";
import io from "socket.io-client";
import { Suspense, useEffect } from "react";
import BookingsList from "./components/BookingsList";
import BookingsFilter from "./components/BookingFilter";
import { fetchBookings } from "@/app/actions/(admin)/packages/package";
import useSWR, { mutate } from "swr";

export default function BookingsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const status =
    typeof searchParams.status === "string" ? searchParams.status : undefined;
  const { data: bookings } = useSWR(["/api/booking", status], () =>
    fetchBookings(status)
  );
  useEffect(() => {
    const socket = io("/admin");
    socket.on("newBooking", (newBooking: any) => {
      mutate(
        ["/api/booking", status],
        [...(bookings || []), newBooking],
        false
      );
    });
  }, []);
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Bookings</h1>
      <BookingsFilter />
      <Suspense fallback={<div>Loading...</div>}>
        <BookingsList initialBookings={bookings || []} />
      </Suspense>
    </div>
  );
}
