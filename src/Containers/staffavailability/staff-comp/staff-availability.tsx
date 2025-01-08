'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StaffMember as StaffMemberType } from '@/types/staff'
import StaffMember from './staffmember'

// Mock data for demonstration
const mockStaffData: StaffMemberType[] = [
  {
    id: '1',
    name: 'John Doe',
    availability: {
      '2025-01-08': [
        { start: '09:00', end: '12:00' },
        { start: '13:00', end: '17:00' },
      ],
      '2023-05-16': [
        { start: '10:00', end: '14:00' },
      ],
    },
  },
  {
    id: '2',
    name: 'Jane Smith',
    availability: {
      '2023-05-15': [
        { start: '08:00', end: '16:00' },
      ],
      '2023-05-16': [
        { start: '09:00', end: '13:00' },
        { start: '14:00', end: '18:00' },
      ],
    },
  },
]

export default function StaffAvailability() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''

  return (
    <div className="p-4">
  
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="w-full md:w-auto">
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        <Card className="flex-grow">
          <CardHeader>
            <CardTitle>Staff Availability for {formattedDate}</CardTitle>
          </CardHeader>
          <CardContent>
            {mockStaffData.map((staff) => (
              <StaffMember key={staff.id} staff={staff} selectedDate={formattedDate} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

