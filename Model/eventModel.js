// models/Event.js
const mongoose = require('mongoose');
const crypto = require('crypto');
const eventSchema = new mongoose.Schema({
  eventid:{type:String,default:generateRandom5DigitHexString},
  title: { type: String, required: true },
  startdate: { type: String, required: true },
  enddate: { type: String, required: true },
  starttime: { type: String, required: true },
  endtime: { type: String, required: true },
  layoutstyle: { type: String, required: true },
  source: { type: String, required: true },
});

// Function to generate random 5-digit hexadecimal string
function generateRandom5DigitHexString() {
  const randomHex = Math.floor(Math.random() * 0xFFFFF).toString(16);
  return randomHex.padStart(5, '0'); // Ensure it is 5 characters long
}



const eventModel = mongoose.model('Event', eventSchema);

module.exports = eventModel;
