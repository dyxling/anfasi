
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  
  , home = require('./routes/home')
  , information = require('./routes/information')
  , form = require('./routes/form')
  , product = require('./routes/product')
  , search = require('./routes/search')
  ,ensearch = require('./routes/ensearch')
  , enindex = require('./routes/enindex')
  , enhome = require('./routes/enhome')
  , eninformation = require('./routes/eninformation')
  , enproduct = require('./routes/enproduct')
    
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
//自定义路由
app.get('/home/*',home.hm);
app.get('/information/*',information.info);
app.get('/form/*',form.forms);
app.get('/product/*',product.display);
app.get('/search',search.srh);
app.get('/searchret',search.ret);

//English version


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
