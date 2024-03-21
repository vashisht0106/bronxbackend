const express=require('express');
const { eventController, getEvent, videoController, getEventByID, imageController, mediaController } = require('../controller/EventController');

const router=express.Router()




router.route('/add_event').post(eventController) 
router.route('/find_event').get(getEvent)
router.route('/video/:eventid/:source').get(videoController)
router.route('/find').get(getEventByID)
router.route('/image/:eventid/:source').get(imageController)
router.route('/media/:eventid/:source').get(mediaController)


module.exports=router;