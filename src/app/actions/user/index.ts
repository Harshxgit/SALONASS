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
  const user = await prisma.staff.findUnique({
    where: { number: number },
  });
  return user;
}
export async function checkAdmin(){
  const isAdminexist = await prisma.staff.findFirst({
    where: { isAdmin: true },
  });
  return !!isAdminexist
} 
import { ROLE } from "@prisma/client"; // Import the ROLE type from Prisma client

export async function setUser(
  firstname: string,
  lastname: string,
  number: string,
  password: string,
  role : ROLE
) {
  const hashpassword = await bcrypt.hash(password, 10);
  try {
    const usercreate = await prisma.user.create({
      data: {
        name: firstname + lastname,
        number: number,
        password: hashpassword,
        role : role || "USER"
      },
    });
    if (usercreate) {
      revalidatePath("/signup");
      return { sucess: true };
    } else {
      return { error: "Data not submitted" };
    }
  } catch (error) {
    return { error: "fail" };
  }
}

export async function setAdmin(
  firstname: string,
  lastname: string,
  number: string,
  password: string,
  isAdmin:boolean,
  role : ROLE
) {
  const hashpassword = await bcrypt.hash(password, 10);
  try {
    const usercreate = await prisma.staff.create({
      data: {
        name: firstname + lastname,
        number: number,
        password: hashpassword,
        isAdmin:isAdmin,
        Role : role || "STAFF"
      },
    });
    if (usercreate) {
      revalidatePath("/signup");
      return { sucess: true };
    } else {
      return { error: "Data not submitted" };
    }
  } catch (error) {
    return { error: "fail" };
  }
}
