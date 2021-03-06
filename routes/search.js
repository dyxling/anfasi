/**
 * New node file
 */
var url=require('url');
var querystring=require('querystring');
var mysql=require('mysql');
var settings=require('./settings');
exports.srh = function(req, res){
	var kwd=url.parse(req.url,true).query.kwd;
	function isEmptyObj(obj){
		for(var key in obj){
			return false;
		}
		return true;
	};
	var connection=settings.getConn();
	var kd="\'%"+kwd+"%\'";
	var sql1="select p_name,count(1) as num from isolator where p_name like "+kd+" group by p_name";
	var sql2="select p_name,count(1) as num from adapter where p_name like "+kd+" group by p_name";
	var sql3="select p_name,count(1) as num from termination where p_name like "+kd+" group by p_name";
	var sql4="select p_name,count(1) as num from attenuator where p_name like "+kd+" group by p_name";
	var results='';
	connection.query(sql1,function(err,rows){
		if(err){throw err;}	
		if(isEmptyObj(rows)){
			
			connection.query(sql2,function(err2,rows2){
				if(err2){throw err2;}
				if(isEmptyObj(rows2)){
					
					connection.query(sql3,function(err3,rows3){
						if(err3){throw err3;}
						if(isEmptyObj(rows3)){
							
							connection.query(sql4,function(err4,rows4){
								if(err4){throw err4;}
								if(isEmptyObj(rows4)){
									results='';
									connection.end();
									res.render('home/search',{'results':results,'kwd':kwd});
								}
								else{
									results=rows4;
									connection.end();
									res.render('home/search',{'results':results,'kwd':kwd});
								}
							});
						}
						else{
							results=rows3;
							connection.end();
							res.render('home/search',{'results':results,'kwd':kwd});
						}
					});
				}
				else{
					results=rows2;
					connection.end();					
					res.render('home/search',{'results':results,'kwd':kwd});
				}
			});
		}
		else{
			results=rows;
			connection.end();
			res.render('home/search',{'results':results,'kwd':kwd});	
		}
				
	});		


	
};
exports.ret = function(req, res){
	var p_name= url.parse(req.url,true).query.pname;
	var connection=settings.getConn();
	if(/(隔离器|循环器|电缆)/i.test(p_name)){
		connection.query('select * from isolator where ?',{p_name:decodeURIComponent(p_name)},function(err,rows){
			if(err){throw err;}
			var proinfo=[];
			for(var item in rows){
				proinfo.push(rows[item]);
			}
			connection.end();
			res.render('product/viewisolator',{'proinfo':proinfo});
		});
	}
	else if(/衰减器/i.test(p_name)){
		connection.query('select * from attenuator where ?',{p_name:decodeURIComponent(p_name)},function(err,rows){
			if(err){throw err;}
			var proinfo=[];
			for(var item in rows){
				proinfo.push(rows[item]);
			}
			connection.end();
			res.render('product/viewattenuator',{'proinfo':proinfo});
		});
	}
	else if(/连接器/i.test(p_name)){
		connection.query('select * from adapter where ?',{p_name:decodeURIComponent(p_name)},function(err,rows){
			if(err){throw err;}
			var proinfo=[];
			for(var item in rows){
				proinfo.push(rows[item]);
			}
			connection.end();
			res.render('product/viewadapter',{'proinfo':proinfo});
		});
	}
	else{
		connection.query('select * from termination where ?',{p_name:decodeURIComponent(p_name)},function(err,rows){
			if(err){throw err;}
			var proinfo=[];
			for(var item in rows){
				proinfo.push(rows[item]);
			}
			connection.end();
			res.render('product/viewtermination',{'proinfo':proinfo});
		});
	}
	
};