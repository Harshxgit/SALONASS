'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import createService from "@/app/actions/service/servic"
import { getSignedURL } from '@/app/actions/awsS3'
type ServiceType = 'Haircut' | 'Coloring' | 'Styling' | 'Treatment'

interface ServiceFormData {
  name: string
  price: number
  type: ServiceType
  duration: Date
  images: File[]
}

export default function CreateServiceForm() {
    
  const [formData, setFormData] = useState<ServiceFormData>({
    name: '',
    price: 0,
    type: 'Haircut',
    duration: new Date(),
    images: []
  })
  const [isLoading , setLoading] = useState(false)
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
    setLoading(true)
    // Here you would typically send the data to your backend
    // For this example, we'll just log it and show a success message

    // const imageUrls = await Promise.all(formData.images.map(file => {
    //   return new Promise<string>((resolve, reject) => {
    //     const reader = new FileReader() //file reader api 
    //     reader.onload = () => resolve(reader.result as string)
    //     reader.onerror = error => reject(error)
    //     reader.readAsDataURL(file)
    //   })
    // }))
    const service =  await createService({
      servicename: formData.name,
      price: formData.price,
      duration: formData.duration
    })

    const url = getSignedURL(formData.images.length ||0  ,formData.type, service.serviceid || 0)

    // Simulating an API call
    // await new Promise(resolve => setTimeout(resolve, 1000))

    toast({
      title: "Service Created",
      description: `${formData.name} has been successfully added.`,
    })
    

    // Reset form after submission
    setFormData({
      name: '',
      price: 0,
      type: 'Haircut',
      duration: new Date(),
      images: []
    })
    setLoading(false)
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
              // value={formData.duration}
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

          <Button type="submit" className="w-full" disabled={isLoading}>Create Service</Button>
        </form>
      </CardContent>
    </Card>
  )
}

