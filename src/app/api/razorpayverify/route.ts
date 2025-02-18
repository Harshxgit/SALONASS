"use server"
import { NextRequest , NextResponse } from "next/server";
import crypto, { sign } from 'crypto'
import { updatebookingstatus } from "@/app/actions/booking/actions";

const generatedSignature =(orderCreationId : string , razorpayPaymentId : string)=>{
    const keySecret = process.env.RAZORPAY_KEY_SECRET
    
    if(!keySecret){
        throw new Error('Razorpay key secret is not defined in enviornment vaiable')
    }
    const sig = crypto.createHmac('sha256',keySecret).update(orderCreationId + '|' + razorpayPaymentId).digest('hex')
    return sig;
}

export async function POST(request:NextRequest){
        const {orderCreationId , razorpayPaymentId , razorpaySignature,bookingId  }   = await request.json() 
        const signature = generatedSignature(orderCreationId , razorpayPaymentId)
            if(signature !==razorpaySignature){
            return NextResponse.json({message : 'payment verification faild',isOk:false},{status:400})
        }
        await updatebookingstatus(bookingId)
        return NextResponse.json({message : 'payament verified successfully' , isOk:true },{status:200})
}