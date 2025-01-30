"use client"
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export  function useCheckAuth(allowedRoles: string[]) {
  const { data: session, status } = useSession();
  const [showAuthModal, setShowAuthModal] = useState(false);
  useEffect(() => {
    if (status === "unauthenticated") {
      if (!allowedRoles) {
        setShowAuthModal(true);
      }
    }
    if (status === "authenticated") {
      if (allowedRoles && allowedRoles.length > 0) {
        const isRoleAllowed = allowedRoles.includes(session.user.role);
        setShowAuthModal(isRoleAllowed);
      }
    }
  }, [status, session, allowedRoles]);
  return {
    session,
    showAuthModal,
    status,
    setShowAuthModal,
  };
}
