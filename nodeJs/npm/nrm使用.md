nrm
=====

很多时候npm官方的registry并稳定,我们有时候需要使用国内的npm registry.
这里推荐直接使用nrm一个用来管理npm registry的node包(可以替代cnpm)。

# 使用方法


1. 全局安装nrm

`npm install -g nrm`

2. 查看当前配置了哪里registry

比如有npm、cnpm、taobao、edunpm、european、australia、strongloop、nodejitsu、Portuguese的源

shell执行 `nrm ls` 命令，可以看到类似如下显示：

```
npm ---- https://registry.npmjs.org/
  cnpm --- http://r.cnpmjs.org/
  taobao - https://registry.npm.taobao.org/
  nj ----- https://registry.nodejitsu.com/
  rednpm - http://registry.mirror.cqupt.edu.cn/
  npmMirror  https://skimdb.npmjs.com/registry/
  edunpm - http://registry.enpmjs.org/
```

3. 添加 npm registry

`nrm add <registry> <url>`: eg: `nrm add name http://xxxxx.net`

4. 测试不同registry的网络速度

`nrm test`

5. 切换并使用registry

 `nrm use taobao`： 使用taobao的registry(淘宝npm registry速度杠杠的,在教育网、电信网都是taobao的registry最快)
