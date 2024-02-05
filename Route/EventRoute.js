const express=require('express');
const { eventController, getEvent, videoController } = require('../controller/EventController');

const router=express.Router()




router.route('/add_event').post(eventController) 
router.route('/find_event').get(getEvent)
router.route('/video/:eventid').get(videoController)



module.exports=router;