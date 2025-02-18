const { Server } = require("socket.io");
let io;
const initSocket = (server) => {
  if (!io) {
    io = new Server(server);

    const adminNamespace = io.of("/admin");
    const userNamespace = io.of("/user");
    const staffNamespace = io.of("/staff");

    const staffsocketid = new Map()

    //all admin logics are here
    adminNamespace.on("connection", (socket) => {});

    //all user logic are here
    userNamespace.on("connection", (socket) => {
      
      console.log("socket id na bhai"+socket.id);
      socket.on(
        "newBooking",
        async ({
          userid,
          price,
          services,
          address,
          bookingtype,
          date,
          time,
          duration,
          staffid,
        }) => {
          const isBook = await addBooking({
            userid: userid,
            price: price,
            services: services,
            address: address,
            bookingtype: bookingtype,
            date: date,
            time: time,
            duration: duration,
            staffid: staffid,
          });
          const staffId = staffsocketid.get(staffid)
          if (!isBook) toast.error("faild to book");
          adminNamespace.emit("newBooking", isBook);
          staffNamespace.to(staffId).emit("newBooking",isBook)
        }
      );

      socket.on("booking", (data)=>{
        console.log(data)
        io.of('/user').emit("new_booking", data);
      });

      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });

    //all staff logics are here
    staffNamespace.on("connection", (socket) => {
    
      socket.on("registerstaff", (staffId) => {
        staffsocketid.set(staffId, socket.id)
      });

      //remove from socket
      socket.on("disconnect",()=>{
        for(const[staffIdd,socketId] of staffsocketid){
          if(socketId ===socket.id){
            staffIdd.delete(socketId)
            break
          }
        }
      })
    });
  }
  return io;
};

module.exports = {
  initSocket,
  getIO: () => io,
};
