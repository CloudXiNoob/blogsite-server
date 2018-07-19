/**
 * 
 * @param {*} model 要操作数据库的模型
 * @param {*} conditions 增加的条件,如{id:xxx}
 */
export const add=(model,conditions)=>{
    return new Promise((resolve,reject)=>{
        model.create(conditions,(err,res)=> {
            if(err){
                console.log('Error:'+JSON.stringify(err));
                reject(err);
                return false;
            }
            console.log('save success')
            resolve(res);
        })
    })
}

/**
 * 
 * @param {*} model 
 * @param {*} conditions 
 * @param {*} update 
 * @param {*} options 
 */
export const update=(model,conditions,update,options)=> {
    return new Promise((resolve,reject) => {
         model.update(conditions,update,options,(err,res) => {
             if(err){
                 console.error('Error:' + JSON.stringify(err));
                 reject(err);
                 return false;
             }
             if(res.n!=0) {
                 console.log('update success');
             }
             else {
                 console.log('update fail:no this data');
             }
             resolve(res);
         })
    })
}


export const remove = (model,conditions) => {   
    return new Promise((resolve,reject) => {
        model.remove(conditions,function (err,res) {
            if(err) {
                console.log('Error:' + JSON.stringify(err));
                reject(err);
                return false;
            }
            else{
                if(res.result.n!=0) {
                    console.log('remove success');
                }
                else{
                    console.log('remove fail:no this data');
                }
                reject(res);
            }
        })
    })
}


export const find=(model,conditions,fields,options={}) => {
    var sort=options.sort == undefined ? {_id:-1}:options.sort;
    delete options.sort;
    return new Promise((resolve,reject) => {
        model.find(conditions,fields, options, function(err,res) {
            if(err){
               console.error('Error:' + JSON.stringify(err));
               reject(err);
               return false;
            } else {
                if (res.length!=0){
                    console.log('find success');
                }
                else {
                    console.log('find fail:no this data');
                }
                resolve(res)
            }
        }).sort(sort);
    })
}


export const findOne = (model,conditions,fields,options={}) => {
    var sort = options.sort ==undefined ? {_id:-1}:options.sort;
    delete options.sort;
    return new Promise((resolve,reject) => {
        model.findOne(conditions,fields,options, function(err,res) {
            if(err) {
                console.error('Error:' + JSON.stringify(err));
                reject(err);
                return false;
            }else{
                if(res) {
                    console.log('find success!');
                }
                else {
                    console.log('find fail:no this data!');
                }
                resolve(res);
            }
        }).sort(sort);
    })
}

export const findPage = async (model, conditions, fields, options = {}) => {
    var sort = options.sort == undefined ? {
        _id: -1
    } : options.sort;
    delete options.sort;
    
    const getCount = () => {
        return new Promise((resolve, reject) => {
            model.find(conditions, fields).count({}, (err, res) => {
                if (err) {
                    console.log('查询长度错误')
                    return reject(err);
                }
                
                resolve(res)
            })
        })
    }

    const count = await getCount()
    
    return new Promise((resolve, reject) => {
        model.find(conditions, fields, options, function (err, res) {
            if (err) {
                console.error('Error: ' + JSON.stringify(err));
                reject(err);
                return false;
            } else {
                if (res.length != 0) {
                    console.log('find success!');
                    resolve({
                        list: res,
                        total: count
                    })
                } else {
                    console.log('find fail:no this data!');
                    resolve({
                        list: res,
                        total: count
                    })
                }
            }
        })

    })
}