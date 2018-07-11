// import path from 'path';
import fs from 'fs';
let config={
    app:{
        port:process.env.PORT||8889,
        baseApi:'/api',
    },
    mongodb:{
        url: process.env.MONGO_URL || 'mongodb://localhost:27017/vue-blog',
    },
    jwt:{
        secret:"me"
    },
    mongodbSecret:{
        user:'',
        pass:'',
    },
    admin:{
        user:'admin',
        pwd:'password',
    },
    disqus:{
        url:''
    },
    baidu:{
        url:''
    }
};
export default config;

// const auth={
//     admin_secret:'admin-token',
//     tokenKey:'Token-Auth',
//     whiteList:['login','client_api'],
//     blackList:['admin_api']
// }

// const log={
//     logLevel:'debug',
//     dir:path.resolve(__dirname,"../../logs"),
//     projectName:'blog',
//     ip:'0.0.0.0'
// }

// const port=process.env.NODE_ENV==='production'?'80':'3000'

// export default{
//     env:process.env.NODE_ENV,
//     port,
//     auth,
//     log,
//     mongodb:{
//         username:'cd',
//         pwd:123456,
//         address:'localhost:27017',
//         db:'test'
//     }
// }