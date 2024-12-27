'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { RadioGroup, RadioGroupItem } from '../../components/RadioGroup'

export default function ShoppingCart() {
  const [serviceType, setServiceType] = useState('home')
  const [couponCode, setCouponCode] = useState('')

  // Mock data for added services
  const [addedServices, setAddedServices] = useState([
    { id: 1, name: 'Haircut', price: 50, image: '/placeholder.svg?height=80&width=80' },
    { id: 2, name: 'Manicure', price: 75, image: '/placeholder.svg?height=80&width=80' },
    { id: 3, name: 'Facial', price: 100, image: '/placeholder.svg?height=80&width=80' },
  ])

  const subtotal = addedServices.reduce((sum, service) => sum + service.price, 0)
  const tax = subtotal * 0.1 // Assuming 10% tax
  const total = subtotal + tax

  const addService = () => {
    const newService = {
      id: addedServices.length + 1,
      name: `New Service ${addedServices.length + 1}`,
      price: 50,
      image: '/placeholder.svg?height=80&width=80'
    }
    setAddedServices([...addedServices, newService])
  }

  const removeService = (id: number) => {
    setAddedServices(addedServices.filter(service => service.id !== id))
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Side */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
            <Input placeholder="Enter your address" />
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Select a Slot</h2>
            <RadioGroup value={serviceType} onChange={setServiceType}>
              <RadioGroupItem value="morning" label="Morning (9AM - 12PM)" />
              <RadioGroupItem value="afternoon" label="Afternoon (1PM - 5PM)" />
              <RadioGroupItem value="evening" label="Evening (6PM - 9PM)" />
            </RadioGroup>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Service Type</h2>
            <RadioGroup value={serviceType} onChange={setServiceType}>
              <RadioGroupItem value="home" label="Home Service" />
              <RadioGroupItem value="appointment" label="Appointment" />
            </RadioGroup>
          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Added Services</h2>
              <Button onClick={addService} variant="outline">
                Add Service
              </Button>
            </div>
            <ul className="space-y-4">
              {addedServices.map((service) => (
                <li key={service.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={service.image}
                      alt={service.name}
                      width={80}
                      height={80}
                      className="rounded-md"
                    />
                    <span className="font-medium">{service.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-bold">${service.price.toFixed(2)}</span>
                    <Button 
                      onClick={() => removeService(service.id)} 
                      variant="outline"
                    >
                      Remove
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Payment Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Coupon</h2>
            <div className="flex space-x-2">
              <Input 
                placeholder="Enter coupon code" 
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <Button variant="outline">Apply</Button>
            </div>
          </div>

          <div className="flex justify-end">
            <Button className="w-full md:w-auto">
              Next: Amount to Pay ${total.toFixed(2)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

