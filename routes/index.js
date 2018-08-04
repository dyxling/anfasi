
/*
 * GET home page.
 */
var mysql= require('mysql');
var settings=require('./settings');
exports.index = function(req, res){
	var connection=settings.getConn();
	connection.query(" select ntitle, DATE_FORMAT(ndate,'%y-%m-%d') as ndate from news order by ndate desc limit 0,2",function(err,rows){
		if(err){throw err;}
		var news=[];
		for(var i=0,j=rows.length;i<j;i++){
			news.push({ndate:rows[i].ndate,ntitle:rows[i].ntitle});
		}
		connection.end();
		res.render('index',{"news":news});	
	});
};