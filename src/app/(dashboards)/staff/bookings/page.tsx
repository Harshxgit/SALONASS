import BookingsPage from '@/Containers/Staffbookings/page'
import React from 'react'
import { Suspense } from 'react'
export default function page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
      <BookingsPage searchParams={{}}/>
      </Suspense>
    </div>
  )
}
