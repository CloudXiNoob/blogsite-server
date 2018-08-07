'use strict'

const xss = require('xss');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

/**
 * 设置用户名、密码
 */
export async function initUser() {
  let user = await User.find().exec().catch(err => {
    console.log(err);
  })
  if (user.length === 0) {
    user = new User({
      nickname: 'cloudxi',
      avatar: 'http://ip.example.com/u/xxx.png',
      phoneNumber: xss('17602188928'),
      passWord: md5('zxr99382649582')
    });
    await user.save().catch(err => {
      console.log(err);
    })
  }
}


/**
 *  登录
 */
export async function login(ctx) {
  console.log(1);
  const phoneNumber = ctx.request.body.phoneNumber;
  const passWord = ctx.request.body.passWord;
  let user = await User.findOne({
    phoneNumber,
  }).exec();
  if (user != null) {
    if (user.passWord === passWord) {
      const token = jwt.sign({
        uid: user._id,
        name: user.nickname,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 1 hours
      }, 'me');
      ctx.body = {
        success: true,
        uid: user._id,
        name: user.nickname,
        token: token,
      };
    } else {
      ctx.body = {
        success: false,
        message: '密码错误'
      };
    }
  } else {
    ctx.body = {
      success: false,
      message: '用户名错误'
    };
  }
}