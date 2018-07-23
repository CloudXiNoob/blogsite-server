'use strict'

const Router = require('koa-router');
const User = require('../controllers/user')
const App = require('../controllers/app')
 
module.exports = function(){
    var router = new Router({
        prefix:'/api'
    })

    router.get('/test/user/users',User.users)
    router.post('/test/user/add',User.addUser)

    return router
}



// import koaRouter from 'koa-router'
// import path from 'path'
// import fs from 'fs'
// const router=koaRouter()

// export default app => {
//     router.post('/admin_demo_api/article/add',app.article.add)
//     app.use(router.routes())
//         .use(router.allowedMethods());
// }