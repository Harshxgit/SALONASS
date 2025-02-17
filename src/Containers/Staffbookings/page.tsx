'use client'
import { Suspense, useEffect } from 'react'
import useSWR, { mutate } from 'swr'
import BookingsList from './components/BookingsList'
import BookingsFilter from './components/BookingFilter'
import { fetchBookings } from '@/app/actions/(admin)/packages/package'
export default  function BookingsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const status = typeof searchParams.status === 'string' ? searchParams.status : undefined
  const { data: bookings } = useSWR("/fetchbookings",fetchBookings)
  useEffect(()=>{
    const socket = io('/staff')
    //get booking live
      socket.on('connection',(newbooking:any)=>{
          mutate("/fetchbookings",[...(bookings || []),newbooking] , false)
      })
  })
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Bookings</h1>
      <BookingsFilter />
      <Suspense fallback={<div>Loading...</div>}>
        <BookingsList initialBookings={bookings || []} />
      </Suspense>
    </div>
  )
}

