import {create} from "zustand"
import { persist } from "zustand/middleware";
interface Item {
    id : number ;
    servicename : string
    price : number
    duration : number
    type  : string
    img  : string[]
}

  
type AdminService = {
    items : Item[]
    additem : (item :Item) => void
}
const useAdminService = create<AdminService>()(
    persist(
        (set)=>({
            items :[],
            additem : (item:Item) => set((state :{items:Item[]})=>({
                items : [...state.items , item]
            }))
                
        }),
        {
            name : "admin service"
        }
    )
)
export default useAdminService;