var path = require('path');
var fs = require('fs');
var OSS = require('aliyun-oss');
var _util = require('./util')._util;
var url = require('url');
var domain ; //'http://cdn.bunny-tech.com/'//'http://ossfile.yunos.com/';
var bucketName = 'bunny-public'//yunosshequ';
var oss ;
var ossDir = 'pub/';//oss上文件夹名称
function getCurrentDir(){
	//根据当年当月生成目录
	var d = (new Date)
	var m = d.getMonth();
	var y = d.getFullYear();
	return ossDir+y+'-'+m+'/';
}
exports.ossUtil= {
	init:function  (aki,aks,_domain) {
		option = {
		  accessKeyId: aki,
		  accessKeySecret: aks
		};
		domain = _domain;
		oss = OSS.createClient(option);
	},
	upload:function (fileName,fn){
		if (!fileName) {
			return;
		};
		var dirName = getCurrentDir();
		var _fileName = fileName;
		if (fileName && fileName.dirName && fileName.fileName) {
			dirName = path.join(ossDir,fileName.dirName);
			_fileName = fileName.fileName
		}
		var saveName = path.join(dirName , _util.getStorageName(_fileName));
	    if (!oss){
	      console.error('oss not init');
	      return;
	    }
	    oss.putObject({
			  bucket: bucketName,
			  object: saveName,//保存的完整路径
			  source: _fileName,//本地文件路径
			  headers: {
			    'Content-Length': _util.getFileSize(_fileName)
			  }
			}, function (err, res) {
				fn(err,res && res.status == 200 ? url.resolve(domain,saveName) :null);
			});

	},
	getObjByKey:function(fileName){

	}
};
