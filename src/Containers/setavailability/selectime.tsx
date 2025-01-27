"use client";

import { useState } from "react";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/util";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { formatTime } from "@/lib/util";
import { updatestaffavailability } from "@/app/actions/staff/page";

// const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const daysOfWeek = [
  { key: 1, day: "Monday" },
  { key: 2, day: "Tuesday" },
  { key: 3, day: "Wednesday" },
  { key: 4, day: "Thursday" },
  { key: 5, day: "Friday" },
  { key: 6, day: "Saturday" },
  { key: 7, day: "Sunday" },
];
export function TimeRangeSelector() {
  const [startDate, setStartDate] = useState<Date>();
  // const [endDate, setEndDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [isDateMode, setIsDateMode] = useState(true);
  const [selectedDays, setSelectedDays] = useState<string>();
  const [isloading, setLoading] = useState(false)
  const handleDayToggle = (day: string) => {
    setSelectedDays(day);
     };

  const handleStartDateSelect = (date: Date | undefined) => {
    setStartDate(date);
    setSelectedDays(date?.getDay()?.toString())
    // if (date && (!endDate || date > endDate)) {
    //   setEndDate(date);
    // }
  };

  //commenting for selected date
  // const handleEndDateSelect = (date: Date | undefined) => {
  //   if (date && startDate && date < startDate) {
  //     setEndDate(startDate);
  //     setStartDate(date);
  //   } else {
  //     setEndDate(date || null);
  //   }
  // };
  const setAvailability = async(e:any) => {
    console.log(startDate)
    e.preventDefault();
    console.log("reaching here")
    setLoading(true)
    if (startDate  && selectedDays) {
     await updatestaffavailability({datestr: startDate, staffId: 1, day: selectedDays, isAvailable: true, startTime: new Date(startTime), endTime: new Date(endTime)});
    } else {
      console.error("Start date is undefined");
    }
    setLoading(false)
  };
  return (
    <form onSubmit={setAvailability} className="space-y-4">
      {/* <div className="flex items-center space-x-2">
        <Switch
          id="date-mode"
          checked={isDateMode}
          onCheckedChange={setIsDateMode}
        />
        <Label htmlFor="date-mode">
          {isDateMode ? "Select by Date" : "Select by Day"}
        </Label>
      </div> */}

      {isDateMode ? (
        <div className="flex space-x-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 " />
                {startDate ? format(startDate, "PPP") : <span>Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                required={true}
                selected={startDate || undefined}
                onSelect={handleStartDateSelect}
                initialFocus
                className="backdrop-blur-3xl"
              />
            </PopoverContent>
          </Popover>

        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {daysOfWeek.map((day) => (
            <Button
              key={day.key}
              variant={
                new Date().getDay() === day.key
                  ? "default"
                  : selectedDays == day.day
                  ? "default"
                  : "outline"
              }
              onClick={() => handleDayToggle(day.day)}
            >
              {day.day.slice(0, 3)}
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
                "w-[120px] justify-start text-left font-normal",
                !startTime && "text-muted-foreground"
              )}
            >
              <Clock className="mr-2 h-4 w-4" />
              {startTime || <span>Start time</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0 max-h-60 absolute left-0 mt-2 overflow-y-auto backdrop-blur-sm"
            align="start"
          >
            <div className="grid gap-2 p-2">
              {Array.from({ length: 12 * 4 + 1 }, (_, i) => i).map((index) => {
                const hour = 9 + Math.floor(index / 4);
                const minute = (index % 4) * 15;

                // Formate the time for display
                const timeString = new Date(
                  0,
                  0,
                  0,
                  hour,
                  minute
                ).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                });
                return (
                  <Button
                    key={index}
                    variant="ghost"
                    className="text-left font-normal"
                    onClick={() => {
                      setStartTime(timeString);
                      if (!endTime || timeString > endTime) {
                        setEndTime(timeString);
                      }
                    }}
                  >
                    {timeString}
                  </Button>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[120px] justify-start text-left font-normal",
                !endTime && "text-muted-foreground"
              )}
            >
              <Clock className="mr-2 h-4 w-4" />
              {endTime || <span>End time</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0 max-h-60 absolute left-0 mt-2 overflow-y-auto backdrop-blur-sm"
            align="start"
          >
            <div className="grid gap-2 p-2">
              {Array.from({ length: 12 * 4 + 1 }, (_, i) => i).map((index) => {
                const hour = 9 + Math.floor(index / 4);
                const minute = (index % 4) * 15;

                // Formate the time for display
                const timeString = new Date(
                  0,
                  0,
                  0,
                  hour,
                  minute
                ).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                });
                return (
                  <Button
                    key={index}
                    variant="ghost"
                    className="text-left font-normal"
                    onClick={() => {
                      setEndTime(timeString);
                      if (!endTime || timeString > endTime) {
                        setEndTime(timeString);
                      }
                    }}
                  >
                    {timeString}
                  </Button>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Selected Range:</h3>
        <p>
          {isDateMode
            ? `From ${startDate ? format(startDate, "PPP") : "N/A"} 
              `
            : `${selectedDays}`}
        </p>
        <p>
          Time: {startTime || "N/A"} to {endTime || "N/A"}
        </p>
        <Button type="submit" disabled={isloading}>{isloading ? <> updating.....</>:<>Set Updating</>}</Button>
      </div>
    </form>
  );
}
