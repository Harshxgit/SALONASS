import { getServices } from "@/app/actions/service/servic";

export async function GET(){
    try{
        const data = await getServices()
        return Response.json({data})
    }
    catch{
        return Response.json({error:"failed to fetched"},{status:404})
    }
}