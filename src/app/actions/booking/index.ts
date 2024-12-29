import { prisma } from "@/db";
interface Booking {
  userid: number;
  services: { name: string; price: number; quantity: number }[];
  address: string;
  bookingtype: string;
  price: number;
  date: Date;
  time: string;
}
export default function addBooking({
  userid,
  price,
  services,
  address,
  bookingtype,
  date,
  time,
}: Booking) {
  try {
    const isbooking = prisma.$transaction(async (tx) => {
      const booking = await tx.booking.create({
        data: {
          userId: userid,
          bookingType: bookingtype,
          address: address,
          price: price,
          date: date,
          time: time,
        },
      });

      const bookingid = booking.id;

      tx.bookedService.create({
        data: {
          bookingId: bookingid,
          services: services.map((service) => ({
            name: service.name,
            price: service.price,
            quantity: service.quantity,
          })),
        },
      });
    });
    if (!isbooking) return { error: "Booking not created" };
    return { success: true };
  } catch (error) {
    return { error: "Booking failed" };
  }
}
