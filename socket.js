// socketHandler.js
const { Server } = require('socket.io');
const EventEmitter=require('events')

const eventEmitter=new EventEmitter();
//const clients = new Map();


//let socketToEmail=new Map();

//let emailToSocket=new Map();

let mediaIDToSocket=new Map();
let socketToMediaID=new Map();






function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: true,
      credentials: true,
    },
    allowEIO3: true,
  });

  io.on('connection', (socket) => {
    console.log('Client connected', socket.id);
    // delete disconnected media

   

//console.log('clients',clients)



    socket.on('eventID', (data) => {
    //  console.log('Received custom event:', data);
eventEmitter.emit('eventID',data);
      // Emit a response or broadcast to other clients if needed


      io.emit('eventID', data);
    });




socket.on('join_mediaplayer',data=>{
const {mediaID}=data;
socketToMediaID.set(socket.id,mediaID);

mediaIDToSocket.set(mediaID,socket.id);
console.log(`Associated mediaplayer ${mediaID} with socketID ${socket.id}`);



})




// Iterate over sockets and send media IDs
//socketToMediaID.forEach((socket, mediaID) => {
  //io.emit("mediaIDjson".mediaIDsJSON);
  
//});












//let mediaID=123456;


socket.on('message', function incoming(message) {
  try {
      const { mediaID, eventid } = JSON.parse(message);
      console.log('mediaID',mediaID);
      console.log('eventid',eventid);
      console.log('message',message);

  //const socketID = midToSocket.get(mediaID);
 

//console.log('midtosocket',socketID)
    
      sendMessageByMid(io,mediaID,message);



      
  } catch (error) {
      console.error('Error parsing message:', error);
  }

})


socket.on('style',data=>{

const {mediaID,}=data;
console.log(mediaID)
sendStyleByMid(io,mediaID,data)


})








// connect dashboard with email










socket.on('disconnect', () => {
  const mediaID = socketToMediaID.get(socket.id);
  if (mediaID) {
      socketToMediaID.delete(socket.id);
      console.log(`Removed association for email ${mediaID} and socketID ${socket.id}`);
  }
  console.log(`Client disconnected with socketID ${socket.id}`);
});






  });

  return io;
}







function sendMessageByMid(io, mediaID, message) {
  const socketID = mediaIDToSocket.get(mediaID);
  console.log("medieID to socket ID",socketID)
  console.log("medieID to socket ID",mediaID)



io.to(socketID).emit('message',message)

  //if (socketID) {
  //  console.log("socketID",socketID)
  //  const socket = io.sockets.sockets.get(socketID);
  //  console.log("socket",socket)
  //  if (socket) {
  //    socket.emit('message', message);
  //    console.log(`Message sent to client with mid ${mediaID}`);
  //  } else {
  //    console.log(`Socket not found for mid ${mediaID}`);
  //  }
  //} else {
  //  console.log(`No socket associated with mid ${mediaID}`);
  //}
}



function sendStyleByMid(io,mediaID,data){
console.log("send Style function called",mediaID)
  const socketID = mediaIDToSocket.get(mediaID);
  console.log("medieID to socket ID",socketID)



io.to(socketID).emit('style',data)

}





module.exports = {initializeSocket,eventEmitter};
