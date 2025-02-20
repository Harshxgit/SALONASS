"use client"
import { useEffect, useState } from "react";
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
import {
  getstafffavailablity,
  getTodayAvailabilty,
  updatestaffavailability,
} from "@/app/actions/staff/actions";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

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
  const [startDate, setStartDate] = useState<Date | null>(null);
  // const [endDate, setEndDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [isDateMode, setIsDateMode] = useState(true);
  const [selectedDays, setSelectedDays] = useState<string>();
  const [isloading, setLoading] = useState(false);
  const { data: session } = useSession();
  const handleDayToggle = (day: string) => {
    setSelectedDays(day);
  };
  
  const [getday, setGetday] = useState<{ isAvailable: boolean } | null>(null);
  useEffect(() => {
    const fetchAvailability = async () => {
      const today = new Date();
      const staffId = session?.user?._id;
      if (staffId) {
        const availability = await getTodayAvailabilty({
          datestr: today,
          staffId: Number(staffId),
        });

        setGetday(
          availability ? { isAvailable: availability.isAvailable } : null
        );
      }
    };
    fetchAvailability();
  }, [session]);
  const handleStartDateSelect = (date: Date | undefined) => {
    if (date && !isNaN(date.getTime())) {
      setStartDate(date);
      
      setSelectedDays(date?.getDay()?.toString());
    } else {
      const today = new Date();
      setStartDate(today);
      setSelectedDays(date?.getDay()?.toString());
    }
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
  const setAvailability = async (e: any) => {

    const loading = toast.loading("Updating....");
    e.preventDefault();
 
    setLoading(true);
    console.log("date"+startDate)

    if (startDate && selectedDays) {
      const date = new Date(startDate)
      date.setHours(12)
      await updatestaffavailability({
        datestr: date,
        staffId: Number(session?.user?._id),
        day: selectedDays,
        isAvailable: true,
        startTime: startTime,
        endTime: endTime
      });
    } else {
      console.error("Start date is undefined");
    }
    toast.success("Availabilty Updated", { id: loading });
    setLoading(false);
  };
  return (
    <div>
      <div className="p-1 font-bold text-2xl flex  items-center gap-2">
        {session?.user?.name}{" "}
        {getday?.isAvailable ? <li className="text-green-600 text-4xl"/> : <li className="text-red-600 text-4xl"/> }{" "}
      </div>

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
                  {startDate instanceof Date && !isNaN(startDate.getTime()) ? (
                    format(startDate, "PPP")
                  ) : (
                    <span>Select date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  required={true}
                  selected={startDate && !isNaN(startDate.getTime()) ? startDate : undefined}
                  onSelect={handleStartDateSelect}
                  initialFocus
                  className="backdrop-blur-3xl"
                  aria-required
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
              aria-required
            >
              <div className="grid gap-2 p-2">
                {Array.from({ length: 12 * 4 + 1 }, (_, i) => i).map(
                  (index) => {
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
                  }
                )}
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
              aria-required
            >
              <div className="grid gap-2 p-2">
                {Array.from({ length: 12 * 4 + 1 }, (_, i) => i).map(
                  (index) => {
                    const hour = 10 + Math.floor(index / 4);
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
                  }
                )}
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
          <Button type="submit" disabled={isloading}>
            {isloading ? (
              <span className="loading loading-dots loading-md"></span>
            ) : (
              <>Set Updating</>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
