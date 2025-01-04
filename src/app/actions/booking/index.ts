import { prisma } from "@/db";
interface Booking {
  userid: number;
  services: { name: string; price: number; quantity: number }[];
  address: string;
  bookingtype: string;
  price: number;
  date: Date;
  time: Date;
  duration: number;
  staffid: number;
}
export default function addBooking({
  userid,
  price,
  services,
  address,
  bookingtype,
  date,
  time,
  duration,
  staffid
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
