'use server'

import { Booking, Service, StaffMember } from '@/types/packages'

export async function fetchBookings(status?: string): Promise<Booking[]> {
  // Simulating a delay to mimic a database call
  await new Promise(resolve => setTimeout(resolve, 1000))

  const mockStaffMembers: StaffMember[] = [
    { id: '1', name: 'Alice Johnson' },
    { id: '2', name: 'Bob Smith' },
    { id: '3', name: 'Carol Williams' },
  ]

  const mockServices: Service[] = [
    { id: '1', name: 'Haircut', description: 'Standard haircut service', duration: 30, price: 30 },
    { id: '2', name: 'Manicure', description: 'Basic manicure service', duration: 45, price: 25 },
    { id: '3', name: 'Massage', description: 'Relaxing full body massage', duration: 60, price: 60 },
  ]

  const mockBookings: Booking[] = [
    { id: '1', username: 'John Doe', address: '123 Main St', time: '2023-07-01T10:00:00Z', status: 'completed', staffMember: mockStaffMembers[0], service: mockServices[0] },
    { id: '2', username: 'Jane Smith', address: '456 Elm St', time: '2023-07-02T14:30:00Z', status: 'pending', staffMember: mockStaffMembers[1], service: mockServices[1] },
    { id: '3', username: 'Bob Johnson', address: '789 Oak St', time: '2023-07-03T09:15:00Z', status: 'completed', staffMember: mockStaffMembers[2], service: mockServices[2] },
    { id: '4', username: 'Alice Brown', address: '321 Pine St', time: '2023-07-04T16:45:00Z', status: 'pending', staffMember: mockStaffMembers[0], service: mockServices[2] },
  ]

  if (status) {
    return mockBookings.filter(booking => booking.status === status)
  }

  return mockBookings
}

