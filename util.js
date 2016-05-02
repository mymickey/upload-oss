var path = require('path');
var fs = require('fs');
var imageSize = require('image-size')
//var imageSize = require('images');
var uuid = require('node-uuid');

exports._util = {
  isImg :function (fileName){
    var imgExtNames = ['gif','jpeg','jpg','png'];
    var path = require('path');
    var extname = path.extname(fileName);
    var is = imgExtNames.indexOf(extname.replace('.','')) != -1;
    return is;
  },
    getFileSize:function (fileName,fn){
		return fs.statSync(fileName).size;
	},
	getFileExtName:function  (fileName) {
		return path.extname(fileName);
	},
	getNewFileName:function(fileName){
		return path.basename(fileName,path.extname(fileName));
		//return uuid.v4();
	},
	//获取保存到OSS的名称
	getStorageName:function(fileName){
		var extname = this.getFileExtName(fileName);
		var isImg = this.isImg(fileName)
		var width = '',height=width,imgExtName = '';
		if (isImg) {
      		var opt = imageSize(fileName);
			height = opt.height;
			width = opt.width;
			imgExtName = '_'+height+'x'+width
		}
		return this.getNewFileName(fileName)+imgExtName+extname;
	}
}
