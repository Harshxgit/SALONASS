"use client"
import React, { useState, useEffect } from "react"

export default function LiveClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
  }

  return (
    <div className="flex items-center justify-center p-2 backdrop-blur rounded-lg shadow-md mx-auto">
      <h1 className="text-lg font-bold text-white font-mono">{formatTime(time)}</h1>
    </div>
  )
}

