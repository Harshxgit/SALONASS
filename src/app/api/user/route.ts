import { NextRequest, NextResponse } from "next/server"
import { setUser } from "@/app/actions/user"

export async function POST(req:NextRequest){
    const {firstname, lastname , number,password,role} = await req.json()
    const createusr = await setUser(firstname , lastname,number,password,role)

    if(createusr) return NextResponse.json({createusr})

}   