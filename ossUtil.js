var path = require('path');
var fs = require('fs');
var OSS = require('aliyun-oss');
var _util = require('./util')._util;
var url = require('url');
var domain ; 
//var bucketName; //= 'bunny-public'//yunosshequ';

var ossDir = 'pub/';//oss上文件夹名称
function getCurrentDir(){
	//根据当年当月生成目录
	var d = (new Date)
	var m = d.getMonth();
	var y = d.getFullYear();
	return ossDir+y+'-'+m+'/';
}
exports.ossUtil= {
	init:function  (aki,aks,_domain,bucketName) {
		option = {
		  accessKeyId: aki,
		  accessKeySecret: aks,
		  bucketName:bucketName
		};
		
		domain = _domain;
	},
	upload:function (fileName,fn ){

		if (!fileName && !option) {
			return;
		};
		var dirName = getCurrentDir();
		var _fileName = fileName;
		if (fileName && fileName.dirName && fileName.fileName) {
			dirName = path.join(ossDir,fileName.dirName);
			_fileName = fileName.fileName
		}
		var saveName = path.join(dirName , _util.getStorageName(_fileName));
	    if (!option){
	      console.error('oss not init');
	      return;
	    }
	    var oss = OSS.createClient(option) ;
	    console.log('upload config:',bucketName,saveName,_fileName,JSON.stringify(option))
	    oss.putObject({
			  bucket: option.bucketName,
			  object: saveName,//保存的完整路径
			  source: _fileName,//本地文件路径
			  headers: {
			    'Content-Length': _util.getFileSize(_fileName)
			  }
			}, function (err, res) {
				console.log('upload complate:',err);
				fn(err,res && res.status == 200 ? url.resolve(domain,saveName) :null);
			});

	},
	getObjByKey:function(fileName){

	}
};
