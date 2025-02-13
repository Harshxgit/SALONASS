
import { AutoPopupAuth } from "./autcomp/authpopup";
import { useCheckAuth } from "@/hooks/checkauth";
export default function AUTHCOMP({ type }: { type: string }) {

  const {showAuthModal , session} = useCheckAuth([type])

   return <div>
  {!showAuthModal && <AutoPopupAuth type={type} />}
   </div>
}
