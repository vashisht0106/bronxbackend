
// const ErrorHander=require('..utils//errorHander')
module.exports=(err,req,res,next)=>{

err.statuscode=error.statuscode||500
err.message=error.message||"internal server error hello brother"
res.status(err.statuscode).json({success:false,error:err.message})


}