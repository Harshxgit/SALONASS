import { NextRequest, NextResponse } from "next/server"
import { setUser } from "@/app/actions/user"

export async function POST(req:NextRequest){
    const {firstname, lastname , number,password} = await req.json()
    const createusr = await setUser(firstname , lastname,number,password)

    if(createusr) return NextResponse.json({createusr})

}   