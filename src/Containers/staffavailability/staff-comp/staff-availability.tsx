'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Mock data for staff members
const staffMembers = [
  { id: 1, name: 'John Doe', avatar: '/avatars/john-doe.jpg' },
  { id: 2, name: 'Jane Smith', avatar: '/avatars/jane-smith.jpg' },
  { id: 3, name: 'Bob Johnson', avatar: '/avatars/bob-johnson.jpg' },
]

// Mock data for availability (in a real app, this would come from an API)
type Availability = {
  [date: string]: {
    [staffId: number]: string[]
  }
}

const mockAvailability: Availability = {
  '2023-05-15': {
    1: ['09:00', '10:00', '11:00', '14:00', '15:00'],
    2: ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'],
    3: ['11:00', '13:00', '14:00', '15:00', '16:00'],
  },
  // Add more dates as needed
}

export function StaffAvailability() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const formattedDate = date ? format(date, 'yyyy-MM-dd') : ''
  const availability = mockAvailability[formattedDate] || {}

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Staff Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>
          <div className="flex-grow">
            <h2 className="text-lg font-semibold mb-4">Available Time Slots</h2>
            {staffMembers.map(staff => (
              <div key={staff.id} className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar>
                    <AvatarImage src={staff.avatar} alt={staff.name} />
                    <AvatarFallback>{staff.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{staff.name}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {availability[staff.id]?.map(slot => (
                    <Badge key={slot} variant="secondary">{slot}</Badge>
                  ))}
                  {(!availability[staff.id] || availability[staff.id].length === 0) && (
                    <span className="text-gray-500 italic">No availability</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

