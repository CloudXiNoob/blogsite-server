'use strict'

const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')

const db = 'mongodb://localhost/blog'

/** 
 * 连接数据库
 */
mongoose.Promise = require('bluebird')
mongoose.connect(db)

const models_path = path.join(__dirname, '/app/models')

var walk = function(modelPath) {
  fs.readdirSync(modelPath)
    .forEach(function(file) {
      var filePath = path.join(modelPath, '/' + file)
      var stat = fs.statSync(filePath)
      if (stat.isFile()) {
        if (/(.*)\.(js|coffee)/.test(file)) {
          require(filePath)
        }
      }
      else if (stat.isDirectory()) {
        walk(filePath)
      }
    })
}

walk(models_path);

require('babel-register');
const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const koaCors = require("koa2-cors");
const app = new Koa()

app.keys = ['cloudxi'];
app.use(logger());
app.use(bodyParser());
app.use(koaCors());

/**
 * 使用路由转发请求
 */
const router = require('./app/routes/index')()

app.use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
console.log('app started at port 3000...');