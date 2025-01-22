'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import useAdminService from '@/app/store/adminservice'
import Service from '@/types/service'

interface PackageFormData {
  name: string
  price: string
  duration: string
  services: Service[]
}

export default function CreatePackageForm() {
  const [isLoading, setLoading] = useState(false);
  const service = useAdminService((state) => state.items);
  const [formData, setFormData] = useState<PackageFormData>({
    name: '',
    price: '',
    duration: '',
    services:[]

  })

  console.log(formData)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const selectService = (value: string) => {
    const item = service.find(s => s.servicename === value);
    if (item) {
      setFormData(prev => {
        const isSelected = prev.services.includes(item);
        const items = isSelected ? prev.services.filter((service: Service) => service.id !== item.id) : [...prev.services, item];
        return { ...prev, services: items };
      });
    }
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

    setLoading(true)
    await 
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
      duration: '',
      services: []
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
            <Select onValueChange={selectService} value={formData.services.map(s => s.servicename.slice(1,4)).join(', ')}>
              <SelectTrigger>
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                {
                  service.map((service) => (
                   <SelectItem key={service.id} value={service.servicename}>{service.servicename}</SelectItem> 
                  ))
                }
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

