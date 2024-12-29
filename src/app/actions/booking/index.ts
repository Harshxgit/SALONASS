import { prisma } from "@/db";
interface Booking {
  userid: number;
  services: { name: string; price: number; quantity: number }[];
  address: string;
}
export default function addBooking({ userid, services, address }: Booking) {
    try {
        const booking = prisma.booking.create({
        data: {
            userid,
            services: services.map((service) => ({
            name: service.name,
            price: service.price,
            quantity: service.quantity,
            })),
            address,
        
}
})
if (!booking) return { error: "Booking not created" };
return { success: true };
    } catch (error) {
        return { error: "Booking failed" };        
    }
}