const mongoose= require('mongoose')


    const imageSchema = new mongoose.Schema({
        name: String,
        url: String,
        tag:String,
      });


module.exports=mongoose.model('excelfile',imageSchema);
