export interface Service {
  id: number;
  servicename: string;
  price: number;
  duration: number;
  type: string;
  img: string[];
  }
  
  export interface StaffMember {
    id: string
    name: string
  }
  
  export interface Booking {
    id: string
    username: string
    address: string
    time: string
    status: 'completed' | 'pending'
    staffMember: StaffMember
    service: Service
  }
  
  export interface Packages {
    id: number
    name: string
    price: number
    // description: string
    services: Service[]
  }
