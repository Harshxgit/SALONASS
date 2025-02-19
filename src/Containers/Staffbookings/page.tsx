"use client";
import { Suspense, useEffect } from "react";
import useSWR, { mutate } from "swr";
import BookingsList from "./components/BookingsList";
import BookingsFilter from "./components/BookingFilter";
import io from "socket.io-client";
import { useSession } from "next-auth/react";
import { getallbookingforstaff } from "@/app/actions/booking/actions";
import { Booking } from "@/types/packages";
import { bookingstatus } from "@prisma/client";
import { stat } from "fs";
export default function BookingsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  
  type FetcherReturn = Promise<{ Data: Booking[] }>;
  const fetcher = async ([staffid, startdate, enddate, status]: [
    number,
    Date,
    Date,
    bookingstatus
  ]): FetcherReturn => {
    return getallbookingforstaff({ staffid, startdate, enddate, status });
  };
  const { data: session } = useSession();
  const startdate = new Date(new Date().toISOString());
  const enddate = new Date(new Date().toISOString());
  const staffid = Number(session?.user?._id);
  const status =typeof searchParams.status === "string" ? searchParams.status : undefined;
  const { data: bookings, mutate: boundMutate } = useSWR<{ Data: Booking[] }>(
    ["/fetchbookings", staffid, startdate, enddate, status] ,
    fetcher
  );
  const bookingList: any = bookings?.Data ?? [];
  const socketId = session?.user._id;

  useEffect(() => {
    const socket = io("/staff");
    socket.emit("registerstaff", socketId);
    //get booking live
    socket.on("getbooking", (newbooking: Booking) => {
      if (!status) return;
      boundMutate({ Data: [...(bookings?.Data || []), newbooking] }, false);
    });
  });

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
