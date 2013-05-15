/**
* Important note: this demo application is for CrossUI created by Alex Pavlov (macscripter@gmail.com)
*/

var http = require('http'),
    url = require('url'),
    fs = require('fs'),
    querystring = require('querystring'),
    server,
    net = require('net');

var getParams = function(req, callback){
    if(req.method=='POST') {
        var body = '';
        req.on('data', function(chunk){
            body += chunk;
        })
        .on('end', function() {
            var obj = querystring.parse(  body.replace( /\+/g, ' ' ) ) ;
            callback( obj );
        });
    }
    else if(req.method=='GET') {
        var url_parts = url.parse(req.url,true);
        callback(url_parts.query);
    }
},

send404 = function(res){
    res.writeHead(404);
    res.write('404');
    res.end();
},

server = http.createServer(function(req, res){
    var path = url.parse(req.url).pathname;
    switch (path){
        case '/exec':
            exec(req,res);
            break;
        default:
            fs.readFile(__dirname + path, function(err, data){
                if (err) return send404(res);
                res.writeHead(200, {'Content-Type': path == 'json.js' ? 'text/javascript' : 'text/html'})
                    res.write(data, 'utf8');
                res.end();
            });
    }
});

server.listen(9000);

function exec(req,res)
{
    getParams(req,function( obj ) {
        var value1=obj.a;
        var value2 = obj.b;
        var objResponse={"num":value1,"name":value2};
        var wrapedObj={"data":objResponse,"callback":obj.callback};
        var strResponse = JSON.stringify(wrapedObj);
        if(obj.callback!=null){
            if(obj.callback=="window.name"){
                strResponse = "<script type='text' id='json'>" + strResponse + "</script><script type='text/javascript'>window.name=document.getElementById('json').innerHTML;</script>";
            }else{
                strResponse = obj.callback + '(' + strResponse + ')';
            }
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(strResponse);
        res.end();
    });    
}