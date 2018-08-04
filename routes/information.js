/**
 * New node file
 */
var url=require('url');
var querystring=require('querystring');
exports.info = function(req, res){
	var pathn=url.parse(req.url).pathname;
	if(pathn.substring(0,1)=='/'){pathn=pathn.substring(1);}
	try{
		res.render(pathn,{'title':'Amphars'});
	}
	catch(err){
		console.log(err);
	}
	
	
		
};