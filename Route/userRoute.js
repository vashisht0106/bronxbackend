const express=require('express');
//const { authanticatedUser, Authoriserole } = require('../Authantication');
const { registeruser, loginUser, authanticatedUser, getUserDetail, loadUser, logoutUser} = require('../controller/userController');
const router=express.Router();


router.route('/user/register').post(registeruser);
router.route('/user/login').post(loginUser)
router.route('/user/detail').get(authanticatedUser,loadUser)
router.route('/user/logout').get(logoutUser)

//router.route('/logout').get(logoutUser)
//router.route('/password/forget').post(forgetPassword)
//router.route('/password/reset/:token').put(resetPassword)
//router.route('/user/password/update').put(authanticatedUser,updateUserPassword)
//router.route('/user/update/profile').put(authanticatedUser ,updateProfileDetail)


//router.route('/admin/users').get(getallUser)
module.exports=router;