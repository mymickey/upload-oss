var path = require('path');
var fs = require('fs');
var OSS = require('aliyun-oss');
var _util = require('./util')._util;
var url = require('url');
var domain = 'http://ossfile.yunos.com/';

var bucketName = 'yunosshequ';
var oss ;
function getCurrentDir(){
	//根据当年当月生成目录
	var ossDir = 'pub/';//oss上文件夹名称
	var d = (new Date)
	var m = d.getMonth();
	var y = d.getFullYear();
	return ossDir+y+'-'+m+'/';
}
exports.ossUtil= {
	init:function  (aki,aks) {
		option = {
		  accessKeyId: aki,
		  accessKeySecret: aks
		};
		oss = OSS.createClient(option);
	},
	upload:function (fileName,fn){
		// console.log('upload：',fileName);
		// console.log("_util.getFileExtName(fileName):",_util.getFileExtName(fileName));
		// console.log("_util.getFileSize(fileName).size:",_util.getFileSize(fileName));
		// console.log("_util.getStorageName(fileName):",_util.getStorageName(fileName));
		var saveName = getCurrentDir() + _util.getStorageName(fileName);
		oss.putObject({
		  bucket: bucketName,
		  object: saveName,//保存的完整路径
		  source: fileName,//本地文件路径
		  headers: {
		    'Content-Length': _util.getFileSize(fileName)
		  }
		}, function (err, res) {
			fn(err,res.status == 200 ? url.resolve(domain,saveName) :null);
		});
		
	},
	getObjByKey:function(fileName){
		
	}
};
