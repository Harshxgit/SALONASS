import createService, { getServices } from "@/app/actions/service/servic";
import { NextRequest } from "next/server";

export async function GET(){
    try{
        console.log("first")
        const data = await getServices()
        console.log(data)
        return Response.json(data)
    }
    catch{
        return Response.json({error:"failed to fetched"},{status:404})
    }
}
export async function POST(req:NextRequest){
        const { servicename, price, duration, type } = await req.json()

        const isCreated = await createService({ servicename, price, duration, type })
        if(isCreated) return Response.json({isCreated})
 }