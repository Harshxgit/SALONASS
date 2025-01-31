import { NextRequest , NextResponse } from "next/server";
import crypto from 'crypto'

const generatedSignature =(razopayOrderId : string , razorpayPaymentId : string)=>{
    const keySecret = process.env.RAZORPAY_KEY_SECRET
    if(!keySecret){
        throw new Error('Razorpay key secret is not defined in enviornment vaiable')
    }
    const sig = crypto.createHmac('sha256 ',keySecret).update(razopayOrderId + '|' + razorpayPaymentId)
    return sig;
}

export async function POST(request:NextRequest){
        const {orderCerationId , razorpayPaymentId , razorpaySignature}   = await request.json() 

        const signature = generatedSignature(orderCerationId , razorpayPaymentId)
        if(signature !==razorpaySignature){
            return NextResponse.json({message : 'payment verification faild'},{status:400})
        }
        return NextResponse.json({message : 'payament verified successfully' , isOk:false },{status:200})
}