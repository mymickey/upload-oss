var path = require('path');
var fs = require('fs');
var OSS = require('aliyun-oss');
var ossUtil = require('./ossUtil').ossUtil;

//var fileName = './1.jpg';
//fileName = path.join(__dirname,fileName);


//ossUtil.getObjByKey('b08fd6c3-62c8-4d9b-b3fb-39e5f3c5ce9b_310x310.jpg')

module.exports = {
	upload:function(fileName,fn){
		ossUtil.upload(fileName,fn)
	}
	,init:function(k1,k2){
		ossUtil.init(k1,k2)
	}
}