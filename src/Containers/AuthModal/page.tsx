"use client"
import { AutoPopupAuth } from "./autcomp/authpopup";
import { useCheckAuth } from "@/hooks/checkauth";
import { useSession } from "next-auth/react";
export default function AUTHCOMP({ type }: { type: string }) {
  const {showAuthModal} = useCheckAuth([type])
  console.log(showAuthModal+"hgjh")
  return <>
  {!showAuthModal && <AutoPopupAuth type={type} />}
   </>
}
