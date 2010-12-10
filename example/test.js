//固定寫法
module.exports = exports = function(verifierlib){
	// 創建一個驗證者對象 verifier,並調用validateField方法對字段進行驗證定義。
	var verifier = verifierlib.create();
	// 對字段 loginame 添加驗證規則，利用系統驗證器 strlen
	verifier.validatField('loginame','strlen',{len:1},"errer message!");

	verifierlib.add('/book',verifier);



}

