var express = require('express');
var app = express.createServer();
var log = require('logging').from(__filename);
var Validate = require('../index.js').Validate;

//首先 new Validate()，之后调用其check方法，
//返回的结果是一个connect插件
//new Validate().check({
//  name: function(){
//      this.msg = "Invalid username!";
//      this.isChinese();
//  }
//})
app.get('/book',new Validate().check({
    name: function(){
        this.msg = "IP地址不对劲哦!";
        this.isIP();
    //this.isNumeric();
    }
}), function(req,res){
    if(req.errors){
        log(req.errors);
        res.send('<font color=\"red\">'+req.errors+'</font>');
    }
    else
        res.send('正确');
});

app.listen(4000);


