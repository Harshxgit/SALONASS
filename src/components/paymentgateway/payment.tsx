"use client"
import dynamic from 'next/dynamic';
import { UseFormWatch, useWatch, Control } from "react-hook-form";
import { FormValues } from '@/types/form';
import React from 'react';
const ClientPaymentContent = dynamic(() => import('@/components/paymentgateway/razorpay'), {
  ssr: false,  // Disable SSR for this component
});
interface PaymentGatewayProps {
  watch: UseFormWatch<FormValues>;
  control: Control<FormValues>;
}
// Razorpay.tsx (main component)
const Razorpay = (props: PaymentGatewayProps) =>{
  return (
    <React.Suspense fallback={<div>Loading payment page...</div>}>
      <ClientPaymentContent {...props} />
    </React.Suspense>
  );
}
export default Razorpay;