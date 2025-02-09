"use server";

import prisma from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { promises } from "dns";
export async function findUser(number: string) {
  const user = await prisma.user.findUnique({
    where: { number: number },
  });
  return user;
}
export async function findStaff(number: string) {
  if(!number) throw new Error("number is not existed")
  const user = await prisma.staff.findUnique({
    where: { number: number },
  });
  return user;
}
import { ROLE } from "@prisma/client"; // Import the ROLE type from Prisma client

export async function checkAdmin(){
  const isAdminexist = await prisma.staff.findFirst({
    where: { isAdmin: true },
  });
  return !!isAdminexist
} 
export async function setUser({ name, number, password, role }: {
  name :string
  number: string,
  password: string,
  role : ROLE
}
) {
  console.log("entered")
  const hashpassword = await bcrypt.hash(password, 10);
  try {
    const usercreate = await prisma.user.create({
      data: {
        name: name,
        number: number,
        password: hashpassword,
        role : role || "USER"
      },
    });
    if (usercreate) {
      // revalidatePath("/signup");
      return { sucess: true };
    } else {
      return { error: "Data not submitted" };
    }
  } catch (error) {
    return { error: error };
  }
}

export async function setAdmin({name , password , number , isAdmin , role }:{
  name : string,
  number: string,
  password: string,
  isAdmin:boolean,
  role : ROLE
}
) {
  console.log(name , password , number , isAdmin , role)
  const hashpassword = await bcrypt.hash(password, 10);
  try {
    console.log("inadmin")
    const usercreate = await prisma.staff.create({
      data: {
        name: name,
        number: number,
        password: hashpassword,
        isAdmin: isAdmin,
        Role: role
      }
    })
    console.log(usercreate)
    if (usercreate) {
      // revalidatePath("/signup");
      return { sucess: true };
    } else {
      return { error: "Data not submitted" };
    }
  } catch (error) {
    return { error: "fail" };
  }
}
