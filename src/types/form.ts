export interface FormValues {
    time: string;
    bookingType:string;
    date:Date;
    address :{street :string , area:string ,city : string ,state:string , houseNo?  : string,colony? :string }
    duration : number
    staffid:number
    staffName : string
    // other form fields...
  }