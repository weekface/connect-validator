var express = require('express');
var app = express.createServer();

var Validate = require('../lib/connect-validator').Validate;

//validate()的调用会返回一个中间件,
//这个时候需要向vadalite()传递一个我们需要验证的字段的对象
app.get('/book',Validate({
    name: function(){
        this.isNull();
    }
}), function(req,res){
    if(req.errmsg){
        res.send('<font color=\"red\">'+req.errmsg+'</font>');
    }
    else
        res.send('正确');
});

app.listen(4000);


