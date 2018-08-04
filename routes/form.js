/**
 * New node file
 */
var mysql=require('mysql');
var settings=require('./settings');
var url=require('url');
var querystring=require('querystring');
exports.forms = function(req, res){
  var pathn=url.parse(req.url).pathname;
  var qe=url.parse(req.url,true).query;
  var connection=settings.getConn();
  if(/reqcatalog/.test(pathn)){
	  connection.query("insert into request set ?",qe,function(err,result){
			if(err){
				throw err;
				res.writeHead(500,{'Content-Type':'text/plain'});
				res.end('服务器出错');
				}
			connection.end();
			res.send('true');
		});
  }else if(/csurvey/.test(pathn)){
	  connection.query("insert into survey set ?",qe,function(err,result){
			if(err){
				throw err;
				res.writeHead(500,{'Content-Type':'text/plain'});
				res.end('服务器出错');
				}
			connection.end();
			res.send('true');
		});
	 
  }else if(/representative/.test(pathn)){
	  connection.query('select '+qe.province+' from representative',function(err,rows){
		  if(err){throw err;}
		  var re=[];
		  for(var i=0,j=rows.length;i<j;i++){
			  re.push(rows[i][qe.province]);
		  }
		  res.send(re);
	  });
	 
  }else{
	  res.send('false');
  }
};