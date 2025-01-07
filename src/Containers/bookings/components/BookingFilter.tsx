'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"

export default function BookingsFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const setFilter = (status: string | null) => {
    const params = new URLSearchParams(searchParams)
    if (status) {
      params.set('status', status)
    } else {
      params.delete('status')
    }
    router.push(`/admin/bookings?${params.toString()}`)
  }

  return (
    <div className="mb-4 space-x-2">
      <Button
        variant={!searchParams.get('status') ? 'default' : 'outline'}
        onClick={() => setFilter(null)}
      >
        All
      </Button>
      <Button
        variant={searchParams.get('status') === 'completed' ? 'default' : 'outline'}
        onClick={() => setFilter('completed')}
      >
        Completed
      </Button>
      <Button
        variant={searchParams.get('status') === 'pending' ? 'default' : 'outline'}
        onClick={() => setFilter('pending')}
      >
        Pending
      </Button>
    </div>
  )
}

