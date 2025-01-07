import { Service } from '@/types/packages'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface ServiceDetailsModalProps {
  service: Service | null
  isOpen: boolean
  onClose: () => void
}

export default function ServiceDetailsModal({ service, isOpen, onClose }: ServiceDetailsModalProps) {
  if (!service) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{service.name}</DialogTitle>
          <DialogDescription>Service Details</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <p><strong>Description:</strong> {service.description}</p>
          <p><strong>Duration:</strong> {service.duration} minutes</p>
          <p><strong>Price:</strong> ${service.price}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

