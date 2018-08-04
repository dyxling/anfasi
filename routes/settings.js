/**
 * New node file

 */
var mysql=require('mysql');
var db={
		host:'127.0.0.1',
		user:'root',
		password:'',
		database:'amphars',
		port:3306
};
exports.getConn=function(){
	return mysql.createPool(db);
}