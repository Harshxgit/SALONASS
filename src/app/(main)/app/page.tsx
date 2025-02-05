"use client"
import MyDrawer from '@/components/MyDrawer'
import React from 'react'
import { useSession } from 'next-auth/react'
export default function page() {
  const { data: session, status } = useSession()
  console.log(`session + ${session}`)
  return (
    <div>
      <MyDrawer/>
    </div>
  )
}
