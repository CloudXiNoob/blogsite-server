import ArticleModel from '../models/articles.js'
/**
 *  创建文章
 */
export  async function createArticle(ctx){
    const title = ctx.request.body.title; //标题
    const tag = ctx.request.body.tag;     //标签
    const desc = ctx.request.body.desc;   //描述
    const content = ctx.request.body.content; //内容
    // const createTime = new Date();          //创建时间
    // const lastEditTime = new Date();        //最后修改时间
    if (title === '') {
        ctx.throw(400, '标题不能为空');
    }
    if (tag === '') {
        ctx.throw(400, '标签不能为空');
    }
    if (desc === '') {
        ctx.throw(400, '描述不能为空');
    }
    if (content === '') {
        ctx.throw(400, '内容不能为空');
    }
    const article = new ArticleModel({
        title,
        tag,
        desc,
        content
    });
    let createResult =  await article.save().catch(err => {
        ctx.throw(500, '服务器内部错误')
    })
    await ArticleModel.populate(createResult,{path:'tag'},function(err,result){
        createResult = result;
    })
    ctx.body ={
        success:true,
        article:createResult,
    }
}

// 修改文章
export async function(ctx){
    
}
