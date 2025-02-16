"use client"
import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from "@/components/ui/button";
import { CalendarIcon } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import { cn } from '@/lib/util';
import { format } from 'date-fns';

export default function Getdate({setValue}:any) {
    const [selectedDays , setSelectedDays] = useState<Date>()
    const handleStartDateSelect = (date: Date | undefined) => {
        if (date) {
            date.setHours(12)
            setValue("date",date)
            setSelectedDays(date);
   
      
        } else {
          const today = new Date();
          setValue("date",date);
          setSelectedDays(today);
        }
        };
  return (
    <div>
         <div className="flex space-x-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                //   variant="outline"
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !selectedDays && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 " />
                  {selectedDays instanceof Date && !isNaN(selectedDays.getTime()) ? (
                    format(selectedDays, "PPP")
                  ) : (
                    <span>Select date</span>
                  )}         
                  
               
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  required={true}
                  selected={selectedDays && !isNaN(selectedDays.getTime()) ? selectedDays : undefined}
                  onSelect={handleStartDateSelect}
                  initialFocus
                  className="backdrop-blur-3xl"
                  aria-required
                />
              </PopoverContent>
            </Popover>
          </div>
    </div>
  )
}
