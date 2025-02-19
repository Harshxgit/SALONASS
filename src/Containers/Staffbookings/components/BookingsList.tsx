'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Booking, Service } from '@/types/packages'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
function ServiceCard({ service }: { service: Service }) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{service.servicename}</CardTitle>
        <CardDescription>{service.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Duration: {service.duration} minutes</p>
        <p>Price: ${service.price}</p>
      </CardContent>
    </Card>
  )
}

export default  function BookingsList({ initialBookings }: { initialBookings: Booking[]  }) {
  const [bookings, setBookings] = useState(initialBookings)
  const searchParams = useSearchParams()

  useEffect(() => {
    const status = searchParams.get('status')
    // fetchBookings(status || undefined).then(setBookings)
  }, [searchParams])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Username</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Staff Member</TableHead>
          <TableHead>Services</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell>{booking.username}</TableCell>
            {/* <TableCell>{booking?.address}</TableCell> */}
            {/* <TableCell>{new Date(booking.time).toLocaleString()}</TableCell> */}
            <TableCell>
              <Badge variant={booking.status === 'CONFIRMED' ? 'default' : 'secondary'}>
                {booking.status}
              </Badge>
            </TableCell>
            {/* <TableCell>{booking.}</TableCell> */}
            <TableCell>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">View Services</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Booked Services</DialogTitle>
                    <DialogDescription>
                      Services booked by {booking.username}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    {booking.bookedService?.map((service) => (
                      <ServiceCard key={service.id} service={service} />
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

