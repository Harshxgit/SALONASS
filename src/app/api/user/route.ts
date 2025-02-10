"use server"
import { NextRequest, NextResponse } from "next/server"
import { setUser } from "@/app/actions/user/actions"

export async function POST(req:NextRequest){
    const {name,  number,password,type} = await req.json()
    const createusr = await setUser({name : name, number : number , password :password , role : type})

    if(createusr) return NextResponse.json({createusr})

}   
//