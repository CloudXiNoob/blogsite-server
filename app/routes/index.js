import koaRouter from 'koa-router'
import path from 'path'
import fs from 'fs'
const router=koaRouter()

export default app => {
    router.post('/admin_demo_api/article/add',app.article.add)
    app.use(router.routes())
        .use(router.allowedMethods());
}