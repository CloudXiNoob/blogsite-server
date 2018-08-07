import ArticleModel from '../models/articles.js'
/**
 *  创建文章
 */
export async function createArticle(ctx) {
  const title = ctx.request.body.title; //标题
  const tag = ctx.request.body.tag; //标签
  const desc = ctx.request.body.desc; //描述
  const content = ctx.request.body.content; //内容
  const publish = ctx.request.body.publish; //是否发布
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
    content,
    publish
  });
  let createResult = await article.save().catch(err => {
    ctx.throw(500, '服务器内部错误')
  })
  await ArticleModel.populate(createResult, { path: 'tag' }, function(err, result) {
    createResult = result;
  })
  ctx.body = {
    success: true,
    article: createResult,
  }
}

/**
 *  查询所有文章
 */
export async function getAllArticle(ctx) {
  const tag = ctx.request.body.tag;
  const page = +ctx.request.body.page;
  const limit = +ctx.request.body.limit || 8;
  let skip = 0;
  let articleArr;
  let allPage;
  let allNum;

  // 判断从第几页从第几条数据开始显示
  if (page !== 0) {
    skip = limit * (page - 1);
  }

  //根据是否有标签来显示
  if (tag === '') {
    articleArr = await ArticleModel.find()
      .sort({ createTime: -1 })
      .limit(limit)
      .skip(skip).catch(err => {
        ctx.throw(500, '服务器内部错误');
      });
    allNum = await ArticleModel.count().catch(err => {
      this.throw(500, '服务器内部错误');
    });
  } else {
    let tagArr = tag.split(',');
    articleArr = await ArticleModel.find({
        tag: { $in: tagArr },
      })
      .sort({ createTime: -1 })
      .limit(limit)
      .skip(skip).catch(err => {
        ctx.throw(500, '服务器内部错误');
      })
    allNum = await ArticleModel.find({
      tag: { $in: tagArr },
    }).count().catch(err => {
      ctx.throw(500, '服务器内部错误');
    });
  }
  allPage = Math.ceil(allNum / limit);
  ctx.body = {
    success: true,
    articleArr,
    allPage: allPage,
    allNum: allNum
  }
}

/**
 *  修改文章
 */
export async function modifyArticle(ctx) {
  const id = ctx.params.id;
  const title = ctx.request.body.title;
  const tag = ctx.request.body.tag;
  const desc = ctx.request.body.desc;
  const content = ctx.request.body.content;
  if (title === '') {
    ctx.throw(400, '标题不能为空')
  }
  if (content === '') {
    ctx.throw(400, '文章内容不能为空')
  }
  if (desc === '') {
    ctx.throw(400, '摘要不能为空');
  }
  if (tag === '') {
    ctx.throw(400, '标签不能为空');
  }

  const article = await ArticleModel.findByIdAndUpdate(id, { $set: ctx.request.body }).catch(err => {
    if (err.name === 'CastError') {
      ctx.throw(400, 'id不存在')
    } else {
      ctx.throw(500, '服务器内部错误')
    }
  });
  ctx.body = {
    success: true,
    message: '修改成功!'
  }
}

/**
 *    删除文章
 */
export async function deleteArticle(ctx) {
  let id = ctx.params.id;
  console.log(id);
  const article = await ArticleModel.findByIdAndRemove(id).catch(err => {
    if (err.name === 'CastError') {
      this.throw(400, 'id不存在');
    } else {
      this.throw(500, '服务器内部错误');
    }
  });
  ctx.body = {
    success: true,
    message: '删除成功'
  }
}

/** 
 * 根据id来显示文章
 */
export async function showArticleById(ctx) {
  let id = ctx.params.id;
  const article = await ArticleModel.findById(id).catch(err => {
    if (err.name === 'CastError') {
      ctx.throw(400, 'id不存在');
    } else {
      ctx.throw(500, '服务器内部错误');
    }
  });
  ctx.body = {
    success: true,
    article: article
  }
}

/**  
 * 获取状态为发布的文章
 */
export async function getAllPublishArticle(ctx) {
  const tag = ctx.request.body.tag;
  const page = +ctx.request.body.page;
  const limit = +ctx.request.body.limit || 10;
  let skip = 0;
  let articleArr;
  let allPage;
  let allNum;

  if (page !== 0) {
    skip = limit * (page - 1);
  }

  if (tag === '') {
    articleArr = await ArticleModel.find({
      publish: true,
    }).sort({ createTime: -1 }).limit(limit).skip(skip).catch(err => {
      ctx.throw(500, '服务器内部错误');
    });
    allNum = await ArticleModel.find({
      publish: true,
    }).count().catch(err => {
      this.throw(500, '服务器内部错误');
    });
  } else {
    let tagArr = tag.split(',');
    articleArr = await ArticleModel.find({
      tag: { $in: tagArr },
      publish: true,
    }).sort({ createTime: -1 }).limit(limit).skip(skip).catch(err => {
      ctx.throw(500, '服务器内部错误')
    });
    allNum = await Article.find({
      tag: { $in: tagArr },
    }).count().catch(err => {
      ctx.throw(500, '服务器内部错误');
    });
  }
  allPage = Math.ceil(allNum / limit);
  ctx.body = {
    success: true,
    articleArr,
    allPage: allPage,
    allNum: allNum
  }
}