"use client"
import dynamic from "next/dynamic";
import { Key, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";
const Razorpay = dynamic(() => import('@/components/paymentgateway/payment'), { ssr: false });
const LocationMap = dynamic(() => import("@/components/client-coponent/addressform"), { ssr: false });
import useServicecart from "../store/ServiceCart";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { getAllStaff, getstafffavailablity } from "../actions/staff/actions";
import UserProfile from "@/components/client-coponent/avatar/user-profile";
import useSWR from "swr";
import ServiceTypeSelector from "@/components/client-coponent/booktype";
import Getdate from "@/components/client-coponent/date";
import { UseFormSetValue } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { FormValues } from "@/types/form";
import useSocket from "@/hooks/user-socket";
interface Staff {
  number: string;
  name: string;
  id: number;
}
interface StaffResponse {
  staffs: Staff[];
}
const BookingInterface = () => {
  const [quantity, setQuantity] = useState(1);
  const [avoid_calling, setAvoidCalling] = useState(false);
  const items = useServicecart((state) => state.items);
  const subtotal = useServicecart((state) => state.getSubtotal);
  const [slots, setSlots] = useState<{ time: string; availabel: boolean }[]>(
    []
  );
  const session = useSession();
  const {
    register: booking,
    watch: bookingwatch,
    handleSubmit,
    setValue,
    control ,
    watch,
  } = useForm<FormValues>(); //react-form
  const bookingType = useWatch({ control, name:"bookingType"});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const date = useWatch({ control, name: "date" });
  const {data:staffs , isLoading  } = useSWR<StaffResponse | undefined>(
    date ? ["/staff", date] : null,
    () => getAllStaff({ datestr: date })
  );
  const socket = useSocket();
  async function getslot(staffid: number) {
    const date = watch("date");
    const slots = await getstafffavailablity({
      staffid: staffid,
      duration: "50",
      datestr: date,
    });
    if (slots) {
      setSlots(slots);
    } else {
      setSlots([]);
    }
  }
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 border border-base-300">
          <Card>
            <CardContent className="p-2">
              <div className="flex items-center ">
                <span className="text-gray-600">Send booking details to</span>
                <span>+91 {session.data?.user?.name}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-2">
              <ServiceTypeSelector setValue={setValue} />
            </CardContent>
          </Card>
          {/* date */}
          <Card>
            <CardContent className="p-2">
              <Getdate setValue={setValue} />
            </CardContent>
          </Card>

          {/* Address Section */}
          {bookingType === "IN-HOME" && (
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="font-medium">Address</div>
                  <LocationMap setValue={setValue} />
                </div>
              </CardContent>
            </Card>
          )}
          {/* All Staff Section */}
          <Card className="overflow-hidden">
            <CardContent className="p-4 max-w-s ">
              <div className="flex flex-row overflow-auto ">
                { isLoading ? <span className="loading loading-dots loading-md"></span> : staffs?.staffs.map(
                  (
                    staff: {
                      id: any;
                      name: string;
                    },
                    index: Key | null | undefined
                  ) => (
                    <UserProfile
                      key={index}
                      name={staff.name}
                      profession={""}
                      getslots={getslot}
                      id={staff.id}
                      setValue={setValue}
                    />
                  )
                )}
              </div>
            </CardContent>
          </Card>

          {/* Staff slot section  */}
          <Card>
            <CardContent className="p-4">
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex p-4 space-x-4 w-max ">
                  {slots.map((slot) => (
                    <Button
                      key={slot.time}
                      variant={slot.availabel ? "default" : "outline"}
                      onClick={() => {
                        setValue("time", slot.time);
                        setSelectedType(slot.time);
                      }}
                      className={`${
                        selectedType === slot.time
                          ? "bg-primary text-primary-foreground"
                          : "bg-background text-foreground"
                      } border border-primary`}
                    >
                      {slot.time}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Service Details */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-4">
              {/* Service Title and Price */}

              <div className="flex justify-between items-start mb-4">
                <h2 className="font-medium">SubTotal</h2>
                <div className="text-right">
                  <div className="font-medium">₹{subtotal()}</div>
                  {/* <div className="text-sm text-gray-500 line-through">₹{item.price}</div>  for adding future */}
                </div>
              </div>

              {/* Service Items */}
              <ul className="list-disc pl-5 space-y-2 mb-4">
                {items.map((item, index) => (
                  <li
                    className="flex justify-between items-start text-neutral-600"
                    key={index}
                  >
                    <h2 className="">{item.name}</h2>
                    <div className="text-right">
                      <div className="font-medium">₹{item.price}</div>
                      {/* <div className="text-sm text-gray-500 line-through">₹{item.price}</div>  for adding future */}
                    </div>
                  </li>
                ))}
              </ul>

              <Button variant="link" className="p-0 h-auto text-primary">
                ReeBook Service
              </Button>
            </CardContent>
          </Card>

          {/* Avoid Calling Checkbox */}
          {/* <div className="flex items-center justify-center  gap-2">
            <input
              type="checkbox"
              checked={avoid_calling}
              onChange={(e) => setAvoidCalling(e.target.checked)}
              className="rounded border-gray-300"
            />
            <label className="text-sm">Avoid calling before reaching the location</label>
          </div> */}
          <Razorpay watch={bookingwatch} control={control} />
        </div>
      </div>
    </div>
  );
};

export default BookingInterface;
