"use server"
import prisma from "@/db";
import { bookingstatus } from "@prisma/client";
import  convertTo24HourFormat  from "../staff/actions";
import { Booking } from "@prisma/client";
interface getBooking {
  staffid?: number;
  userid : number;
  startdate?: Date;
  enddate?: Date;
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
  orderId : string;
  status : string;
  username : string
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
  username

}: Bookings) {
    try {
    
    const hrs = await convertTo24HourFormat(time)
    const[hours ,minute] = hrs.split(":").map(Number)
    const startTime = new Date(date)
    startTime.setUTCHours(hours,minute ,0 ,0)
    const endtime = new Date(startTime.getTime() +  40 *60000)
    const STARTTIME = new Date(startTime.toISOString())
    const ENDTIME = new Date(endtime.toISOString())
    
    const isbooking : Booking= await prisma.$transaction(async (tx) => {
      await tx.booking.create({
        include: {
          bookedService: true,
        },
        data: {
          username : username,
          userId: userid,
          bookingType: bookingtype,
          address: address,
          price: price,
          date: date,
          starttime: STARTTIME,
          endtime: ENDTIME, // Example end time 1 hour after start time
          staffId: staffid,
          status: status as bookingstatus,
          orderId : orderId,
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
      return isbooking
    }, { timeout: 10000 }

);
   
    if (!isbooking) return { error: "Booking not created" };
    return { success: true , bookingId :isbooking.id };
  } catch (error) {
    return { error: "Booking failed" };
  }
}

export async function updatebookingstatus({
  bookingid,
  status,
}: updatebookingstatus) {
  const isbooking = await prisma.booking.update({
    where: {
      id: bookingid,
    },
    data: {
      status: status as any || "CONFIRMED",
    },
  });
  if (!isbooking) return { error: "booking status not updated" };
  return { success: true };
}

//get all booking for admin
export async function getallbooking({ startdate, enddate }: getBooking) {
  const startingdate = startdate ? startdate : new Date();
  const endingdate = enddate
    ? enddate
    : startdate
    ? new Date(startdate.setHours(23, 59, 59, 999))
    : undefined;

  const isData = await prisma.booking.findMany({
    where: {
      date: {
        gte: startingdate,
        lte: endingdate,
      },
    },
  });

  if (!isData) return { error: "No booking found" };
  return isData;
}

//getallbooking for user
export async function getallbookingforuser({ userid ,startdate, enddate }: getBooking){
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
      }
})
if (!isData) return { error: "No booking found" };
return isData
}


//getallbooking for staff
export async function getallbookingforstaff({ staffid ,startdate, enddate }: getBooking){
  const startingdate = startdate ? startdate : new Date();
  const endingdate = enddate
    ? enddate
    : startdate
    ? new Date(startdate.setHours(23, 59, 59, 999))
    : undefined;

  const isData = await prisma.booking.findMany({
      where: {
        staffId: staffid,
        date: {
          gte: startingdate,
          lte: endingdate,
        }
      },
    });
  if (!isData) return { error: "No booking found" };
  return isData;
}

