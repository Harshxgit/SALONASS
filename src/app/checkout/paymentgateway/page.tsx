"use client"
import React, { Suspense, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";
import { Currency, LoaderCircle } from "lucide-react";


declare global {
  interface Window {
    Razorpay: any;
  }
}

 function Paymentpagecontent() {
    const router = useRouter()
    const params = useSearchParams()
    const amount = params.get("amount")
    const [loading , setLoading] = useState(false)
    const idRef = React.useRef<string | null>(null)
    console.log(amount)
    useEffect(()=>{
        if(!amount){
            router.replace('/')
        }
        createrOrderId()
    },[])
    const createrOrderId = async()=>{
        try{
            const response = await fetch("api/razorpay",{
                method : "POST",
                headers:{
                    "content-Type" : "application/json"
                },
                body :JSON.stringify({
                    amount : parseInt(amount!) *100
                })
            })
            if(!response.ok){
                throw new Error("Network response was not ok")
            }
            const data = await response.json();
            // console.log(data)
            const id = data.orderID
            console.log(id)
            idRef.current  = id
            return 
        }catch(error){
            console.error("There was a problem with your fetch operation:", error);
        }
    }
    const processPayment = async(e:React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault()
            setLoading(true)
            const orderId = idRef.current
            console.log(orderId)
            try{
                const options = {
                    key : process.env.RAZORPAY_KEY_ID ,
                    amount : parseFloat(amount!) * 100,
                    currency : "INR",
                    name :"ClassOne" ,
                    description : "classonepayment",
                    order_id:orderId, 
                    handler : async function (response:any){
                        const data ={
                            orderCreationId: orderId,
                            razorpayPaymentId : response.razorpay_payment_id,
                            razorpayOrderId  :response.razorpay_order_id,
                            razorpaySignature :response.razorpay_signature,
                        }
                        const result = await fetch("/api/razorpayverify",{
                            method : "POST",
                            body : JSON.stringify(data),
                            headers : {"Content-Type":"application/json",}
                        })
                        const res =await result.json();
                        if(res.isOk) router.push("/")
                            else{
                                alert(res.message)
                        }
                    },
                    theme :{
                        color :"#3399cc"
                    },
                }
                console.log("clicking")
                const paymentObject = new window.Razorpay(options)
                paymentObject.on("payment.failed",function(response:any){
                    alert(response.error.description)
                })
                setLoading(false)
                paymentObject.open()
            }catch(error){
                console.log(error)
            }
    };
  return (
    <>
    
     <section className="container h-screen flex flex-col justify-center items-center gap-10">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
          Checkout
        </h1>
        <Card className="max-w-[25rem] space-y-8">
          <CardHeader>
            <CardTitle className="my-4">Continue</CardTitle>
            <CardDescription>
              By clicking on pay you'll purchase your plan subscription of Rs{" "}
              {amount}/month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={processPayment}>
              <Button className="w-full" type="submit">{loading?"...loading":"Pay"}</Button>
            </form>
          </CardContent>
          <CardFooter className="flex">
            <p className="text-sm text-muted-foreground underline underline-offset-4">
              Please read the terms and conditions.
            </p>
          </CardFooter>
        </Card>
      </section>
    </>
  )
}

export default function page (){
  return <>
   <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
     
      />
      <Suspense fallback={<div>Loading payment page...</div>}>
          <Paymentpagecontent />
      </Suspense>
  </>
}