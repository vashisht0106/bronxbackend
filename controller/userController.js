//const ErrorHander = require("../../utils/errorHander");
const userSchema = require("../Model/userModel");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const crypto = require('crypto')
const CryptoJS = require('crypto-js')
const Asyn = require("../middileware/Asyn");
// const SendEmail=require('../utils/SendEmail')
//const SendEmail = require("../../utils/SendEmail");
const option = { expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) }

//register user
exports.registeruser =Asyn( async (req, res, next) => {
    let { name, email,location } = req.body


let userF=await userSchema.findOne({email})
if(userF){

res.status(200).json({success:false,message:"Email all ready exist!"})

}
else{
    let user = await userSchema.create({
        name, email,location,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()

        ,
        avatar: {

            public_id: "samle id",
            url: "sample url"

        }
       
    })

    const token = user.jwtToken();

res.status(201).cookie('token', token, option,).json({ success: true, token,user })

}
});
//login user


exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!(email && password)) {
            return res.status(400).json({ success: false, message: 'Email and password cannot be empty' });
        }

        // Find user by email
        const user = await userSchema.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found. Please register first and login again.' });
        }

        // Decrypt and compare passwords
        const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
        if (decryptedPassword !== password) {
            return res.status(401).json({ success: false, message: 'Incorrect email or password' });
        }

        // Generate JWT token
        const token = user.jwtToken()

        // Send token as cookie
        res.cookie('token', token, 
         option,
         {httpOnly:true,}
         
         
         
         ).json({ success: true, token, user} )
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

//logout
exports.logoutUser = async (req, res, next) => {

    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(201).json({ message: 'you are Logged out' })

    next();
};

//// forget password token genrate
//exports.forgetPassword = async (req, res, next) => {
//    const user = await userSchema.findOne({ email: req.body.email })
//    if (!req.body.email) {
//        res.status(404).json({ message: 'please enter email id' })
//    }
//    if (!user) {
//        res.status(404).json({ message: 'user not found' })
//    }
//    let resetToken = user.getforgetPasswordToken();
//    await user.save({ validateBeforeSave: false })
//    let resetPasswordUrl = req.protocol + '://' + req.get("host") + '/api/v1/password/reset/' + resetToken
//    console.log(resetPasswordUrl)
//    let message = 'click this link and reset your password \n' + resetPasswordUrl + ' \n\n if this email not sent you please ignore it';
//    try {
//        await SendEmail({
//            email: user.email,
//            subject: ' Eccommerce Password Rocevery ',
//            message,

//        })
//        console.log('resetToken is here', resetToken)
//        res.status(200).json({ success: true, message: 'password reset link sent to your email  ' + user.email + '  please check' })
//    } catch (error) {

//        user.resetPasswordExpired = undefined;
//        user.resetPasswordExpired = undefined;
//        await user.save({ validateBeforeSave: false })
//        res.status(500).send(error.message)
//    }

//};

















exports.authanticatedUser = async(req, res, next) => {
    try {
        let {token} = req.cookies;

        //console.log(token)
        console.log(token)
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized: Access Denied" });
        }

      

        jwt.verify(token, process.env.JWT_SECRET,async(err, decoded) => {
            if (err) {
                console.error(err);
                return res.status(401).json({ success: false, message: 'Invalid token' });
            }
            console.log(decoded.id)
       
            const user=await userSchema.findById(decoded.id,)
            req.user=user;
       

            if (!user) {
                return res.status(401).json({ success: false, message: 'User not found' });
            }
    
//   console.log(req.user)
        next(); // Move to the next middleware
        })
        

        }
    catch(error){
        console.log(error)
        // Handle any errors during token verification or user retrieval
        res.status(401).json({ success: false, error});
    }
};


exports.Authoriserole = (...roles) => {
   return async (req, res, next) => { 
        if (!roles.includes(req.user.role)) {
            res.status(403).json({ message: 'you can not access these resource' })
        };

        next();
    }
};







exports.loadUser=Asyn(async(req,res,next)=>{

try {
    const user = await userSchema.findById(req.user.id);
    //console.log(decoded.id)
    // let token=jwtToken()
    res.status(200).json({success:true,user})
} catch (error) {
   console.log(error) 
   res.status(500).json({success:false,message:"invernal server error"})

}

    
    });
    
    //exports.getallUser=Asyn(async(req,res,next)=>{
    
    //const allUser=await  userSchema.find({
    //    $or: [{
    //        "role": { $regex: "user" },
    //    }]
    //})
    
    //res.status(200).json(allUser);
    
    
    //})
    






////reseting  password

//exports.resetPassword = Asyn(async (req, res, next) => {

//    let resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
//    let user = await userSchema.findOne({ resetPasswordToken, resetPasswordExpired: { $gt: Date.now() } })
//    // await user.save()

//    if (!user) {
//        res.status(401).json({ message: 'invilid user or expired token ' })

//    }
//    if (req.body.password != req.body.confirmPassword) {
//        res.status(401).json({ messsage: 'password and confirm password should be same' })
//    }
//    newpassword = req.body.password;
//    user.password = CryptoJS.AES.encrypt(newpassword, process.env.SECRET_KEY).toString();
//    user.resetPasswordToken = undefined;
//    user.resetPasswordExpired = undefined;
//    await user.save()

//    const token = user.jwtToken()
//    res.status(200).cookie('token', token, option).json({ success: true, message: "password changed successfully done", token })

//});

//get user detail

//exports.getUserDetail=Asyn(async(req,res,next)=>{


//const user= await userSchema.findById(req.user.id);

//// let token=jwtToken()
//res.status(200).json({success:true,user})

//});

//exports.getallUser=Asyn(async(req,res,next)=>{

//const allUser=await  userSchema.find({
//    $or: [{
//        "role": { $regex: "user" },
//    }]
//})

//res.status(200).json(allUser);


//})


//update password


//exports.updateUserPassword=Asyn( async(req,res,next)=>{
//    let userUpdate={
        

//password:CryptoJS.AES.encrypt(req.body.password,process.env.SECRET_KEY).toString()



//    };
//    if(req.body.password !=req.body.confirmPassword){res.status(401).json({message:'password and confirm Password should be same'})}

//let user=await userSchema.findByIdAndUpdate(req.user.id,userUpdate,{

//    new:true,
//    runValidators:true,
//    usefindAndModify:false,
//}).select("+password")

//res.status(200).json({message:true,user})
//});

//// update profile detail
//exports.updateProfileDetail=async(req,res,next)=>{
//let userDetail={

//name:req.body.name,
//email:req.body.email,

////avatar:{
////    public_id:'smpke',
////    url:req.body.url}

//};

//let user=await userSchema.findByIdAndUpdate(req.user.id,userDetail,{
//    new:true,
//    runValidators:true,
//    usefindAndModify:false,
//})

//res.status(200).json({successe:true,user})
//}



