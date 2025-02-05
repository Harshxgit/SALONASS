"use client"
import { Suspense } from 'react'
import useSWR from 'swr'
import BookingsList from './components/BookingsList'
import BookingsFilter from './components/BookingFilter'
import { fetchBookings } from '@/app/actions/(admin)/packages/package'

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const status = typeof searchParams.status === 'string' ? searchParams.status : undefined
  const { data: bookings } = useSWR(() => fetchBookings(status))

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Bookings</h1>
      <BookingsFilter />
      <Suspense fallback={<div>Loading...</div>}>
        <BookingsList initialBookings={bookings} />
      </Suspense>
    </div>
  )
}

