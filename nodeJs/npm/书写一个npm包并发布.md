写一个npm包并发布
======

# 创建npm 包

比如一个sayHi npm 包

index.js

```
function sayHi(name){
  console.log('Hi' + name)
}

exports.sayHi = sayHi
```

使用命令`npm init`创建一个package.json

eg:
```
{
  "name": "npm example",
  "version": "1.0.0",
  "description": "npm包开发测试",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": "",
  "keywords": [
    "npm example"
  ],
  "author": "wanjun1130",
  "license": "ISC"
}
```

# 发布npm包

1. 注册一个npm账号

https://www.npmjs.com 注册即可

2. 添加账户

npm adduser

填入自己的npm账户名、密码和邮箱即可

3. 发布npm包

npm publish

中间过程如果发布不成功,很有可能是同名的package已经被别人发布过了, 判断同名package是否被发布过,可以到https://www.npmjs.com去search一下。如果命名冲突,换个名字重新发布

3. 查看个人npm包

进入npm个人中心，可以看到自己的npm包已经发布在上面了

4. 获取npm包

npm install <package-name>

5. 更新npm包

更新npm包也是使用npm publish命令发布，不过必须更改npm包的版本号，即package.json的version字段，否则会报错: