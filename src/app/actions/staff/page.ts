import { prisma } from "@/db";

interface StaffAvailability {
  staffid: number;
  duration: string;
  datestr: Date;
}
interface generateslots extends StaffAvailability {
  starttime: Date;
  endtime: Date;
  booking: { starttime: Date; endtime: Date }[];
}

interface updatestaffavailability {
  staffId: number;
  day: string;
  isAvailable: boolean;
  startTime: Date;
  endTime: Date;
  datestr: Date;
}
//staff availalbility function
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
          startTime: true,
          endTime: true,
          day: true,
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
  const dayofweek = new Date(datestr.getDay()).toString().toUpperCase();
  const { StaffAvailability, booking } = staff;
  const availability = StaffAvailability?.find(
    (avail) => avail.isAvailable === true && avail.day === dayofweek
  );

  if (!availability) {
    return [];
  }
  if (availability) {
    const slots = await generateslots({
      staffid,
      starttime: availability.startTime,
      endtime: availability.endTime,
      booking,
      duration,
      datestr,
    });
    return slots;
  }
}

//genrate slots
async function generateslots({
  starttime,
  endtime,
  booking,
  duration,
  datestr,
}: generateslots) {
  const slots = [];

  // i m letting timegap logic here
  let currenttime = new Date(`{datestr}T${starttime}`);
  let endtimeDate = new Date(`${datestr}T${endtime}`);
  while (currenttime < endtimeDate) {
    currenttime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const endslot = new Date(
      currenttime.getTime() + parseInt(duration) * 60000
    );

    const isSlotAvailable = !booking.some((book) => {
      const bookstarttime = book.starttime;
      const bookendtime = book.endtime;

      return (
        (currenttime >= bookstarttime && currenttime < bookendtime) ||
        (endslot > bookstarttime && endslot <= bookendtime) ||
        (currenttime < bookstarttime && endslot > bookendtime)
      );
    });

    slots.push({
      time: currenttime,
      availabel: isSlotAvailable,
    });
    currenttime.setMinutes(currenttime.getMinutes() + 15);
  }
  return slots;
}

//staff updateability function
export async function updatestaffavailability({
  datestr,
  staffId,
  day,
  isAvailable,
  startTime,
  endTime,
}: updatestaffavailability) {
  const isexsit = await prisma.staffAvailability.findFirst({
    where: {
      staffId: staffId,

      date: datestr,
    },
  });
  if (isexsit) {
    const isupdate = await prisma.staffAvailability.upsert({
      where: {
        id: isexsit.id,
      },
      update: {
        isAvailable: isAvailable,
        startTime: startTime,
        endTime: endTime,
      },
      create: {
        isAvailable: isAvailable,
        startTime: startTime,
        endTime: endTime,
        day,
        staffId,
        date: datestr,
      },
    });
    if(!isupdate) return {error:"staff availability not updated"}
    return {success:true}
  }
  
}
