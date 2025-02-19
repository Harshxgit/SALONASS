import addBooking, {
    getallbooking,
  getallbookingforstaff,
} from "@/app/actions/booking/actions";
import { getstafffavailablity } from "@/app/actions/staff/actions";
import { start } from "repl";

// export async function POST(req:Request){
//     const {staffid , duration , datestr} = await req.json()
//     const slots = await getstafffavailablity({staffid : staffid, duration: duration,datestr:datestr})
//     return  Response.json({slots : slots},{status : 200})

// }
export async function POST(req: Request) {
  const {
    staffid,
    duration,
    date,
    userid,
    price,
    address,
    bookingtype,
    time,
    services,
    orderId,
    status,
    username,
    staffName
  } = await req.json();
  const slots = await addBooking({
    username: username,
    staffid: staffid,
    duration: duration,
    userid: userid,
    price: price,
    address: address,
    bookingtype: bookingtype,
    date: date,
    time: time,
    services: services,
    orderId: orderId,
    status: status,
    staffName : staffName
  });
  if(!slots) return Response.json({slots},{status:404})
  return Response.json({ slots: slots }, { status: 200 });
}
export async function GET(req: Request) {
  const url = new URL(req.url);
  const staffid = Number(url.searchParams.get("staffid"));
  const startdate = url.searchParams.get("startdate");
  const enddtate = url.searchParams.get("enddate");
  const starttdate = startdate ? new Date(startdate) : new Date(); // Convert to Date or null
  const enddate = enddtate ? new Date(enddtate) : new Date();
  console.log(starttdate,enddate)
  const DATA = await getallbooking({
    staffid: staffid,
    startdate: starttdate,
    enddate: enddate,
  });
  return Response.json({ Data: DATA }, { status: 200 });
}
