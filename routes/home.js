/**
 * New node file
 */
var url=require('url');
var querystring=require('querystring');
var mysql=require('mysql');
var settings=require('./settings');
exports.hm = function(req, res){	
	var n_title="";
	var pathn=url.parse(req.url).pathname;
	n_title= url.parse(req.url,true).query.ntitle;
	if(pathn.substring(0,1)=='/'){pathn=pathn.substring(1);}
	if(/news/.test(pathn)){
		var connection=settings.getConn();
		if(n_title){
			connection.query("select nid,ntitle,ncontent,DATE_FORMAT(ndate,'%y-%m-%d') as ndate from news where ?",{ntitle:decodeURIComponent(n_title)},function(err,rows){
				if(err){throw err;}				
				var news=rows.pop();
				connection.query('select ntitle from news where nid<'+news.nid,function(err2,re){
					if(err2){throw err2;}	
					var pre=re.pop();
					news.pre=pre||'';
					connection.query('select ntitle from news where nid>'+news.nid,function(err3,rs){
						if(err2){throw err2;}
						var nxt=rs.pop();
						news.next=nxt||'';
						connection.end();
						
						res.render('home/news_detail',{'news':news});
					});
										
				});						
			});
		}else{
			connection.query("select ntitle,DATE_FORMAT(ndate,'%y-%m-%d') as ndate from news",function(err,rows){
				if(err){throw err;}
				var news=[];
				for(var i=0,j=rows.length;i<j;i++){
					news.push({ntitle:rows[i].ntitle,ndate:rows[i].ndate});
				}
				connection.end();
				res.render('home/news',{'news':news});
			});
		}
		
		
	}else{
		try{
			res.render(pathn,{'title':'amphars'});
		}catch(err){
			res.writeHead(404,{'Content-Type':'text/plain'});
			res.end('Please try again.');
			console.log(err);
		}
		
	}
};