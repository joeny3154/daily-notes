

除了npm源之外,这里再提一下Node.js的版本的问题.Node.js的版本更新迭代是非常快的,可能我们需要在不同的版本之间不断切换,我们就需要一个node的版本管理工具.

windows平台上可以直接用`nodist`, 在Linux下,习惯使用`nvm`

# `nodist` 常用命令如下：

```
# 列举远端的nodejs/iojs的所有版本
nodist dist
# list本机上安装的nodejs/iojs的版本
nodist list
# 安装指定版本的nodejs/iojs
nodist add <version>比如iojsv3.3.1
# 删除指定版本的nodejs/iojs
nodist rm  <version>比如iojsv3.3.1
# 全局使用v4.4.3版本的nodejs
nodist nodev4.4.3
# 在当前terminal使用某个版本的nodejs
nodist env nodev0.12.13
# 在当前项目(当前目录以及子目录下)通过./node-version指定nodejs的版本
nodist local nodev0.12.13
# 以v4.4.3版本的Nodejs执行foo.js
nodist r nodev4.4.3 -- foo.js -s

```