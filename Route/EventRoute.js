const express=require('express');
const { eventController, getEvent, videoController, getEventByID } = require('../controller/EventController');

const router=express.Router()




router.route('/add_event').post(eventController) 
router.route('/find_event').get(getEvent)
router.route('/video/:eventid/:source').get(videoController)
router.route('/find').get(getEventByID)



module.exports=router;