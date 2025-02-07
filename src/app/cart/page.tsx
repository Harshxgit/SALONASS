import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, UserCircle2 } from 'lucide-react';

const CartInterface = () => {
  const cartItems = [
    {
      name: "Salon Prime for kids & men",
      services: [
        "Haircut for kids X 1",
        "Face care & beyond X 1", 
        "Wedding ready package X 1"
      ],
      price: 3522,
      icon: "/api/placeholder/48/48"
    },
    {
      name: "Salon Prime",
      services: [
        "Complete honey waxing X 1"
      ],
      price: 626,
      icon: "/api/placeholder/48/48"
    }
  ];

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <div className="flex items-center gap-2 text-purple-600 font-medium">
        <ShoppingCart size={24} />
        <h2>Your cart</h2>
      </div>

      {cartItems.map((item, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <img 
                src={item.icon} 
                alt="Service icon" 
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <div className="text-gray-500 text-sm">
                  {item.services.length} services • ₹{item.price}
                </div>
              </div>
            </div>

            <div className="space-y-1 mb-3">
              {item.services.map((service, serviceIndex) => (
                <div key={serviceIndex} className="text-sm text-gray-600">
                  • {service}
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <Button variant="outline">Add Services</Button>
              <Button className="bg-purple-600 hover:bg-purple-700">Checkout</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CartInterface;