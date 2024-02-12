//const rangeParser = require('range-parser');
//const fs = require('fs');
//const http=require('http');
//const path=require('path');
//const { eventEmitter } = require("../socket");
const mediaplayerModel = require('../Model/mediplayerModel');


exports.addMediaplayer = async (req, res) => {
  try {
    const {title, location } = req.body;

    // Validate input (you may need to adjust the validation logic)
    if (!title || !location ) {
      return res.status(400).json({success:false, error: "All fields are required" });
    }

    // Create a new event instance
    const mediaplayer = new mediaplayerModel({
      title,
      location
    });

    // Save the event to the database
    const savedmediaplayer = await mediaplayer.save();

    res.status(201).json(savedmediaplayer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};




exports.getMediaPlayer=async(req,res)=>{

try {
  const mediaplayer=await mediaplayerModel.find();
  res.status(200).json(mediaplayer)
} catch (error) {
  res.status(500).json({succes:false,message:"something error occured to get mediaplayer detail"})
}


}