"use client"

import { useState } from "react"
import { PopupDialog } from "./popupdialog"
import { ModernAuthForm } from "./authform"

export function AutoPopupAuth({type}: {type: string}) {
  const [showAuth, setShowAuth] = useState(true)

  const handleAuthSuccess = () => {
    setShowAuth(false)
    // Add your logic here for what happens after successful authentication
  }

  return (
    <PopupDialog title="CLASS-ONE" description="UNISEX SALON" autoOpen={showAuth}>
      <ModernAuthForm onAuthSuccess={handleAuthSuccess} type={type} />
    </PopupDialog>
  )
}

