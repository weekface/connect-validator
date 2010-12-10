var nodeValidator = require('../../vendor/node-validator').Validator;
var log = require('logging').from(__filename);

//validate是我们的核心库，其作用是返回一个connect中间件
var Validate = function(nv){
    this.fieldName = "null";
    this.errMsg = null;
    this.nodeValidator = nv;
};

var nv = new nodeValidator();

Validate.prototype.core = function(fields){
    var self = this;
    log(self);
    log(this.constructor);
    return function(req,res,next){
        for(j in fields){
            var c = self.nodeValidator.check(req.param(j));
            fields[j].call(c);
        }
        req.errmsg = self.errMsg;
        next();
    }
}

var validate = new Validate(nv);
nv.error = function(msg) {
    validate.errMsg = msg;
};

module.exports.Validate = validate.core;


//var log = require('logging').from(__filename);
//var Good = function(){
//    this.name = "name";
//}
//
//Good.prototype.core = function(){
//    log(this);
//    log(this.name)
//}
//
//var zhangsan = new Good();
//zhangsan.core();


//
//var log = require('logging').from(__filename);
//var Validate = function(nv){
//    this.fieldName = "null";
//    this.errMsg = null;
//    this.nodeValidator = nv;
//};
//
//Validate.prototype.core = function(fields){
//    var self = this;
//    log(self);
//    log(self.nodeValidator);
//}
//
//var validate = new Validate("hehe");
//validate.core()
