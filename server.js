let http=require("http");
 
let fs=require("fs");

let mime=require("mime");

let url=require("url");

let port=80;

let host=getIPAddress();

// 创建一个函数，req代表客户端，res代表服务器可写流
// res是可写流，有write和end
let listener=(req,res)=>{
	let {query,pathname}=url.parse(req.url,true);
	if(pathname==="/")
	{
		// 设置编码
		res.setHeader('Content-Type','text/html;charset=utf-8');
  		fs.createReadStream('index.html').pipe(res);
 	}
	else
	{
		//if(fs.existsSync(`.${pathname}`)) 
		//{
   			// mime 第三方包 npm install mime --save
   			// mime.lookup可以通过文件路径后缀判断是什么类型的
   			//res.setHeader('Content-Type', mime.lookup(pathname)+';charset=utf-8');
   			//fs.createReadStream(`.${pathname}`).pipe(res);
  		//}
		//else
		//{
   			res.statusCode=404;
   			res.end();
  		//}
 	}
}

// 创建一个服务，放入一个监听函数，
let server=http.createServer(listener);

server.listen(port, host);

console.log("Server running at http://127.0.0.1:80")

// 获取本机IP地址
function getIPAddress(){  
    var interfaces = require('os').networkInterfaces();  
    for(var devName in interfaces){  
          var iface = interfaces[devName];  
          for(var i=0;i<iface.length;i++){  
               var alias = iface[i];  
               if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
                     return alias.address;  
               }  
          }  
    }  
} 
