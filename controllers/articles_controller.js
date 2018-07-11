import Article from '../models/articles.js';
import md5 from 'md5';
import jwt from 'jsonwebtoken';
import config from '../config';

export async function createArticle(ctx) {
    const title=ctx.request.body.title;
    const content=ctx.request.body.content;
    const abstract=ctx.request.body.abstract;
    const publish=ctx.request.body.publish;
    const tags=ctx.request.body.tags;
    const createTime=new Date();
    const lastEditTime=new Date();
    // 做非空校验
    if(title===''){
        ctx.throw(400,'标题不能为空')
    }
    if(content===''){
        ctx.throw(400,'文章内容不能为空')
    }
    if(abstract===''){
        ctx.throw(400,'摘要不能为空')
    }
    const article=new Article({
        title,
        content,
        abstract,
        publish,
        tags,
        createTime,
        lastEditTime,
    });
    let createResult=await article.save().catch(err=>{
        ctx.throw(500,'服务器内部错误')
    })
    await Article.populate(createResult,{path:'tags'},function(err,result){
        createResult=result;
    });
    console.log('文章创建成功')
    ctx.body={
        success:true,
        article:createResult,
    };
}

// 获取所有文章
export async function getAllArticles(ctx){
    const tag=ctx.query.tag;
    const page=+ctx.query.page;
    const limit=+ctx.query.limit||4;
    let skip=0;
    let articleArr;
    let allPage;
    let allNum;
    if(page!==0){
        skip=limit*(page-1);
    }
    if(tag===''){
        articleArr=await Article.find()
            .populate('tags')
            .sort({createTime:-1})
            .limit(limit)
            .skip(skip).catch(err=>{
                ctx.throw(500,'服务器内部错误')
            });
        allNum=await Article.count().catch(err=>{
            this.throw(500,'服务器内部错误')
        })
    }else{
        let tagArr=tag.split(',');
    }
}