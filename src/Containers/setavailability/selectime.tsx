"use client"

import { useState } from 'react'
import { CalendarIcon, Clock } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/util'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { formatTime } from '@/lib/util'

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export function TimeRangeSelector() {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [startTime, setStartTime] = useState<string>('')
  const [endTime, setEndTime] = useState<string>('')
  const [isDateMode, setIsDateMode] = useState(true)
  const [selectedDays, setSelectedDays] = useState<string[]>([])

  const handleDayToggle = (day: string) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    )
  }

  const handleStartDateSelect = (date: Date | null) => {
    setStartDate(date)
    if (date && (!endDate || date > endDate)) {
      setEndDate(date)
    }
  }

  const handleEndDateSelect = (date: Date | null) => {
    if (date && startDate && date < startDate) {
      setEndDate(startDate)
      setStartDate(date)
    } else {
      setEndDate(date)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="date-mode"
          checked={isDateMode}
          onCheckedChange={setIsDateMode}
        />
        <Label htmlFor="date-mode">
          {isDateMode ? 'Select by Date' : 'Select by Day'}
        </Label>
      </div>

      {isDateMode ? (
        <div className="flex space-x-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-[240px] justify-start text-left font-normal',
                  !startDate && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, 'PPP') : <span>Start date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                required={true}
                selected={startDate || undefined}
                onSelect={handleStartDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-[240px] justify-start text-left font-normal',
                  !endDate && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, 'PPP') : <span>End date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                required={true}
            
                selected={endDate || undefined}
                onSelect={handleEndDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {daysOfWeek.map(day => (
            <Button
              key={day}
              variant={selectedDays.includes(day) ? 'default' : 'outline'}
              onClick={() => handleDayToggle(day)}
            >
              {day.slice(0, 3)}
            </Button>
          ))}
        </div>
      )}

      <div className="flex space-x-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-[120px] justify-start text-left font-normal',
                !startTime && 'text-muted-foreground'
              )}
            >
              <Clock className="mr-2 h-4 w-4" />
              {startTime || <span>Start time</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="grid gap-2 p-2">
              {Array.from({ length: 24 }, (_, i) => i).map(hour => (
                <Button
                  key={hour}
                  variant="ghost"
                  className="text-left font-normal"
                  onClick={() => {
                    const time = `${hour.toString().padStart(2, '0')}:00`
                    setStartTime(time)
                    if (!endTime || time > endTime) {
                      setEndTime(time)
                    }
                  }}
                >
                  {`${hour.toString().padStart(2, '0')}:00`}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-[120px] justify-start text-left font-normal',
                !endTime && 'text-muted-foreground'
              )}
            >
              <Clock className="mr-2 h-4 w-4" />
              {endTime || <span>End time</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="grid gap-2 p-2">
              {Array.from({ length: 24 }, (_, i) => i).map(hour => (
                <Button
                  key={hour}
                  variant="ghost"
                  className="text-left font-normal"
                  onClick={() => setEndTime(`${hour.toString().padStart(2, '0')}:00`)}
                  disabled={`${hour.toString().padStart(2, '0')}:00` < startTime}
                >
                  {`${hour.toString().padStart(2, '0')}:00`}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Selected Range:</h3>
        <p>
          {isDateMode
            ? `From ${startDate ? format(startDate, 'PPP') : 'N/A'} to ${
                endDate ? format(endDate, 'PPP') : 'N/A'
              }`
            : `On ${selectedDays.join(', ') || 'N/A'}`}
        </p>
        <p>
          Time: {startTime || 'N/A'} to {endTime || 'N/A'}
        </p>
      </div>
    </div>
  )
}

