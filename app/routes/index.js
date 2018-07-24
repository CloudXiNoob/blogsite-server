'use strict'

const Router = require('koa-router');
const blog = require('../controllers/article')
import * as $ from '../controllers/user.js'
import verify from '../middleware/auth/index.js';
 
module.exports = function(){
    var router = new Router({
        prefix:'/api'
    })
    // 直接设置用户名密码
    $.initUser();
    // 登录
    router.post('/user/login',$.login)
    //新建文章
    router.post('/article/create',verify,blog.createArticle)
    return router
}
