//const express = require('express');
//const rangeParser = require('range-parser');
//const fs = require('fs');
//const http=require('http');
//const path=require('path');
//const {Server}=require('socket.io');


//const app = express();
//const server=http.createServer(app)
//const io=new Server(server);
//const videoPath = '173137 (720p).mp4';
//io.on('connection',(socket)=>{
//  console.log("client connected",socket.id)
//  //io.emit("width",200);
//  //  io.emit('height',200)
//  //socket.on('layout',(message)=>{
//  //  //io.emit("width",200);
//  //  //io.emit('height',200)
//  //  io.emit("width",message.width);
//  //  io.emit('height',message.height)
//  //  console.log('height',message.height)
//  //    console.log("width",message.width)
//  //  })


//socket.on('screenvalue',(message)=>{
//io.emit('screenvalue',message)

//})



//socket.on('mediaID',(message)=>{
//  console.log('mediaID',message)
//})




//  })
 

//  app.get('/',(req,res)=>{

//    res.sendFile(path.join(__dirname, 'socket.html'));

//})

//app.get('/video', (req, res) => {
//  const videoSize = fs.statSync(videoPath).size;
//  const videoStream = fs.createReadStream(videoPath, { highWaterMark: 10 * 1024 * 1024 });

//  const rangeHeader = req.headers.range;
//  if (!rangeHeader) {
//    // No range requested, send the entire video
//    res.writeHead(200, {
//      'Content-Length': videoSize,
//      'Content-Type': 'video/mp4',
//    });
//    videoStream.pipe(res);
//  } else {
//    // Parse the range header
//    const ranges = rangeParser(videoSize, rangeHeader);

//    if (ranges === -1) {
//      // Invalid range
//      res.status(416).send('Invalid Range');
//      return;
//    }

//    // Only support single range for simplicity
//    const { start, end } = ranges[0];
//    const contentLength = end - start + 1;

//    // Send the partial content (range) response
//    res.writeHead(206, {
//      'Content-Range': `bytes ${start}-${end}/${videoSize}`,
//      'Accept-Ranges': 'bytes',
//      'Content-Length': contentLength,
//      'Content-Type': 'video/mp4',
//    });
//    const partialVideoStream = fs.createReadStream(videoPath, { start, end });
//    partialVideoStream.pipe(res);
//  }
//});

//const port = 8000;
//server.listen(port, () => {
//  console.log(`Server is running at http://localhost:${port}`);
//});






















//const date1 = new Date('2022-01-31T08:30:00'); // Specific date with time (8:30 AM)
//const date2 = new Date(); // Current date and time

//// Extract hours, minutes, and seconds
//const hours1 = date1.getHours();
//const minutes1 = date1.getMinutes();
//const seconds1 = date1.getSeconds();

//const hours2 = date2.getHours();
//const minutes2 = date2.getMinutes();
//const seconds2 = date2.getSeconds();

//// Compare times
//if (hours1 === hours2 && minutes1 === minutes2 ) {
//  console.log('Times are equal');
//} else if (
//  hours1 < hours2 ||
//  (hours1 === hours2 && minutes1 < minutes2) 

//) {
//  console.log('Time of date1 is before time of date2');
//} else {
//  console.log('Time of date1 is after time of date2');
//}
