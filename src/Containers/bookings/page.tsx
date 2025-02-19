"use client";
import io from "socket.io-client";
import { Suspense, useEffect } from "react";
import BookingsList from "./components/BookingsList";
import BookingsFilter from "./components/BookingFilter";
import useSWR, { mutate } from "swr";
import { getallbooking } from "@/app/actions/booking/actions";
import { Booking } from "@/types/packages";
export default function BookingsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  type FetcherReturn = Promise<{ Data: Booking[] }>;
  const fetcher = async ([startdate, enddate]: [
      Date,
      Date,
       ]): FetcherReturn => {
      return getallbooking({ startdate :startdate,enddate: enddate });
    };
  const status =
    typeof searchParams.status === "string" ? searchParams.status : undefined;
    const startdate = new Date(new Date().toISOString());
    const enddate = new Date(new Date().toISOString());
    const { data: bookings, mutate: boundMutate } = useSWR<{ Data: Booking[] }>(
      ["/fetchbookings", startdate, enddate, status] ,
      fetcher
    );
    const bookingList: any = bookings?.Data ?? [];
  useEffect(() => {
    const socket = io("/admin");
    socket.on("getbooking", (newBooking: any) => {
      boundMutate({ Data: [...(bookings?.Data || []), newBooking] }, false);
    });
  }, []);
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Bookings</h1>
      <BookingsFilter />
      <Suspense fallback={<div>Loading...</div>}>
        <BookingsList initialBookings={bookingList} />
      </Suspense>
    </div>
  );
}
