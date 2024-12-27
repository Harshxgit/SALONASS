"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { RadioGroup, RadioGroupItem } from "../../components/RadioGroup";
import useServicecart from "../store/ServiceCart";
import { Minus, Plus } from "lucide-react";

export default function ShoppingCart() {
  //zustand state management

  const { items, additems, increaseqty, decreaseqty, removeService } =useServicecart();

  const [serviceType, setServiceType] = useState("home");
  const [couponCode, setCouponCode] = useState("");
  const subtotal = useServicecart(state => state.items.reduce((sum,item)=>sum+(item.quantity *item.price),0))
  // const subtotal = items.reduce((sum, service) => sum + service.price, 0);
  const tax = subtotal * 0.1; // Assuming 10% tax
  const total = subtotal + tax;

  return (
    <div className="container mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Side */}
        <div>
          <div className="sticky top-20 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
              <Input placeholder="Enter your address" />
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Select a Slot</h2>
              <RadioGroup value={serviceType} onChange={setServiceType}>
                <RadioGroupItem value="morning" label="Morning (9AM - 12PM)" />
                <RadioGroupItem
                  value="afternoon"
                  label="Afternoon (1PM - 5PM)"
                />
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
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Added Services</h2>
              <Button variant="outline">Add Service</Button>
            </div>
            <ul className="space-y-4">
              {items.map((service) => (
                <li
                  key={service.id}
                  className="flex items-center justify-between"
                >
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
                    <button
                      onClick={() => increaseqty(service.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{service.quantity}</span>
                    <button
                      onClick={() => {
                        if(service.quantity ==1) return removeService(service.id)
                        decreaseqty(service.id)
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold min-w-[80px] text-right">
                      ${(service.price * service.quantity).toFixed(2)}
                    </span>
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
  );
}
