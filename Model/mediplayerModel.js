// models/Event.js
const mongoose = require('mongoose');
const crypto = require('crypto');
const mediaplayerSchema = new mongoose.Schema({
  mediaid:{type:String,default:generateRandom5DigitHexString},
  title: { type: String, required: true },
  location: { type: String, required: true },
});

// Function to generate random 5-digit hexadecimal string
function generateRandom5DigitHexString() {
  const randomHex = Math.floor(Math.random() * 0xFFFFF).toString(16);
  return randomHex.padStart(6, '0'); // Ensure it is 5 characters long
}



const mediaplayerModel = mongoose.model('mediaplyer', mediaplayerSchema);

module.exports = mediaplayerModel;
