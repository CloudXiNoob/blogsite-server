import articleModel from '../models/articles'
import path from 'path'

module.exports={
    // async list(ctx,next){
    //     //获取博客列表
    //     let {keyword,pageIndex=1,pageSize=10}=ctx.request.query;
    //     try{
    //         let reg=new RegExp(keyword,"i")
    //         let data = await ctx.findPage(blogModel, {
    //             $or:[
    //                 {type: {$regex: reg}},
    //                 {title: {$regex: reg}}
    //             ]
    //         },{createTime: 0,html : 0},{limit:pageSize*1,skip:(pageIndex-1)*pageSize});
    //         ctx.send(data)
    //     }catch(e) {
    //         console.log(e);
    //         ctx.sendError(e);
    //     }
    // },

    async add(ctx,next) {
        //新增文章
        let paramsData=ctx.request.body;
        try{
            let data=await ctx.findOne(articleModel,{title:paramsData.title});
            if (data){
                ctx.sendError('数据已经存在, 请重新添加!')
            }
            else {

            }
        }catch(e){
            ctx.sendError(e)
        }
    }
}