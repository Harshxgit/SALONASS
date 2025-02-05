"use client"
import BookingsPage from '@/Containers/bookings/page'
import React, { Suspense } from 'react'

export default function page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>

      <BookingsPage searchParams={{}}/>
      </Suspense>
    </div>
  )
}
