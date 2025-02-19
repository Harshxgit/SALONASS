"use client"
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import useServicecart from "@/app/store/ServiceCart";
import addBooking from "@/app/actions/booking/actions";
import { useSession } from "next-auth/react";
import { UseFormWatch, useWatch, Control } from "react-hook-form";
import { FormValues } from "@/types/form";
import io from "socket.io-client";
import toast from "react-hot-toast";
interface PaymentGatewayProps {
  watch: UseFormWatch<FormValues>;
  control: Control<FormValues>;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const ClientPaymentContent = ({ watch, control }: PaymentGatewayProps) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const amount = params.get("amount");
  const [loading, setLoading] = useState(false);
  const idRef = React.useRef<string | null>(null);

  const reset = useServicecart((state) => state.reset);
  const services = useServicecart((state) => state.items);
  const total = useServicecart((state) => state.getDuration);
  const time = useWatch({ control, name: "time" });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!amount) {
      router.replace("/cart");
      return;
    }
  
    const loadRazorpay = async () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      document.body.appendChild(script);
    };

    createrOrderId();
    loadRazorpay();

    return () => {
      // Cleanup script if component unmounts
      const script = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );
      if (script) {
        document.body.removeChild(script);
      }
    };
  
  }, [amount, router]);

  const createrOrderId = async () => {
    try {
      const response = await fetch("/api/razorpay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseInt(amount!) * 100,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      idRef.current = data.orderID;
    } catch (error) {}
  };

  const initializeRazorpayPayment = (orderId: string, bookingid: number) => {
    if (!scriptLoaded || typeof window === "undefined") {
      return null;
    }

    return {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: parseFloat(amount!) * 100,
      currency: "INR",
      name: "ClassOne",
      description: "classonepayment",
      order_id: orderId,
      handler: async function (response: any) {
        try {
          const data = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            bookingId: bookingid,
          };

          const result = await fetch("/api/razorpayverify", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
          });

          const res = await result.json();
          if (res.isOk) {
            router.push("/");
            reset();
          } else {
            alert(res.message);
          }
        } catch (error) {
          alert("Payment verification failed. Please contact support.");
        }
      },
      modal: {
        ondismiss: function () {
          setLoading(false);
        },
      },
      theme: {
        color: "#3399cc",
      },
    };
  };

  const processPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const Socket = io("/staff")
    const orderId = idRef.current;

    if (!orderId) {
      setLoading(false);
      throw new Error("Order ID is null");
    }
    try {
      const duration = total();
      const booking = await addBooking({
        username: session?.user.name as string,
        userid: Number(session?.user?._id),
        price: parseFloat(amount!),
        address: watch("address"),
        bookingtype: watch("bookingType"),
        date: watch("date"),
        time: watch("time"),
        duration: duration ?? 0,
        staffid: watch("staffid"),
        services: services,
        orderId: orderId,
        status: "PENDING",
        staffName : watch("staffName")
      });
        console.log(booking)
      //getting booking id
      const bookingid = booking.booking?.id
      const bookingId = bookingid
    if(!bookingId) return toast.error("faild")
      console.log("bookingId"+bookingId)
      //data for emit 
      const data= {staffid: session?.user?._id , booking: booking}

      Socket.emit("sendBooking",data)
      const options = initializeRazorpayPayment(orderId, bookingId);
      if (options && window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function (response: any) {
          alert(response.error.description);
          setLoading(false);
        });
        rzp.open();
      } else {
        setLoading(false);
        alert("Unable to initialize payment. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      alert("Error processing payment. Please try again.");
    }
  };

  return (
    <section>
      <Card className="max-w-[25rem] space-y-4">
        <CardHeader className="flex">
          <p className="text-sm text-muted-foreground underline underline-offset-4">
            Please read the terms and conditions.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={processPayment}>
            <Button
              className="w-full"
              type="submit"
              disabled={!scriptLoaded || loading}
            >
              {loading ? (
                <span className="loading loading-dots loading-lg"></span>
              ) : (
                `Pay Now ₹${amount}`
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default ClientPaymentContent;
