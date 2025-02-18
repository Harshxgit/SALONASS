"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface PopupDialogProps {
  title: string
  description?: string
  children: React.ReactNode
  autoOpen?: boolean
}

export function PopupDialog({ title, description, children, autoOpen = false }: PopupDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (autoOpen) {
      const timer = setTimeout(() => setIsOpen(true), 1000) // Open after 1 second
      return () => clearTimeout(timer)
    }
  }, [autoOpen])

  return (
    <Dialog open={isOpen}  >
      <DialogContent className="sm:max-w-[425px] bg-transparent border-none shadow-none fixed z-50 overflow-y-auto transition-opacity duration-300">
        <DialogHeader className="bg-primary-content rounded-t-lg p-4 -mb-3">
          <DialogTitle className="text-center text-2xl">{title}</DialogTitle>
          {description && <DialogDescription className="text-center">{description}</DialogDescription>}
        </DialogHeader>
        <div className="bg-white rounded-b-lg">{children}</div>
      </DialogContent>
    </Dialog>
  )
}

