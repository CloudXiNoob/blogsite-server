'use strict'

const xss = require('xss');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const uuid = require('uuid');
const md5 = require('md5');

import userHelper from '../dbhelper/user'

/**
 * 注册新用户
 * @param {Function} next 
 * @yield {[type]} 
 */
exports.signup = async (ctx, next) => {
	var phoneNumber = xss(ctx.request.body.phoneNumber.trim())
	var user = await User.findOne({
	  phoneNumber: phoneNumber
	}).exec()
  console.log(user)
	
	var verifyCode = Math.floor(Math.random()*10000+1)
  console.log(phoneNumber)
	if (!user) {
	  var accessToken = uuid.v4()
	  user = new User({
	    nickname: '测试用户',
	    avatar: 'http://upload-images.jianshu.io/upload_images/5307186-eda1b28e54a4d48e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
	    phoneNumber: xss(phoneNumber),
	    verifyCode: verifyCode,
	    accessToken: accessToken
	  })
	}
	else {
	  user.verifyCode = verifyCode
	}

	try {
    user = await user.save()
    ctx.body = {
      success: true
    }
  }
  catch (e) {
    ctx.body = {
      success: false
    }

    return next
  }

}

// 添加用户
exports.addUser = async (ctx, next) => {
  var user = new User({
      nickname: 'cloudxi',
      avatar: 'http://ip.example.com/u/xxx.png',
      phoneNumber: xss('17602188928'),
      passWord:md5('zxr99382649582')
    })
  var user2 =  await userHelper.addUser(user)
  if(user2){
    ctx.body = {
      success: true,
      data : user2
    }
  }
}

// 根据手机号查找用户登录界面
exports.login = async (ctx) => {
  const phoneNumber = ctx.request.body.phoneNumber;
  const passWord = ctx.request.body.passWord;
  let user = await userHelper.findOne({
    phoneNumber
  }).exec();
  if(user!=null){
    if(user.passWord === passWord){
      const token = jwt.sign ({
        uid :user.id,
        name:user.name,
        exp:Math.floor(Date.now() / 1000)+24*60*60
      })
    }
  }
}