"use client"

import { useState } from "react"
import { PopupDialog } from "./popupdialog"
import { ModernAuthForm } from "./authform"

export function AutoPopupAuth() {
  const [showAuth, setShowAuth] = useState(true)

  const handleAuthSuccess = () => {
    setShowAuth(false)
    // Add your logic here for what happens after successful authentication
  }

  return (
    <PopupDialog title="Welcome" description="Please sign in or create an account to continue" autoOpen={showAuth} >
      <ModernAuthForm onAuthSuccess={handleAuthSuccess} />
    </PopupDialog>
  )
}

