'use strict'

var mongoose =  require('mongoose')
var User = mongoose.model('User')


/**
 * 增加用户
 * @param  {[User]} user [mongoose.model('User')]
 * @return {[type]}      [description]
 */
exports.addUser = async (user) => {
	user = await user.save()
	return user
}

exports.Login = async () => {
	let phoneNumber = req.query.phoneNumber;
	let passWord = req.query.passWord;
	User.findOne({phoneNumber:phoneNumber}).lean().exec( (err,doc) => {
		if(err) {
			res.json({
				status: '1',
				msg: err.message,
				result: ''
			})
		} else {
			if(!doc.passWord){
				res.json({
					status :'1',
					msg: '',
					result :'无此用户'
				})
			} 
			else{
				let pwd = md5(doc.passWord);
				doc.passWord = md5(doc.passWord);
				if(passWord == pwd) {
					res.json({
						status: '0',
						msg:'',
						result: doc
					})
				}else{
					res.json ({
						status:'1'
					})
				}
			}
		}
	})
}