function verifier (){
	this._vfs = {};
}

verifier.prototype.validatField = function(fieldname,validat,params,errmsg){
	if(!this._vfs[fieldname]){this._vfs[fieldname] = []}
	this._vfs[fieldname].push({validat:validat,params:params,errmsg:errmsg});
}

function verifierlib(){
	this._vers = {};
}

verifierlib.prototype.create=function(){
	var o = new verifier();
	return o;
}
verifierlib.prototype.add = function(path,verifierobj){
	this._vers[path]=verifierobj;
}

var fs = require('fs');
var vlib = {};

fs.readdirSync(__dirname + '/validators').forEach(function(filename){
   var name = filename.substr(0, filename.lastIndexOf('.'));
	vlib[name] = require('./validators/'+name);	
});


module.exports = exports = function(myv){

	var vf = new verifierlib();
	require(myv)(vf);

	return function(req,res,next){
		var mypath = null;
		var url = require('url').parse(req.url, true);
		var query = url.query;
		for(var path in vf._vers){
			var regex = new RegExp(path.replace('*','.*')+'$');
			if(url.pathname.match(regex)){
				mypath = path;
				var ver = vf._vers[mypath]; // ver
				for(var fn in ver._vfs){

	//this._vfs[fieldname].push({validat:validat,params:params,errmsg:errmsg});
					var vfs = ver._vfs[fn];
					for(var i in vfs){
						// 验证器
						var v = vfs[i];
						var vmethod = vlib[v.validat];
						var bool = vmethod(query[fn],v.params);
						
						if(bool);else{
							if(req.errmsg);else{req.errmsg={};}
							if(req.errmsg[fn]);else{
								req.errmsg[fn]= [];
							}
							req.errmsg[fn].push(v.errmsg);
						}

					}
				}		
				break;
			}
		}
		next();
	}
}

