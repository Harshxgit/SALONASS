"use server";
import prisma from "@/db";
import { bookingstatus } from "@prisma/client";
import convertTo24HourFormat from "../staff/actions";
import { Booking } from "@prisma/client";
interface getBooking {
  staffid?: number;
  userid?: number;
  startdate: Date;
  enddate: Date;
  status? : bookingstatus
}
interface Bookings {
  userid: number;
  services: { name: string; price: number; quantity: number }[];
  address: object;
  bookingtype: string;
  price: number;
  date: Date;
  time: string;
  duration: number;
  staffid: number;
  orderId: string;
  status: string;
  username: string;
  staffName :string
}

interface updatebookingstatus {
  bookingid: number;
  status: string;
}

//service booking function
export default async function addBooking({
  userid,
  price,
  address,
  bookingtype,
  date,
  time,
  duration,
  staffid,
  services,
  orderId,
  status,
  username,
  staffName
}: Bookings) {
  console.log("in bookiing")
  console.log(userid,price,address,  bookingtype,date,time, duration, staffid, services,orderId,status,username,staffName)
  const hrs = await convertTo24HourFormat(time);
  const [hours, minute] = hrs.split(":").map(Number);
  const startTime = new Date(date);
  startTime.setUTCHours(hours, minute, 0, 0);
  const endtime = new Date(startTime.getTime() + duration * 60000);
  const STARTTIME = new Date(startTime.toISOString());
  const ENDTIME = new Date(endtime.toISOString());
  
  try {
    const isbooking: Booking = await prisma.$transaction(
      async (tx) => {
        console.log("first")
      const newbooking =  await tx.booking.create({
          include: {
            bookedService: true,
          },
          data: {
            username: username,
            userId: userid,
            bookingType: bookingtype,
            address: address,
            price: price,
            date: date,
            starttime: STARTTIME,
            endtime: ENDTIME, // Example end time 1 hour after start time
            staffId: staffid,
            status: status as bookingstatus,
            orderId: orderId,
            staffName :staffName,
            bookedService: {
              create: [
                {
                  services: services.map((service) => ({
                    name: service.name,
                    price: service.price,
                    quantity: service.quantity,
                  })),
                },
              ],
            },
          },
        });
        return newbooking;
      },
      { timeout: 300000 }
    );
    console.log(isbooking)

    if (!isbooking) return { error: "Booking not created" };
    return { success: true, booking: isbooking };
  } catch (error) {
    return { error: error };
  }
}

export async function updatebookingstatus({
  bookingid,
  status,
}: updatebookingstatus) {
  console.log("bookingid"+ bookingid)
  const isbooking = await prisma.booking.update({
    where: {
      id: bookingid,
    },
    data: {
      status: (status as any) || "CONFIRMED",
    },
  });
  if (!isbooking) return { error: "booking status not updated" };
  return { success: true };
}

//get all booking for admin
export async function getallbooking({ startdate, enddate }: getBooking): Promise<{ Data: Booking[] }> {
  const startingdate = startdate ? startdate : new Date();
  startdate.setHours(0,0,0,0)
  const endingdate = enddate
    ? enddate
    : startdate
    ? new Date(startdate.setHours(23, 59, 59, 999))
    : undefined;

  const Data = await prisma.booking.findMany({
    where: {
      date: {
        gte: startingdate,
        lte: endingdate,
      },
    },
    include:{
      bookedService :true
    }
  });

  return { Data: Data ?? [] };
}

//getallbooking for user
export async function getallbookingforuser({
  userid,
  startdate,
  enddate,
}: getBooking) {
  const startingdate = startdate ? startdate : new Date();
  const endingdate = enddate
    ? enddate
    : startdate
    ? new Date(startdate.setHours(23, 59, 59, 999))
    : undefined;

  const isData = await prisma.booking.findMany({
    where: {
      userId: userid,
      date: {
        gte: startingdate,
        lte: endingdate,
      },
    },
  });
  if (!isData) return { error: "No booking found" };
  return isData;
}

//getallbooking for staff
export async function getallbookingforstaff({
  staffid,
  startdate,
  enddate,
  status
}: getBooking): Promise<{ Data: Booking[] }> {
  const startingdate = startdate ? startdate : new Date();
  startingdate.setHours(0, 0, 0, 0);
  const endingdate = enddate
    ? enddate
    : startdate
    ? new Date(startdate.setHours(23, 59, 59, 999))
    : undefined;
  console.log(startdate, enddate);
  console.log(staffid);
  const Data = await prisma.booking.findMany({
    where: {
      staffId: staffid,
      date: {
        gte: startingdate,
        lte: endingdate,
      },
      status : status ? status :undefined
    },
    include: {
      bookedService: true,
    },
  });
  return { Data: Data ?? [] };
}
