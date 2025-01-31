import { NextRequest } from "next/server";
import Razorpay from "razorpay";
export default async function POST(req:NextRequest){
    try{
        const body = await req.json() 
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID || "",
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })
        const options = {
            amount : body.amount * 100 ,//convert to paise
            currency : "INR",
            receipt : `receipt_${Date.now()}`,
        }
        const order = await razorpay.orders.create(options)
        return Response.json({orderID : order.id},{status: 200})
    }catch(e){
       return Response.json({error: (e as Error).message}, {status: 500})
    }
}