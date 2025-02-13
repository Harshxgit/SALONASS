import AddressForm from '@/components/client-coponent/addressform'
import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
    title: 'Address Map',
    description: 'Add your address with location',
  };
function page() {
    
  return (
    <div>
        <AddressForm/>
    </div>
  )
}

export default page