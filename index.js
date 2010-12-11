//本插件利用node-validator验证库
var nodeValidator = require('./vendor/node-validator').Validator;
//var log = require('logging').from(__filename);
var nv = new nodeValidator();

var Validate = function(){
    this.fieldName = "null";
    this.errors = null;
    this.nodeValidator = nv;
    var self = this;
    nv.error = function(msg){
        var error = {
            field: self.fieldName,
            message: msg
        };
        if(self.errors){
            self.errors.push(error);
        } else {
            self.errors = [error];
        }
    }
};

//validate是我们的核心库，其作用是:
//验证前段字段，给req增加一个属性errors
//并最后返回一个connect中间件
Validate.prototype.check = function(fields){
    var self = this;
    //    log(self);
    return function(req,res,next){
        for(j in fields){
            self.fieldName = j;
            var c = self.nodeValidator.check(req.param(j));
            fields[j].call(c);
        }
        var errors = "";
        if(self.errors){
            self.errors.forEach(function(er){
                errors = errors + er["message"];
            });
            req.errors = errors;
        } else {
            req.errors = null;
        }
        self.errors = null;
        next();
    }
}

module.exports.Validate = Validate;