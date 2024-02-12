const express = require('express')
const { addMediaplayer, getMediaPlayer } = require('../controller/mediaplayerController')

const router = express.Router()



router.route('/add/media').post(addMediaplayer)
router.route('/get/media').get(getMediaPlayer)



module.exports =router;