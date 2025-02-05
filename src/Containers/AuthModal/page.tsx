"use server"
import { AutoPopupAuth } from "./autcomp/authpopup";
import { useCheckAuth } from "@/hooks/checkauth";
export default function AUTHCOMP({ type }: { type: string }) {
  const {showAuthModal} = useCheckAuth([type])
   return <>
  {!showAuthModal && <AutoPopupAuth type={type} />}
   </>
}
