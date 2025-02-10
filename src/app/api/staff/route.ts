"use server"
import { NextRequest, NextResponse } from "next/server"
import { setAdmin, setUser } from "@/app/actions/user/actions"

export async function POST(req:NextRequest){
    const {name, isAdmin , number,password,type} = await req.json()
    const createusr = await setAdmin({
        name : name,
        number:number,
        password:password,
        isAdmin:isAdmin,
        role:type
      })

    if(createusr) return NextResponse.json({createusr})

}   