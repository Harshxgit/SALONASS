'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Booking, Service } from '../types'
import { fetchBookings } from '../actions'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import ServiceDetailsModal from './ServiceDetailsModal'

export default function BookingsList({ initialBookings }: { initialBookings: Booking[] }) {
  const [bookings, setBookings] = useState(initialBookings)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const status = searchParams.get('status')
    fetchBookings(status || undefined).then(setBookings)
  }, [searchParams])

  const handleServiceClick = (service: Service) => {
    setSelectedService(service)
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Staff Member</TableHead>
            <TableHead>Service</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.username}</TableCell>
              <TableCell>{booking.address}</TableCell>
              <TableCell>{new Date(booking.time).toLocaleString()}</TableCell>
              <TableCell>
                <Badge variant={booking.status === 'completed' ? 'default' : 'secondary'}>
                  {booking.status}
                </Badge>
              </TableCell>
              <TableCell>{booking.staffMember.name}</TableCell>
              <TableCell>
                <Button variant="link" onClick={() => handleServiceClick(booking.service)}>
                  {booking.service.name}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ServiceDetailsModal
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
      />
    </>
  )
}

