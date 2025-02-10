'use client'
import React, { JSX, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  Flame 
} from 'lucide-react';

const BookingHistory = () => {
  const [filter, setFilter] = useState('all');

  const bookings = [
    {
      id: 'SB-2024-001',
      service: 'Complete honey waxing',
      date: '15 Jan 2024',
      time: '2:00 PM',
      status: 'done',
      price: 675,
      professional: 'Sara',
      location: 'Home Service'
    },
    {
      id: 'SB-2024-002',
      service: 'Salon Prime for kids & men',
      date: '22 Jan 2024',
      time: '11:00 AM', 
      status: 'confirmed',
      price: 3522,
      professional: 'John',
      location: 'Salon Branch'
    },
    {
      id: 'SB-2024-003',
      service: 'Hair Coloring',
      date: '05 Feb 2024',
      time: '4:30 PM',
      status: 'cancelled',
      price: 1200,
      professional: '-',
      location: 'Home Service'
    }
  ];

  type BookingStatus = 'done' | 'confirmed' | 'cancelled';
  
  const statusIcons: Record<BookingStatus, JSX.Element> = {
    done: <CheckCircle2 className="text-green-500" />,
    confirmed: <Clock className="text-blue-500" />,
    cancelled: <XCircle className="text-red-500" />
  };

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === filter);

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Booking History</h1>

      <div className="flex gap-2 mb-4">
        {['all', 'done', 'confirmed', 'cancelled'].map(status => (
          <Button
            key={status}
            variant={filter === status ? 'default' : 'outline'}
            onClick={() => setFilter(status)}
            className="capitalize"
          >
            {status}
          </Button>
        ))}
      </div>

      {filteredBookings.map(booking => (
        <Card key={booking.id}>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                {statusIcons[booking.status as BookingStatus]}
                <span className="font-medium capitalize">{booking.status}</span>
              </div>
              <span className="text-gray-500">Booking ID: {booking.id}</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{booking.service}</h3>
              
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={16} />
                <span>{booking.date} at {booking.time}</span>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <div>Professional: {booking.professional}</div>
                  <div>Location: {booking.location}</div>
                </div>
                <div className="font-bold text-lg">₹{booking.price}</div>
              </div>
            </div>

            {booking.status === 'done' && (
              <Button variant="outline" className="mt-3 w-full">
                Rebook Service
              </Button>
            )}
            {booking.status === 'confirmed' && (
              <div className="flex gap-2 mt-3">
                <Button variant="outline" className="flex-1">
                  Modify
                </Button>
                <Button variant="destructive" className="flex-1">
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BookingHistory;