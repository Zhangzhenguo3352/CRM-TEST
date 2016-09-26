var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(req,res){
	var query = url.parse(req.url,true).query;
	var pathname = url.parse(req.url,true).pathname;

	var reg = /\.(HTML|CSS|JS)/i;
	if(reg.test(pathname)){
		var suffie = reg.exec(pathname)[1].toUpperCase();
		var suffieXML = "text/html"
		switch(suffie){
			case 'CSS':
				suffieXML = "text/css"
			break;
			case 'JS':
				suffieXML = "text/javascript"
			break;
		}
		try{
			var conFile = fs.readFileSync('.'+pathname,'utf-8');
			res.writeHead(200,{'content-type':suffieXML+';charset=utf-8'});
			res.end(conFile)
		}catch (e){
			res.writeHead(404,{'content-type':'text/plain;charset=utf-8'});
			res.end('您访问的页面不存在 404 ！')
		}
		return;
	}

	// 获取 所有客户端信息，考虑到了 没有 获取到 json 的数据
	var con = null;
	var custom = './json/custom.json';
	if(pathname === '/getList'){       // 如果请求的是 http://localhost:3000/getList，我就返回 json 文件夹的数据
		con = fs.readFileSync( custom ,'utf-8');
		con.length === 0 ? con = '[]':null;  // 为了防止 json/custom.json 什么也没有，没有的情况下 JSON.parse() 会报错，所以
		con = JSON.parse(con); // 字符串 json 格式，转换成真正的 json 数据
		

		// 开始准备 一种格式给客户端
		result = {
			code:0,
			msg:"没有数据",
			data:null
		}
		if(con.length > 0){
			result = {
				code:1,
				msg:"获取成功！",
				data:con
			}
		}
		res.writeHead(200,{'content-type':'application/json;charset=utf-8'})
		res.end(JSON.stringify(result)) // 返回给 客户端的是 json 格式的字符串
		return;  // return 我获取到所有客户信息，就不然它 继续往下走了
	}
})
app.listen(3000,function(){
	console.log('访问 3000')
})
























