babel-cli
====

提供命令行运行 babel。也就是你可以 `babel filename` 去对文件转码。

安装: 添加到项目依赖中 or 全局安装

`npm install --save-dev babel-cli` or `npm isntall babel-cli -g`

对应的使用方式就是：

```
node_module/.bin/babel script.js --out-file script-compiled.js

babel script.js --out-file script-compiled.js
```

[详细使用方式](http://babeljs.io/docs/usage/cli/)