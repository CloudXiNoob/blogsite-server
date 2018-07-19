import Koa from 'koa'
import ip from 'ip'
import conf from './config'
import router from './app/routes'
import middleware from './app/middleware'
import './mongodb'

const app=new Koa()
middleware(app)
router(app)
app.listen(conf.port,'0,0,0,0',()=>{
    console.log(`server is running at http://${ip.address()}:${conf.port})`)
})


// var mongoose=require('mongoose');
// var DB_URL='mongodb://127.0.0.1:27017/vueblog';
// mongoose.connect(DB_URL);

// var connection=mongoose.connection;
// connection.on('error',function(err){
//     console.error(err);
// });
// connection.on('open',function(){
//     console.log('opened');
// });
// connection.on('disconnected',function(){
//     console.log("disconnected");
// });

// module.exports=mongoose;