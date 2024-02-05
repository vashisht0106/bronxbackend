// socketHandler.js
const { Server } = require('socket.io');
const EventEmitter=require('events')

const eventEmitter=new EventEmitter();
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

    // Handle custom events here
    socket.on('eventID', (data) => {
    //  console.log('Received custom event:', data);
eventEmitter.emit('eventID',data);
      // Emit a response or broadcast to other clients if needed


      io.emit('eventID', data);
    });
  });

  return io;
}

module.exports = {initializeSocket,eventEmitter};
