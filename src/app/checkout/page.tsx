import React, { useState } from 'react'
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
import { LoaderCircle } from "lucide-react";
export default function page() {
    const router = useRouter()
    const params = useSearchParams()
    const amount = params.get("amount")
    const [loading , setLoading] = useState(false)
    const idRef = React.useRef(null)
    const createrOrderId = async()=>{
        try{
            const response = await fetch("api/order",{
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
            const id = data.orderId
            idRef.current = id
        }catch{
            
        }
    }
  return (
    <div>page</div>
  )
}
