export interface Service {
    id: string
    name: string
    description: string
    duration: number
    price: number
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
  
  