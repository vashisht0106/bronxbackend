const eventModel = require("../Model/eventModel");
const rangeParser = require('range-parser');
const fs = require('fs');
const http=require('http');
const path=require('path');
const { eventEmitter } = require("../socket");

let storedEventID=null;
eventEmitter.on('eventID', (eventID) => {
  console.log('Received eventID in other file:', eventID);
  storedEventID = eventID;
}) 


exports.eventController = async (req, res) => {
  try {
    const {title, starttime , endtime, layoutstyle, source,mediaid } = req.body;

    // Validate input (you may need to adjust the validation logic)
    if (!starttime ||  !endtime  || !layoutstyle || !source || !title||!mediaid) {
      return res.status(404).json({success:false, error: "All fields are required" });
    }

    // Create a new event instance
    const event = new eventModel({
      title,
     starttime,
      endtime,
      layoutstyle,
      source,
      mediaid
    });

    // Save the event to the database
    const savedEvent = await event.save();

    res.status(201).json(savedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};



exports.getEvent=async(req,res)=>{

  
  try {
  const event=await eventModel.find();  
  if(event){

res.status(200).json({success:true,event})

  }
  else res.status(200).json({success:false,message:"event not found"})
  
  
} catch (error) {
  
res.status(500).json({success:false,message:"Internal server error occured"})

}



}



exports.getEventByID=async(req,res)=>{

  
 
    try {
      const { eventid } = req.query; // Assuming eventid is passed as a query parameter
  
      let query = {};
      if (eventid) {
        query = { eventid: { $regex: eventid, $options: 'i' } };
      }
  
      const events = await eventModel.find(query);
  
      if (events.length > 0) {
        res.status(200).json({ success: true, events });
      } else {
        res.status(404).json({ success: false, message: "Events not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  








exports.videoController2=async(req,res)=>{
 
// const HandelChangeEvent=async(eid)=>{

//let eventid=storedEventID;wwww
const {eventid}=req.params;
  // console.log('eventid',eid)

 
  try {
    //const event = await eventModel.findOne({eventid:eventid});
    const event = await eventModel.find(
{
 $and: [
    { eventid: { $regex: eventid, $options: 'i' } }, // Case-insensitive regex
    // Add more conditions if needed
  ]

}

    );
   
let source=event[0].source;

//let source=item.source
console.log('item',source)







// handling live video



//const videoPath='./uploads/production_id_4875313 (2160p).mp4'
const videoPath =path.join('uploads',source);
console.log('videoPath',videoPath);
  const videoSize = fs.statSync(videoPath).size;
  const videoStream = fs.createReadStream(videoPath, { highWaterMark: 10 * 1024 * 1024 });

  const rangeHeader = req.headers.range;
  if (!rangeHeader) {
    // No range requested, send the entire video
    res.writeHead(200, {
      'Content-Length': videoSize,
      'Content-Type': 'video/mp4',
    });
    videoStream.pipe(res);
  } else {
    // Parse the range header
    const ranges = rangeParser(videoSize, rangeHeader);

    if (ranges === -1) {
      // Invalid range
      res.status(416).send('Invalid Range');
      return;
    }

    // Only support single range for simplicity
    const { start, end } = ranges[0];
    const contentLength = end - start + 1;

    // Send the partial content (range) response
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${videoSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': 'video/mp4',
    });
    const partialVideoStream = fs.createReadStream(videoPath, { start, end });
    partialVideoStream.pipe(res);
  }


















}
 catch (error) {
  console.log(error)
}



}



exports.videoController=async(req,res)=>{
 
  // const HandelChangeEvent=async(eid)=>{
  
  //let eventid=storedEventID;wwww
  const {eventid,source}=req.params;
    // console.log('eventid',eid)
  
   
    try {
      //const event = await eventModel.findOne({eventid:eventid});
      const event = await eventModel.find(
  {
   $and: [
      { eventid: { $regex: eventid, $options: 'i' } }, // Case-insensitive regex
      // Add more conditions if needed
    ]
  
  }
  
      );
     
  //let source=event[0].source;
  
  //let source=item.source
  //console.log('item',source)
  
  
  
  
  
  
  
  // handling live video
  
  
  
  //const videoPath='./uploads/production_id_4875313 (2160p).mp4'
  const videoPath =path.join('uploads',source);
  console.log('videoPath',videoPath);
    const videoSize = fs.statSync(videoPath).size;
    const videoStream = fs.createReadStream(videoPath, { highWaterMark: 10 * 1024 * 1024 });
  
    const rangeHeader = req.headers.range;
    if (!rangeHeader) {
      // No range requested, send the entire video
      res.writeHead(200, {
        'Content-Length': videoSize,
        'Content-Type': 'video/mp4',
      });
      videoStream.pipe(res);
    } else {
      // Parse the range header
      const ranges = rangeParser(videoSize, rangeHeader);
  
      if (ranges === -1) {
        // Invalid range
        res.status(416).send('Invalid Range');
        return;
      }
  
      // Only support single range for simplicity
      const { start, end } = ranges[0];
      const contentLength = end - start + 1;
  
      // Send the partial content (range) response
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${videoSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': contentLength,
        'Content-Type': 'video/mp4',
      });
      const partialVideoStream = fs.createReadStream(videoPath, { start, end });
      partialVideoStream.pipe(res);
    }
  
  }
   catch (error) {
    console.log(error)
  }
  
  
  
  }
  

exports.imageController = async(req,res)=>{

  const { eventid, source } = req.params;

  try {
    const event = await eventModel.find({
      $and: [
        { eventid: { $regex: eventid, $options: 'i' } },
        // Add more conditions if needed
      ]
    });

    if (event.length === 0) {
      res.status(404).send('Event not found');
      return;
    }

    const imagePath = path.join('uploads', source); // Path to your image
console.log(imagePath)
    // Read the image file
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error reading image file');
        return;
      }

      // Set the appropriate headers and send the image data as the response
      res.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': data.length
      });
      res.end(data);
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}





exports.mediaController = async (req, res) => {
  const { eventid, source } = req.params;

  try {
    const event = await eventModel.find({
      $and: [
        { eventid: { $regex: eventid, $options: 'i' } },
        // Add more conditions if needed
      ]
    });

    if (event.length === 0) {
      res.status(404).send('Event not found');
      return;
    }

    const filePath = path.join('uploads', source); // Path to your video or image file
    const fileExtension = path.extname(filePath).toLowerCase();

    // Check if the file is a video or an image
    if (fileExtension === '.mp4' || fileExtension === '.mov' || fileExtension === '.avi') {
      // Handling video streaming
      const fileSize = fs.statSync(filePath).size;
      const videoStream = fs.createReadStream(filePath, { highWaterMark: 10 * 1024 * 1024 });

      const rangeHeader = req.headers.range;
      if (!rangeHeader) {
        // No range requested, send the entire video
        res.writeHead(200, {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
        });
        videoStream.pipe(res);
      } else {
        // Parse the range header
        const ranges = rangeParser(fileSize, rangeHeader);

        if (ranges === -1) {
          // Invalid range
          res.status(416).send('Invalid Range');
          return;
        }

        // Only support single range for simplicity
        const { start, end } = ranges[0];
        const contentLength = end - start + 1;

        // Send the partial content (range) response
        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': contentLength,
          'Content-Type': 'video/mp4',
        });
        const partialVideoStream = fs.createReadStream(filePath, { start, end });
        partialVideoStream.pipe(res);
      }
    } else if (fileExtension === '.jpg' || fileExtension === '.jpeg' || fileExtension === '.png') {
      // Handling image streaming
      fs.readFile(filePath, (err, data) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error reading image file');
          return;
        }

        // Set the appropriate headers and send the image data as the response
        res.writeHead(200, {
          'Content-Type': 'image/jpeg',
          'Content-Length': data.length
        });
        res.end(data);
      });
    } else {
      // Unsupported file type
      res.status(415).send('Unsupported Media Type');
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}










//eventEmitter.on('storedEventIDChanged', handleStoredEventIDChange);

  // Call the handleStoredEventIDChange function immediately with the current storedEventID
  //HandelChangeEvent(storedEventID);

  // Return a response to the client
  //res.status(200).json({message:"video controller event  ocuured"})


//}