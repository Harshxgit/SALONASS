"use client"
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tag } from 'lucide-react';

const BookingInterface = () => {
  const [quantity, setQuantity] = useState(1);
  const [avoid_calling, setAvoidCalling] = useState(false);

  const serviceDetails = {
    title: "Complete honey waxing",
    originalPrice: 736,
    discountedPrice: 626,
    savings: 110,
    items: [
      "Full arms + underarms (Honey) x1",
      "Full legs (Honey) x1",
      "Threading: Eyebrow x1",
      "Threading: Upper lip x1"
    ]
  };

  const frequentlyAdded = [
    {
      title: "Hair colour/mehendi (only application)",
      price: 249,
      image: "/api/placeholder/100/100"
    },
    {
      title: "Sara fruit clear",
      price: 699,
      image: "/api/placeholder/100/100"
    }
  ];

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      {/* Savings Banner */}
      <div className="flex items-center gap-2 text-green-700">
        <Tag size={16} />
        <span>Saving ₹{serviceDetails.savings} on this order</span>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column - Booking Details */}
        <div className="space-y-4">
          {/* Phone Number Section */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Send booking details to</span>
                <span>+91 9617470129</span>
              </div>
            </CardContent>
          </Card>

          {/* Address Section */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="font-medium">Address</div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Select an address
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Slot Section */}
          <Card>
            <CardContent className="p-4">
              <div className="text-gray-600">Slot</div>
            </CardContent>
          </Card>

          {/* Payment Method Section */}
          <Card>
            <CardContent className="p-4">
              <div className="text-gray-600">Payment Method</div>
            </CardContent>
          </Card>

          {/* Cancellation Policy */}
          <div className="space-y-2">
            <h3 className="font-medium text-lg">Cancellation policy</h3>
            <p className="text-sm text-gray-600">
              Free cancellations if done more than 12 hrs before the service or if a professional isn't assigned. A fee will be charged otherwise.
            </p>
            <Button variant="link" className="p-0 h-auto text-purple-600">
              Read full policy
            </Button>
          </div>
        </div>

        {/* Right Column - Service Details */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-4">
              {/* Service Title and Price */}
              <div className="flex justify-between items-start mb-4">
                <h2 className="font-medium">{serviceDetails.title}</h2>
                <div className="text-right">
                  <div className="font-medium">₹{serviceDetails.discountedPrice}</div>
                  <div className="text-sm text-gray-500 line-through">₹{serviceDetails.originalPrice}</div>
                </div>
              </div>

              {/* Service Items */}
              <ul className="list-disc pl-5 space-y-2 mb-4">
                {serviceDetails.items.map((item, index) => (
                  <li key={index} className="text-sm text-gray-600">{item}</li>
                ))}
              </ul>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2 mb-4">
                <Button 
                  variant="outline"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3"
                >
                  -
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button 
                  variant="outline"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3"
                >
                  +
                </Button>
              </div>

              <Button variant="link" className="p-0 h-auto text-purple-600">
                Edit package
              </Button>
            </CardContent>
          </Card>

          {/* Frequently Added Together */}
          <div>
            <h3 className="font-medium mb-4">Frequently added together</h3>
            <div className="grid grid-cols-2 gap-4">
              {frequentlyAdded.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="text-sm">{item.title}</div>
                        <div className="font-medium">₹{item.price}</div>
                        <Button variant="link" className="p-0 h-auto text-purple-600">
                          Add
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Avoid Calling Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={avoid_calling}
              onChange={(e) => setAvoidCalling(e.target.checked)}
              className="rounded border-gray-300"
            />
            <label className="text-sm">Avoid calling before reaching the location</label>
          </div>

          {/* Amount to Pay */}
          <div className="flex justify-between items-center">
            <div className="font-medium">Amount to pay</div>
            <div>
              <span className="font-medium text-lg">₹675</span>
              <Button variant="link" className="text-purple-600 text-sm ml-2">
                View breakup
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingInterface;