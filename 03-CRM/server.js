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

	// 1, 获取 所有客户端信息，考虑到了 没有 获取到 json 的数据
	var con = null;
	var custom = './json/custom.json';
	var conTome = null;  // 获取客户端 id 时准备的变量

	// 首先 json 文件的内容 都获取到，
	//为了防止 报错，这是 公共的

	con = fs.readFileSync( custom ,'utf-8');
	con.length === 0 ? con = '[]':null;  // 为了防止 json/custom.json 什么也没有，没有的情况下 JSON.parse() 会报错，所以
	con = JSON.parse(con); // 字符串 json 格式，转换成真正的 json 数据 , 这是json 里的所有数据


	if(pathname === '/getList'){       // 如果请求的是 http://localhost:3000/getList，我就返回 json 文件夹的数据
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
		res.writeHead(200,{'content-type':'application/json;charset=utf-8'}) // 这是防止 乱码 或 浏览器不认识（不会下载）
		res.end(JSON.stringify(result)) // 返回给 客户端的是 json 格式的字符串
		return;  // return 我获取到所有客户信息，就不然它 继续往下走了
	}

	// 2,根据传递进来的客户端ID 获取某一个具体 的 客户信息, 客户不存在做了处理
	if(pathname === '/getInfo'){  // 访问 ： http://localhost:3000/getInfo?=1
		conTome = query['id']  // query[id]   =》 ?id=xxxx ，  获取 id 的值

		// 开始准备 一种格式给返回给客户端，用户信息
		result = {
			code:1,
			msg:"客户不存在",
			data:null
		}
		for(var i=0;i<con.length;i++){ // 循环

			if(con[i]['id'] == conTome){ // json 数据里的id 和 地址栏 的 id 相等，说明是我们要找的
				result = {
					code:0,
					msg:"成功",
					data:con[i]
				}
				break; // 找到 跳出 循环
			}
			
		}
		res.writeHead(200,{'content-type':'application/json;charset=utf-8'});
		res.end(JSON.stringify(result))
		return;
	}

})
app.listen(3000,function(){
	console.log('访问 3000')
})






















