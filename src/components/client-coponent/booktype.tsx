import { useState } from "react"
import { Button } from "@/components/ui/button"
import { UseFormSetValue, FieldValues } from "react-hook-form"
import { FormValues } from "@/app/checkout/page"
type ServiceType = "IN-SALON" | "IN-HOME"

interface ServiceTypeSelectorProps {
  setValue : UseFormSetValue<FormValues>
}

export default function ServiceTypeSelector({  setValue}: ServiceTypeSelectorProps) {
  const [selectedType, setSelectedType] = useState<ServiceType | null>(null)

  const handleSelect = (type: ServiceType) => {
    setSelectedType(type)
     setValue("bookingType" , type )
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-lg font-semibold mb-2">Select Service Type</h2>
      <div className="flex space-x-4">
        <Button
          variant={selectedType === "IN-SALON" ? "default" : "outline"}
          className={`w-32 ${selectedType === "IN-SALON" ? "bg-primary text-primary-foreground" : "bg-background text-foreground"}`}
          onClick={() => handleSelect("IN-SALON")}
        >
          IN-SALON
        </Button>
        <Button
          variant={selectedType === "IN-HOME" ? "default" : "outline"}
          className={`w-32 ${selectedType === "IN-HOME" ? "bg-primary text-primary-foreground" : "bg-background text-foreground"}`}
          onClick={() => handleSelect("IN-HOME")}
        >
          IN-HOME
        </Button>
      </div>
    </div>
  )
}

