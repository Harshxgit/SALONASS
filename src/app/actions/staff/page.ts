import { prisma } from "@/db";

interface StaffAvailability{
    staffid : number;
    duration : string;
    datestr : Date
}
export async function getstafffavailablity({staffid, duration,datestr}:StaffAvailability) {
    
    const staff = prisma.staff.findUnique({
        where: {
            id: staffid
        },
        include: {
            StaffAvailability: {
                where: {
                    date: datestr
                }
            }
        }
    })

    


}
