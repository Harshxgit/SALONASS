import { useSession } from "next-auth/react";
import { useState , useEffect } from "react";

export default function checkAuth(requiredRole ?:'CLIENT'|'STAFF'|'ADMIN') {
    const { data: session, status } = useSession();
    const [showAuthModal, setShowAuthModal] = useState(false)
    if(status === "unauthenticated"){
        if(!requiredRole || requiredRole === 'CLIENT'){
            setShowAuthModal(true)
        }      
            else if(requiredRole === 'STAFF' && session?.user?.role !== 'STAFF'){
                setShowAuthModal(true)                

            }
    }
    else if(status === "authenticated"){
        if(requiredRole === 'STAFF' && session?.user?.role !== 'STAFF'){
            setShowAuthModal(true)                

        }
    }
    return {
        session,
        showAuthModal,
        status,
        setShowAuthModal
    }
}