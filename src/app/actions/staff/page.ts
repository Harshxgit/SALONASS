import { prisma } from "@/db";

interface StaffAvailability {
  staffid: number;
  duration: string;
  datestr: Date;
}
interface generateslots extends StaffAvailability {
  starttime: string;
  endtime: string;
  booking: { starttime: string; endtime: string }[];
}
export async function getstafffavailablity({
  staffid,
  duration,
  datestr,
}: StaffAvailability) {
  const staff = await prisma.staff.findUnique({
    where: {
      id: staffid,
    },
    include: {
      StaffAvailability: {
        where: {
          date: datestr,
        },
        select: {
          isAvailable: true,
        },
      },
      booking: {
        where: {
          date: datestr,
        },
        select: {
          starttime: true,
          endtime: true,
        },
      },
    },
  });

  if (!staff || !staff.StaffAvailability) {
    return [];
  }

  const { StaffAvailability, booking } = staff;
  const availability = StaffAvailability?.map((avail) => avail.isAvailable);

  if (!availability) {
    return [];
  }
  if (availability) {
  }
}

function generateslots({
  starttime,
  endtime,
  booking,
  duration,
  datestr,
}: generateslots) {
  const slots = [];

  // i m letting timegap logic here
  let currenttime = new Date(starttime);
  let endtimeDate = new Date(endtime);
  while (currenttime < endtimeDate) {
    const endslot = new Date(
      currenttime.getTime() + parseInt(duration) * 60000
    );

    const isSlotAvailable = !booking.some((book) => {
      const bookstarttime = new Date(book.starttime);
      const bookendtime = new Date(book.endtime);

      return (
        (currenttime >= bookstarttime && currenttime < bookendtime) ||
        (endslot > bookstarttime && endslot <= bookendtime) ||
        (currenttime < bookstarttime && endslot > bookendtime)
      );
    });
   
      slots.push(
        currenttime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        isSlotAvailable
      );
      currenttime.setMinutes(currenttime.getMinutes() + 15);
  }
}
