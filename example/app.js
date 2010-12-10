var express = require('express');
var app = express.createServer();

app.use(require('../lib/connect-validator')(__dirname+'/test.js'));

//validate是我们的核心库，其作用是返回一个connect中间件
var validate = function(){
    return function(req,res,next){
    ///核心代码
    }
};

var validator = {};
//validate()的调用会返回一个中间件,
//这个时候需要向vadalite()传递一个我们需要验证的字段的对象
app.get('/book',validate({
    name: [validator.isString(),validator.isChinese()],
    school: validator.len(3,20)
}), function(req,res){
    if(req.errmsg){
        res.send('<font color=\"red\">'+req.errmsg['loginame']+'</font>');
    }
    else
        res.send('正确');
});

app.listen(3000);


