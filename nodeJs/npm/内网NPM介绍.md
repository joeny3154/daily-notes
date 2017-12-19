

为什么要搭建内网npm? 
如何查询内网 npm 上的包?
内网npm和官方npm之间的关系是？
如何通过内网npm安装相关的包?
在开发机上访问内网npm
在线上机器安装内网npm中的包
如何把自己写的包发布到内网npm上？
Gitlab上的npm专区

# 为什么要搭建内网npm? 

我们基于 verdaccio 搭建了内网npm， 内网npm可以缓存 npm 官方的包，使得内网获取包更加迅速，

当出现十九大等不可抗力，或者npm官网出现问题时（参考 left-pad 事件), 内网npm依然可以正常工作。

# 如何查询内网 npm 上的包?

可以通过 http://npm.qutoutiao.net 查询内网npm中发布的包

# 内网npm和官方npm之间的关系是？

1. 内网npm优先级更高，当某个包内网和官方npm同名时，只会使用内网的版本(比如qfe就是)

2. 当内网npm上没有这个包时，会去官方npm下载然后缓存到本地，接着就会使用本地缓存的版本来应答客户端的安装请求

# 如何通过内网npm安装相关的包?

```
npm -g install qfe --registry http://npm.qutoutiao.net
```

# 但更推荐使用 `nrm` 来管理 `registry`：

```
# 安装nrm
npm -g install nrm

# 增加趣头条的内网registry
nrm add qtt http://npm.qutoutiao.net

# 使用趣头条的registry

nrm use qtt
npm -g install qfe # 这时自动从 npm.qutoutiao.net 上安装qfe


# 当你回到家中，无法连接内网域名 npm.qutoutiao.net 时，你可以

nrm ls # 列出所有可用的registry
nrm use npm #使用官网的registry

# 当你回到公司可以切回 qtt
nrm use qtt
```

# 在开发机上访问内网npm

目前，除了公司内网，还有如下机器可以直接访问内网npm

node-test1
jenkins
除了以上机器，其他线上机器都无法直接访问内网npm，如有需要，可以联系运维打通

# 在线上机器安装内网npm中的包

线上机器默认都无法直接访问内网npm，如果想要安装内网npm的包，有两个方法：

找运维开通
通过gitlab直接安装tar包
方法1不详说了，主要说一下方法2，线上机器都可以直接访问gitlab，而npm可以通过http方式进行安装，主要步骤如下：

1. 在gitlab上配置一个private access token (在这里 http://git.qutoutiao.net/profile/personal_access_tokens) 注意 Scopes 全勾上

2. 将package仓库打一个对应package.json版本号的tag，并且推送到远端 比如 git tag -a 'v1.0.5'

3. 在gitlab的对应仓库的tags页面，复制该tag的tar下载链接，如 http://git.qutoutiao.net/npm/q-cdn/repository/v1.0.0/archive.tar.gz

4. 在线上机器上执行命令 `npm -g install  http://git.qutoutiao.net/npm/q-cdn/repository/v1.0.0/archive.tar.gz?private_token=你的TOKEN` 即可安装&更新(注意每次更新都要打tag)

# 如何把自己写的包发布到内网npm上？

你可以执行如下命令， 按命令行要求添加用户和密码进行注册（必须注册之后才有权限发布）

`npm adduser --registry http://npm.qutoutiao.net`

注册完成后在 package 项目目录里执行:

`npm publish --registry http://npm.qutoutiao.net`

注意: 如果你已经使用了 nrm use qtt ,那么不需要再加 --registry 

# Gitlab上的npm专区

我们在gitlab上开辟了npm goup，请将npm的package放在这里 http://git.qutoutiao.net/npm