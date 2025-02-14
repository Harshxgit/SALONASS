"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";
import Razorpay from "./paymentgateway/page";
import io from "socket.io-client";
import toast from "react-hot-toast";
const socket = io("/user");
import useServicecart from "../store/ServiceCart";
import { useSession } from "next-auth/react";
import LocationMap from "@/components/client-coponent/addressform";
import { useForm } from "react-hook-form";

const BookingInterface = () => {
  const [quantity, setQuantity] = useState(1);
  const [avoid_calling, setAvoidCalling] = useState(false);
  const items = useServicecart((state) => state.items);
  const subtotal = useServicecart((state) => state.getSubtotal);
  const session = useSession();
  const {register:booking , watch : bookingwatch , handleSubmit ,setValue} = useForm() //react-form
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
    useEffect(() => {
    console.log("connected");
    socket.on("new_booking", (arg: any) => {
      console.log(arg);
      toast.success(arg);
    });
    return () => {
      socket.off("new_booking");
    };
  }, []);
  //
  const click = () => {
    console.log("first");
    socket.emit("booking", "hiii harshu");
  };
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card>
            <CardContent className="p-2">
              <div className="flex items-center ">
                <span className="text-gray-600">Send booking details to</span>
                <span>+91 {session.data?.user?.name}</span>
              </div>
            </CardContent>
          </Card>

          {/* Address Section */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="font-medium">Address</div>
                <LocationMap setValue={setValue} />
              </div>
            </CardContent>
          </Card>

          {/* Slot Section */}
          <Card>
            <CardContent className="p-4">
              <div className="text-gray-600">Slot</div>
            </CardContent>
          </Card>

          {/* Payment Method Section */}
          <Card>
            <CardContent className="p-4">
              <div className="text-gray-600">Payment Method</div>
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
          <Razorpay />
        </div>
      </div>
    </div>
  );
};

export default BookingInterface;
