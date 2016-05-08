var path = require('path');
var fs = require('fs');
var OSS = require('aliyun-oss');
var ossUtil = require('./ossUtil').ossUtil;



module.exports = {
	upload:function(fileName,fn){
		ossUtil.upload(fileName,fn)
	}
	,init:function(k1,k2,domain,bname){
		ossUtil.init(k1,k2,domain,bname)
	}
}
