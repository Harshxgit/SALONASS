import { bookingstatus } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";

export interface Service {
  id: number;
  servicename: string;
  price: number;
  duration: number;
  type: string;
  img: string[];
  description: string;
  }

  type BookedService = {
    id: number;
    bookingId: number;
    services: Service[]; // Array of services for this booked service
  };

  export interface StaffMember {
    id: string
    name: string
  }
  
  export interface Booking {
    status: bookingstatus;
    id: number;
    userId: number;
    username: string;
    staffName :string;
    staffId: number | null;
    bookingType: string;
    price: number;
    address: JsonValue;
    date: Date;
    starttime: Date;
    endtime: Date;
    orderId: string;
    createdAt: Date;
    bookedService?: Service[]; // Add the missing property - replace 'any' with the actual type
  }
  
  export interface Packages {
    id: number
    name: string
    price: number
    description: string
    services: Service[]
  }
