"use server";
import prisma from "@/db";
import { equal } from "assert";
import { Playwrite_BE_VLG } from "next/font/google";
import { start } from "repl";

interface StaffAvailability {
  staffid: number;
  duration: string;
  datestr: Date;
}
interface generateslots extends StaffAvailability {
  starttime: string;
  endtime: string;
  booking: { starttime: Date; endtime: Date }[];
}

interface updatestaffavailability {
  staffId: number;
  day: string;
  isAvailable: boolean;
  startTime: string;
  endTime: string;
  datestr: Date;
}

//getAllStaff who is available
export async function getAllStaff({ datestr }: { datestr: Date }) {
  const date = datestr.toISOString().split("T")[0];

  const startOfDay = new Date(`${date}T00:00:00.000Z`);
  const endOfDay = new Date(`${date}T23:59:59.999Z`);
  console.log(datestr);
  const staffs = await prisma.staff.findMany({
    where: {
      StaffAvailability: {
        some: {
          date: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      },
    },
    select: {
      id: true,
      name: true,
      number: true,
    },
  });
  console.log(staffs);
  if (staffs) return { staffs: staffs };
}
//convert function
const convertTo24HourFormat = (time12h:string) => {
  console.log("reaching")
  const [time, modifier] = time12h.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  }
  if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:00`;
};

//staff availalbility function
export async function getstafffavailablity({
  staffid,
  duration,
  datestr,
}: StaffAvailability) {
  console.log(staffid, duration, datestr);
  const startOfDay = new Date(datestr);
  startOfDay.setUTCHours(0, 0, 0, 0);

  const endOfDay = new Date(datestr);
  endOfDay.setUTCHours(23, 59, 59, 999);
  console.log(startOfDay);
  console.log(endOfDay);
  const staff = await prisma.staff.findUnique({
    where: {
      id: staffid,
    },
    include: {
      StaffAvailability: {
        where: {
          date: {
            gte: startOfDay,
            lte: endOfDay,
          },
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

  console.log(staff);
  if (!staff || !staff.StaffAvailability) {
    console.log("returning");
    return [];
  }
  console.log("after returning");
  const date = new Date(datestr);
  const dayofweek = date.getDay();
  console.log(dayofweek)
  const { StaffAvailability, booking } = staff;

  const availability = StaffAvailability?.find(
    (avail) => avail.day === "6"
  );
  console.log("availability" + availability);
  if (!availability) {
    console.log("not availabel");
    return [];
  }
  console.log("after avaialbel");
  if (availability) {
    const slots = await generateslots({
      staffid,
      starttime: availability.startTime,
      endtime: availability.endTime,
      booking,
      duration,
      datestr,
    });
    console.log("slots" + slots);
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
  console.log(starttime , endtime , booking , duration, datestr)
  // i m letting timegap logic here
  const startTime =  convertTo24HourFormat(starttime) //convert into 24
  const endTime = convertTo24HourFormat(endtime)    //convert into 24
  const basedate = new Date(datestr)                //create base date object
  let currenttime = new Date(basedate);
  const [startHour, startMinute] = startTime.split(":").map(Number);
  currenttime.setUTCHours(startHour, startMinute, 0, 0);

 let endtimeDate = new Date(basedate);
 const [starTHour, starTMinute] = endTime.split(":").map(Number);
 endtimeDate.setUTCHours(starTHour, starTMinute, 0, 0);
  console.log(startTime)
  console.log(endTime)
 
console.log(currenttime)
console.log(endtimeDate)
console.log(datestr)
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
  console.log(startTime);
  console.log(endTime);
  const isupdate = await prisma.staffAvailability.upsert({
    where: {
      id: staffId,
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
      day: day,
      date: datestr || new Date(),
      staff: {
        connect: {
          id: staffId,
        },
      },
    },
  });
  if (!isupdate) return { error: "staff availability not updated" };
}

export async function getTodayAvailabilty({
  datestr,
  staffId,
}: {
  datestr: Date;
  staffId: number;
}) {
  const isAvailable = await prisma.staffAvailability.findFirst({
    where: {
      staffId: staffId,
    },
  });

  if (isAvailable) return { isAvailable: isAvailable.isAvailable };
}
