"use server";

import { prisma } from "@/db";
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
  const user = await prisma.admin.findUnique({
    where: { number: number },
  });
  return user;
}
export async function checkAdmin(){
  const isAdminexist = await prisma.admin.findFirst({
    where: { isAdmin: true },
  });
  return !!isAdminexist
} 
export async function setUser(
  firstname: string,
  lastname: string,
  number: string,
  password: string
) {
  const hashpassword = await bcrypt.hash(password, 10);
  try {
    const usercreate = await prisma.user.create({
      data: {
        name: firstname + lastname,
        number: number,
        password: hashpassword,
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
  isAdmin:boolean
) {
  const hashpassword = await bcrypt.hash(password, 10);
  try {
    const usercreate = await prisma.admin.create({
      data: {
        name: firstname + lastname,
        number: number,
        password: hashpassword,
        isAdmin:isAdmin
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
