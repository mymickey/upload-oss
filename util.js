var path = require('path');
var fs = require('fs');
var imageSize = require('images');
var uuid = require('node-uuid');
var imgExtNames = ['bmp','gif','jpeg','jpg','png'];
exports._util = {
	getFileSize:function (fileName,fn){
		return fs.statSync(fileName).size;
	},
	getFileExtName:function  (fileName) {
		return path.extname(fileName);
	},
	getNewFileName:function(){
		return uuid.v4();
	},
	//获取保存到OSS的名称
	getStorageName:function(fileName){
		var extname = this.getFileExtName(fileName);
		var isImg = imgExtNames.indexOf(extname.replace('.','')) != -1;
		var width = '',height=width,imgExtName = '';
		if (isImg) {
			height = imageSize(fileName).height();
			width = imageSize(fileName).width();
			imgExtName = '_'+height+'x'+width
		}
		return this.getNewFileName()+imgExtName+extname;
	}
}