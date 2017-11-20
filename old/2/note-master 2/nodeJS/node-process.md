process 对象
============

[参考网址](http://javascript.ruanyifeng.com/nodejs/process.html)

### 1. 简介

-	process对象是Node的一个全局对象，提供当前Node进程的信息；
-	它可以在脚本的任意位置使用，不必通过require命令加载；
-	该对象部署了EventEmitter接口。

### 2.属性

- process.argv：返回当前进程的命令行参数数组。
- process.env：返回一个对象，成员为当前Shell的环境变量，比如process.env.HOME。
- process.installPrefix：node的安装路径的前缀，比如/usr/local，则node的执行文件目录为/usr/local/bin/node。
- process.pid：当前进程的进程号。
- process.platform：当前系统平台，比如Linux。
- process.title：默认值为“node”，可以自定义该值。
- process.version：Node的版本，比如v0.10.18。
