# CRM-TEST
```
首先需要在服务器上搭建一个服务器（监听一个端口），把我们的项目发布出去

API 接口文档
1，获取所有的客户端信息
	URL:"/getList"  GET
	参数：{客户端传递给服务器的内容} 无
	返回：{服务器端返回给客户端的内容}
		'{
			"code":0,  // 返回的结果标识 0代表成功 1代表失败（没有任何的客户信息）
			"msg":"获取成功！", // 返回结果标识的说明信息
			"data":[
				{"id":xx,"name":"xxx","age":xx,"phone":"xxxx","address":"xxxx"}
			]
			.....
		}'
2，获取具体的某个客户的信息
	URL:"/getInfo"	GET
	参数:?id=xx  把需要获取的客户的ID 传递给服务器
	返回:
		'{
			"id":xxxx,  // 0成功  1失败（当前用户信息不存在）
			"name":"",
			"age":xx,
			"phone":"",
			"address":""

		}'
3，增加客户信息
	URL:"/addInfo"	POST
	参数:请求主体中 '{"name":"","age":"","phone":"","address":""}'
		(少了 ID 在增加过程中，ID 是服务器端自动按照 一定 方法生成的)
	返回:
		'{
			"code":xx,  // 0成功  1失败
			"msg":""
			

		}'

4，修改客户端信息
	URL:"/updataInfo"	POST
	参数:请求主体中 '{"id":"xxx","name":"","age":"","phone":"","address":""}'
		
	返回:
		'{
			"code":xx,  // 0成功  1失败
			"msg":""
			

		}'

5，删除客户端信息
	URL:"/removeInfo"  GET
	参数:?id=xx
	返回:
		'{
			"code":"0", // 状态码 0成功  1失败
			"msg":""
		}'
```