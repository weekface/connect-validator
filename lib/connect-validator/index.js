var nodeValidator = require('../../vendor/node-validator').Validator;
var log = require('logging').from(__filename);

var nv = new nodeValidator();
//validate是我们的核心库，其作用是返回一个connect中间件
var Validate = function(){
    this.fieldName = "null";
    this.errMsg = null;
    this.nodeValidator = nv;
    var self = this;
    nv.error = function(msg){
        self.errMsg = msg;
    }
};

Validate.prototype.core = function(fields){
    var self = this;
    log(self);
    log(this);
    return function(req,res,next){
        for(j in fields){
            var c = self.nodeValidator.check(req.param(j));
            fields[j].call(c);
        }
        req.errmsg = self.errMsg;
        log(req.errmsg);
        self.errMsg = null;
        next();
    }
}

//validate.core();

module.exports.Validate = Validate;


//var log = require('logging').from(__filename);
//var Good = function(){
//    this.name = "name";
//    log(this.prototype);
//}
//
//Good.prototype.core = function(){
//    log(this);
//    log(this.name)
//    log(this.prototype);
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
