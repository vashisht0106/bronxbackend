const express=require('express')
const { saveImageControle, original, imagefilter } = require('../controller/imageController')
const multer=require('multer');
//const { edit, geteditfile } = require('../controller/editController');
//const { newEdit } = require('../controller/newEditController');
//const { newEdit2 } = require('../controller/new2Controller');
const router=express.Router()
const path=require('path');
// Configure multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //const jsonData = JSON.parse(req.headers['x-json-data'])
        //const folderName = jsonData.folderName;

        //let rootfolder=jsonData.rootfolder;
        //let childfolder=jsonData.childfolder;
        //const folderPath = path.join('uploads', rootfolder,)
        //console.log('folderPath=',folderPath)
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const add =file.originalname;
        cb(null, add);
    }
});


const upload = multer({ storage });

router.route('/upload').post(upload.array('video',200),saveImageControle)


//const storage = multer.memoryStorage();
//const upload = multer({ storage });

//router.route('/edit').post(upload.single('logo'),newEdit2)    
//router.route('/edit').post(newEdit2)    

//router.route('/get').get(geteditfile)
//router.route('/getorg').get(original)
//router.route('/filter').get(imagefilter)
module.exports=router;
