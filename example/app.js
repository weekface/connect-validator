var express = require('express');
var app = express.createServer();

app.use(require('../lib/connect-validator')(__dirname+'/test.js'));

app.get('/book',function(req,res){
	if(req.errmsg){
		res.send('<font color=\"red\">'+req.errmsg['loginame']+'</font>');	
	}
	else
		res.send('正确');
});

app.listen(3000);


