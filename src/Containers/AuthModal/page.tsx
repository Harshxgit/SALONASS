"use client"
import { AutoPopupAuth } from "./autcomp/authpopup";
import { useCheckAuth } from "@/hooks/checkauth";
import { useSession } from "next-auth/react";
export default function AUTHCOMP({ mode }: { mode: string }) {
  const {showAuthModal} = useCheckAuth([mode])
  console.log(showAuthModal+"hgjh")
  return <>
  {!showAuthModal && <AutoPopupAuth />}
   </>
}
