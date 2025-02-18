import addBooking from "@/app/actions/booking/actions"
import { getstafffavailablity } from "@/app/actions/staff/actions"

// export async function POST(req:Request){
//     const {staffid , duration , datestr} = await req.json()
//     const slots = await getstafffavailablity({staffid : staffid, duration: duration,datestr:datestr})
//     return  Response.json({slots : slots},{status : 200})

// }
export async function POST(req:Request){
    const {staffid , duration , date,userid,price,address,bookingtype,time,services,orderId,status,username} = await req.json()
    const slots = await addBooking({username : username ,staffid : staffid, duration: duration,userid:userid,price:price,address:address,bookingtype:bookingtype,date:date,time:time,services:services,orderId:orderId,status:status})
    return  Response.json({slots : slots},{status : 200})

}