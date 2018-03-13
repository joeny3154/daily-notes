babel-cli
====

`babel-cli` 是babel的`command line`， 提供了以下三个命令： 

`babel`、`babel-external-helpers`、 `babel-node`

*`babel-doctor`命令已被移除，见[babel/babel#4678](https://github.com/babel/babel/issues/4678)*

# 安装

添加到项目依赖中 or 全局安装

`npm install --save-dev babel-cli` or `npm isntall babel-cli -g`

对应的使用方式:

```
# 项目依赖
node_modules/.bin/babel script.js --out-file script-compiled.js

# 定义.babelrc，安装babel-plugin-transform-runtime插件
node_modules/.bin/babel script.js --out-file script-compiled.js --plugins=transform-runtime

# 全局安装
babel script.js --out-file script-compiled.js
```

# 简介

1. `babel`

可以 `babel filename` 命令去对文件进行编译。

2. `babel-external-helpers`

生成一段`helpers`代码（里面是一些`helper`函数）, 然后在每个文件中直接引入,解决`helper`重复使用后被重复定义的问题。[详见`babel-external-helpers`](./babel-external-helpers.md)

3. `babel-node`

替换了node的require, 当`require`模块的时候，如果模块是内置模块或者是`node_modules`内的模块，则使用node的require, 否则使用babel的`require`，自动编译模块.[详见`babel-node`](./babel-node.md)


[详细使用方式](http://babeljs.io/docs/usage/cli/)