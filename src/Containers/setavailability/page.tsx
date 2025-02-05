"use client"
import LiveClock from './LiveClock'
import { TimeRangeSelector } from './selectime'

export default function Availability() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-8 text-lg font-bold">Time Range Selector <LiveClock/></h1>
      <TimeRangeSelector />
    </main>
  )
}

