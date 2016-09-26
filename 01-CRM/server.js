var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(req,res){
	var query = url.parse(req.url,true).query;
	var pathname = url.parse(req.url,true).pathname;

	var reg = /\.(HTML|CSS|JS)/i;
	if(reg.test(pathname)){
		var suffie = reg.exec(pathname)[1].toUpperCase();
		var suffieXML = 'text/html';
		switch(suffie){
			case 'CSS':
				suffieXML = 'text/css';
			break;
			case 'JS':
				suffieXML = 'text/javascript';
			break;
		}
		try{
			var conFile = fs.readFileSync('.'+pathname,'utf-8')
			res.writeHead(200,{'content-type':suffieXML+';charset=utf-8'});
			res.end(conFile)
		}catch (e){
			res.writeHead(404,{'content-type':'text/plain;charset=utf-8'});
			res.end('文件找不到 404')
		}
		return;
	} 
});

app.listen(3000,function(){
	console.log('访问 3000')
})

//http://localhost:3000/abc?name=zhang
// { name: 'zhang' } '/abc'