/**
 * New node file
 */
var url=require('url');
var querystring=require('querystring');
var mysql=require('mysql');
var settings=require('./settings');
exports.display = function(req, res){
	var pathn= url.parse(req.url).pathname;	
	console.log(pathn);
	var p_name= url.parse(req.url,true).query.pname;	
	if(pathn.substring(0,1)=='/'){pathn=pathn.substring(1);}
	if(p_name){
		var tablename=pathn.match(/(enisolator|enadapter|entermination|enattenuator)/)[0];
		var connection=settings.getConn();
		connection.query('select * from '+tablename+' where ?',{p_name:decodeURIComponent(p_name)},function(err,rows){
			if(err){throw err;}
			var proinfo=[];
			for(var item in rows){
				proinfo.push(rows[item]);
			}
			connection.end();
			res.render(pathn,{'proinfo':proinfo});
		});
	}
	else{
		res.render(pathn,{'title':'Amphars'});
	}
};