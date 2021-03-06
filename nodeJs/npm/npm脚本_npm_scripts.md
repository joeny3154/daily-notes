npm scripts 使用指南
=======
http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html


# 什么是 npm 脚本？

npm 允许在package.json文件里面，使用scripts字段定义脚本命令
在package.json里面的脚本，就称为 npm 脚本

查看当前项目的所有 npm 脚本命令，可以使用不带任何参数的`npm run`命令


# 原理

npm 脚本的原理: 每当执行npm run，就会自动新建一个 Shell，在这个 Shell 里面执行指定的脚本命令。
因此，只要是 Shell（一般是 Bash）可以运行的命令，就可以写在 npm 脚本里面

 npm 脚本的唯一要求就是可以在 Shell 执行，因此它不一定是 Node 脚本，任何可执行文件都可以写在里面


 npm 脚本的退出码，也遵守 **Shell 脚本规则**。如果退出码不是0，npm 就认为这个脚本执行失败

# 通配符

由于 npm 脚本就是 Shell 脚本，因为可以使用 Shell 通配符

```
"lint": "jshint *.js"
"lint": "jshint **/*.js"
```
上面代码中，`*`表示任意文件名，`**`表示任意一层子目录。

如果要将通配符传入原始命令，防止被 Shell 转义，要将星号转义。

```
"test": "tap test/\*.js"
```

# 传参

 向 npm 脚本传入参数，要使用--标明。

eg:

```
"lint": "jshint **.js",
"lint:checkstyle": "npm run lint -- --reporter checkstyle > checkstyle.xml"
```

# 执行顺序

如果 npm 脚本里面需要执行多个任务，那么需要明确它们的执行顺序。

如果是并行执行（即同时的平行执行），可以使用`&`符号, 如果是继发执行（即只有前一个任务成功，才执行下一个任务），可以使用`&&`符号

$ npm run script1.js && npm run script2.js

这两个符号是 Bash 的功能。此外，还可以使用 node 的任务管理模块：[script-runner](https://github.com/paulpflug/script-runner)、[npm-run-all](https://github.com/mysticatea/npm-run-all)、[redrun](https://github.com/coderaiser/redrun)


# 默认值

一般来说，npm 脚本由用户提供。但是，npm 对**两个脚本提供了默认值**。也就是说，这两个脚本不用定义，就可以直接使用。

"start": "node server.js"，
"install": "node-gyp rebuild"


上面代码中，npm run start的默认值是node server.js，前提是项目根目录下有server.js这个脚本；npm run install的默认值是node-gyp rebuild，前提是项目根目录下有binding.gyp文件。

# 钩子

npm 脚本有pre和post两个钩子。举例来说，build脚本命令的钩子就是prebuild和postbuild


"prebuild": "echo I run before the build script",
"build": "cross-env NODE_ENV=production webpack",
"postbuild": "echo I run after the build script"

用户执行npm run build的时候，会自动按照下面的顺序执行。

npm run prebuild && npm run build && npm run postbuild

自定义的脚本命令也可以加上pre和post钩子。比如，myscript这个脚本命令，也有premyscript和postmyscript钩子。不过，双重的pre和post无效，比如prepretest和postposttest是无效的。

# 简写形式

四个常用的 npm 脚本有简写形式。

npm start是npm run start
npm stop是npm run stop的简写
npm test是npm run test的简写
npm restart是npm run stop && npm run restart && npm run start的简写

# 变量

首先，通过npm_package_前缀，npm 脚本可以拿到package.json里面的字段

eg:
```
{
  "name": "foo", 
  "version": "1.2.5",
  "scripts": {
    "view": "node view.js"
  }
}
```
那么，变量`npm_package_name`返回foo，变量`npm_package_version`返回1.2.5

使用：
```
// view.js
console.log(process.env.npm_package_name); // foo
console.log(process.env.npm_package_version); // 1.2.5
```

我们通过环境变量process.env对象，拿到package.json的字段值。如果是 Bash 脚本，可以用$npm_package_name和$npm_package_version取到这两个值

**嵌套:**

npm_package_前缀也支持嵌套的package.json字段。

eg:
```
"repository": {
  "type": "git",
  "url": "xxx"
},
scripts: {
  "view": "echo $npm_package_repository_type"
}
```

repository字段的type属性，可以通过`npm_package_repository_type`取到

eg2: 获取`scripts`中的变量

```
"scripts": {
  "install": "foo.js"
}
```
上面代码中，`npm_package_scripts_install`变量的值等于foo.js

**npm配置变量:** config

npm 脚本还可以通过npm_config_前缀，拿到 npm 的配置变量，即npm config get xxx命令返回的值。比如，当前模块的发行标签，可以通过npm_config_tag取到。

"view": "echo $npm_config_tag",

注意，package.json里面的config对象，可以被环境变量覆盖。

{ 
  "name" : "foo",
  "config" : { "port" : "8080" },
  "scripts" : { "start" : "node server.js" }
}

`npm_package_config_port`变量返回的是 `8080`。这个值可以用下面的方法覆盖。

eg: 覆盖**配置变量**

```
$ npm config set foo:port 80
```

最后，env命令可以列出所有环境变量: `"env": "env"`

# 常用脚本示例

```
// 删除目录
"clean": "rimraf dist/*",

// 本地搭建一个 HTTP 服务
"serve": "http-server -p 9090 dist/",

// 打开浏览器
"open:dev": "opener http://localhost:9090",

// 实时刷新
 "livereload": "live-reload --port 9091 dist/",

// 构建 HTML 文件
"build:html": "jade index.jade > dist/index.html",

// 只要 CSS 文件有变动，就重新执行构建
"watch:css": "watch 'npm run build:css' assets/styles/",

// 只要 HTML 文件有变动，就重新执行构建
"watch:html": "watch 'npm run build:html' assets/html",

// 部署到 Amazon S3
"deploy:prod": "s3-cli sync ./dist/ s3://example-com/prod-site/",

// 构建 favicon
"build:favicon": "node scripts/favicon.js",
```