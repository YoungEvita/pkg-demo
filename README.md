# Express 服务端

### 项目运行
- 项目运行
```
npm install
npm run start
```
- 项目打包
```
npm install pkg@4.4.0 -g
npm run pkg 
```

### 项目目录结构

|-- README.md
|-- app.js       // 服务端配置文件，中间件，静态文件，路由配置等
|-- bin          // 服务端入口文件
|-- node_modules
|-- package-lock.json
|-- package.json
|-- public        // 静态资源目录
|-- routes        // 路由
|-- upload        // 存放上传的文件
|-- services      // 路由文件
`-- views

### 项目整体运行搭建

1、前端页面静态资源
   > 编译打包好的最前端文件放入到public 下

2、后端路由入口在routes目录下，其他路由在services下

3、服务端配置
```
// 因为前端压缩成了.gz文件服务端需要配置相对应中间件解析
var expressStaticGzip = require('express-static-gzip')
app.use('/', expressStaticGzip(path.join(__dirname, 'public'))) 

// vue 路由使用了history 模式
var history = require('connect-history-api-fallback')
app.use('/',history())
```
4、配置自启动
// bin/www
```
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log("App running at:" + bind)
  opn(bind) // 自启动
  debug('Listening on ' + bind);
}
```
5、配置pkg 打包
- package.json文件配置
```
\\ package.json
"scripts": {
   "start": "node ./bin/www",
   "pkg": "pkg -t node10.15.3-win-x64 . -0 app-x64 && pkg -t node10.15.3-win-x86 .-o app-x86"
},
"bin": "./bin/www", // 配置pkg 入口文件
  "pkg": {  // 其他并行的入口文件
    "script": [
      "app.js"
    ],
    "assets": [ // 静态资源
      "public",
      "services/**"
    ]
  }
```

- 环境配置
node - 10.15.3
fecthed-v10.15.3-win-x64
fetched-v10.15.3-win-x86
>pkg 打包的重点需要 fecthed-v10.15.3-win-x64 和fetched-v10.15.3-win-x86 ,这两个文件是和node 的版本相对应的，如果node版本不一样则需要下载对应的版本的文件即可

>运行npm run pkg 打包出错，此时需要把fecthed-v10.15.3-win-x64和
fetched-v10.15.3-win-x86文件放到C:\Users\用户\.pkg-cache\v2.6\目录下

> 不同node版本对应不同pkg-fetch 可在[下载地址](https://github.com/vercel/pkg-fetch/releases)下载对应版本,想编译linux环境下的版本下载对应的linux版本即可
```
PS E:\demo\pkg-demo> npm run pkg

> pkg-demo@0.0.0 pkg E:\demo\pkg-demo
> pkg -t node10.15.3-win-x64 . -o app-x64 && pkg -t node10.15.3-win-x86 . -o app-x86

> pkg@4.4.0
> Fetching base Node.js binaries to PKG_CACHE_PATH
  fetched-v10.15.3-win-x64     [                    ] 0%
> Error! unable to verify the first certificate
> Asset not found by direct link:
  {"tag":"v2.6","name":"uploaded-v2.6-node-v10.15.3-win-x64"}
> Error! unable to verify the first certificate
```
>如果有些配置文件，不想被打包进 exe 文件中，而是想把部分配置文件放在外面可被修改，则可以使用 process.cwd() 来引用文件