"use server"
import prisma from "@/db";
interface getBooking {
  staffid?: number;
  userid : number;
  startdate?: Date;
  enddate?: Date;
}
interface Booking {
  userid: number;
  services: { name: string; price: number; quantity: number }[];
  address: object;
  bookingtype: string;
  price: number;
  date: Date;
  time: Date;
  duration: number;
  staffid: number;
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
  services
}: Booking) {
  try {
    const isbooking = prisma.$transaction(async (tx) => {
      await tx.booking.create({
        include: {
          bookedService: true,
        },
        data: {
          userId: userid,
          bookingType: bookingtype,
          address: address,
          price: price,
          date: date,
          starttime: time,
          endtime: new Date(time.getTime() + duration * 60000), // Example end time 1 hour after start time
          staffId: staffid,
          status: "ACCEPTED",
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
    });
    if (!isbooking) return { error: "Booking not created" };
    return { success: true };
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
      status: status as any,
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

