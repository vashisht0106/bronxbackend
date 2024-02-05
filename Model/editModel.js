const mongoose= require('mongoose')


    const editModel = new mongoose.Schema({
        name: String,
        url: String,
        tag:String,
      });


module.exports=mongoose.model('copyfile',editModel);
