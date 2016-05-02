
module.exports = {
  isImg:function(fileName){
  	var imgExtNames = ['gif','jpeg','jpg','png'];
	var path = require('path');
    var extname = path.extname(fileName);
    var is = imgExtNames.indexOf(extname.replace('.','')) != -1;
    return is;
  }
}
