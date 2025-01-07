'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

type ServiceType = 'Haircut' | 'Coloring' | 'Styling' | 'Treatment'

interface ServiceFormData {
  name: string
  price: string
  type: ServiceType
  duration: string
  images: File[]
}

export default function CreateServiceForm() {
  const [formData, setFormData] = useState<ServiceFormData>({
    name: '',
    price: '',
    type: 'Haircut',
    duration: '',
    images: []
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleTypeChange = (value: ServiceType) => {
    setFormData(prev => ({ ...prev, type: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({ ...prev, images: Array.from(e.target.files!) }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Here you would typically send the data to your backend
    // For this example, we'll just log it and show a success message
    console.log('Submitting service:', formData)

    // Simulating an API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    toast({
      title: "Service Created",
      description: `${formData.name} has been successfully added.`,
    })

    // Reset form after submission
    setFormData({
      name: '',
      price: '',
      type: 'Haircut',
      duration: '',
      images: []
    })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Service</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Service Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Service Type</Label>
            <Select onValueChange={handleTypeChange} value={formData.type}>
              <SelectTrigger>
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Haircut">Haircut</SelectItem>
                <SelectItem value="Coloring">Coloring</SelectItem>
                <SelectItem value="Styling">Styling</SelectItem>
                <SelectItem value="Treatment">Treatment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              name="duration"
              type="number"
              min="0"
              value={formData.duration}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="images">Images</Label>
            <Input
              id="images"
              name="images"
              type="file"
              onChange={handleImageUpload}
              multiple
              accept="image/*"
            />
          </div>

          <Button type="submit" className="w-full">Create Service</Button>
        </form>
      </CardContent>
    </Card>
  )
}

