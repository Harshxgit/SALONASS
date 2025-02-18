"use client"
import { useState,useEffect  } from "react";
import io from "socket.io-client";
import toast from "react-hot-toast";
const useSocket = () => {
    const [socket, setSocket] = useState<any>(null);
  
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const socketInstance = io("/user");
        setSocket(socketInstance);
  
        socketInstance.on("new_booking", (arg: any) => {
          toast.success(arg);
        });
  
        return () => {
          socketInstance.off("new_booking");
          socketInstance.disconnect();
        };
      }
    }, []);
  
    return socket;
  };

  export default useSocket