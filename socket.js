// socketHandler.js
const { Server } = require('socket.io');
const EventEmitter=require('events')

const eventEmitter=new EventEmitter();
//const clients = new Map();


let socketToEmail=new Map();

let emailToSocket=new Map();

let midToSocket=new Map();







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




socket.on('join',(email,mediaID)=>{

socketToEmail.set(socket.id,email);

emailToSocket.set(email,socket.id);
console.log(`Associated email ${email} with socketID ${socket.id}`);

if(mediaID){

  midToSocket.set(mediaID,socket.id);
console.log(`Associated mediaID ${mediaID} with socketID ${socket.id}`);

}

})

















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











// connect dashboard with email










socket.on('disconnect', () => {
  const email = socketToEmail.get(socket.id);
  if (email) {
      socketToEmail.delete(socket.id);
      emailToSocket.delete(email);
      console.log(`Removed association for email ${email} and socketID ${socket.id}`);
  }
  console.log(`Client disconnected with socketID ${socket.id}`);
});






  });

  return io;
}







function sendMessageByMid(io, mediaID, message) {
  const socketID = midToSocket.get(mediaID);
  console.log("mediaIDinsendmessagefunction",socketID)
  if (socketID) {
    const socket = io.sockets.sockets.get(socketID);
    if (socket) {
      socket.emit('message', message);
      console.log(`Message sent to client with mid ${mediaID}`);
    } else {
      console.log(`Socket not found for mid ${mediaID}`);
    }
  } else {
    console.log(`No socket associated with mid ${mediaID}`);
  }
}









module.exports = {initializeSocket,eventEmitter};
