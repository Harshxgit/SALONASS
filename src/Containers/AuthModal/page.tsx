
import { AutoPopupAuth } from "./autcomp/authpopup";
import { useCheckAuth } from "@/hooks/checkauth";
export default function AUTHCOMP({ type }: { type: string }) {
  console.log("type"+type)
  const {showAuthModal , session} = useCheckAuth([type])
  console.log("show authmodal"+showAuthModal)
   return <div>
  {!showAuthModal && <AutoPopupAuth type={type} />}
   </div>
}
