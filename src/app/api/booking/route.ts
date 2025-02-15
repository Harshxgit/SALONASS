import { getstafffavailablity } from "@/app/actions/staff/actions"

export async function POST(req:Request){
    const {staffid , duration , datestr} = await req.json()
    const slots = await getstafffavailablity({staffid : staffid, duration: duration,datestr:datestr})
    return  Response.json({slots : slots},{status : 200})

}