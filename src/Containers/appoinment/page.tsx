import React, { useState } from 'react';
import { Clock, Calendar, Scissors } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const DynamicBookingSystem = () => {
  // Services with durations
  const [services] = useState([
    { id: 1, name: 'Haircut', duration: 60 },
    { id: 2, name: 'Hair Color', duration: 90 },
    { id: 3, name: 'Style & Blow Dry', duration: 75 }
  ]);

  // Staff with their bookings
  const [staffMembers, setStaffMembers] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      workingHours: { start: '10:00', end: '20:00' },
      bookings: [] // Will store booked appointments
    }
  ]);

  const [selectedService, setSelectedService] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Function to check if time slot conflicts with existing bookings
  const isTimeSlotBooked = (staffId, startTime, duration) => {
    const staff = staffMembers.find(s => s.id === staffId);
    if (!staff) return true;

    const appointmentEnd = new Date(startTime.getTime() + duration * 60000);
    
    return staff.bookings.some(booking => {
      const bookingStart = new Date(booking.startTime);
      const bookingEnd = new Date(booking.endTime);
      
      return (
        (startTime >= bookingStart && startTime < bookingEnd) ||
        (appointmentEnd > bookingStart && appointmentEnd <= bookingEnd) ||
        (startTime <= bookingStart && appointmentEnd >= bookingEnd)
      );
    });
  };

  // Generate available time slots
  const getAvailableTimeSlots = (staffMember) => {
    if (!staffMember || !selectedService) return [];

    const slots = [];
    const today = new Date();
    const startHour = parseInt(staffMember.workingHours.start.split(':')[0]);
    const endHour = parseInt(staffMember.workingHours.end.split(':')[0]);

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const slotTime = new Date(today.setHours(hour, minute));
        const isAvailable = !isTimeSlotBooked(
          staffMember.id,
          slotTime,
          selectedService.duration
        );

        slots.push({
          time: slotTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }),
          available: isAvailable
        });
      }
    }

    return slots;
  };

  // Handle booking confirmation
  const handleBookAppointment = () => {
    if (!selectedStaff || !selectedService || !selectedTime) return;

    const startTime = new Date();
    const [hours, minutes] = selectedTime.split(':');
    startTime.setHours(parseInt(hours), parseInt(minutes));

    const endTime = new Date(startTime.getTime() + selectedService.duration * 60000);

    const newBooking = {
      id: Date.now(),
      serviceId: selectedService.id,
      startTime: startTime,
      endTime: endTime
    };

    setStaffMembers(prevStaff => 
      prevStaff.map(staff => 
        staff.id === selectedStaff.id
          ? {
              ...staff,
              bookings: [...staff.bookings, newBooking]
            }
          : staff
      )
    );

    // Reset selections
    setSelectedTime(null);
    alert('Appointment booked successfully!');
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Services Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scissors className="w-5 h-5" />
              Select Service
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {services.map(service => (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`p-3 rounded-lg cursor-pointer ${
                    selectedService?.id === service.id
                      ? 'bg-blue-100'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <h3 className="font-medium">{service.name}</h3>
                  <p className="text-sm text-gray-600">
                    Duration: {Math.floor(service.duration / 60)}h {service.duration % 60}min
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Staff Selection */}
        {selectedService && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Select Staff
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {staffMembers.map(staff => (
                  <div
                    key={staff.id}
                    onClick={() => setSelectedStaff(staff)}
                    className={`p-3 rounded-lg cursor-pointer ${
                      selectedStaff?.id === staff.id
                        ? 'bg-blue-100'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <h3 className="font-medium">{staff.name}</h3>
                    <p className="text-sm text-gray-600">
                      {staff.workingHours.start} - {staff.workingHours.end}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Available Time Slots */}
        {selectedStaff && selectedService && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Available Times
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {getAvailableTimeSlots(selectedStaff).map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTime(slot.time)}
                    disabled={!slot.available}
                    className={`p-2 rounded ${
                      selectedTime === slot.time
                        ? 'bg-blue-500 text-white'
                        : slot.available
                        ? 'bg-gray-100 hover:bg-gray-200'
                        : 'bg-red-100 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
              
              {selectedTime && (
                <div className="mt-4">
                  <button
                    onClick={handleBookAppointment}
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Confirm Booking
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DynamicBookingSystem;