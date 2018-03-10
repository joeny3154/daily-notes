

nvm
====

nvm 是 Mac 下的 node 管理工具

# 安装 nvm

`curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.30.2/install.sh | bash`

安装完 nvm 后，输入nvm，当看到有输出时，则 nvm 安装成功。 如果遇到关闭shell后遇到以下提示：

> -bash: nvm: command not found

编辑.bash_profile文件，没有的话就新建一个，命令都是：

> vi .bash_profile

`i`选择插入模式，然后将以下代码复制进去，`:wq`保存退出

```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
```

然后 source 一下 `.bash_profile`， 重启shell配置

> source .bash_profile

# 安装切换各版本 node

nvm install stable    # 安装最新稳定版 node
nvm install <version> # 安装 4.2.2 版本
nvm install 0.12.7    # 安装 0.12.7 版本

nvm uninstall <version> #卸载node版本

nvm use <version>     # 切换至 0.12.7 版本
nvm use 4             # 切换至 4.2.2 版本

nvm alias default 0.12.7 #设置默认 node 版本为 0.12.7

nvm ls-remote         # 列出所有远程服务器的版本
nvm ls                # 列出所有本地node版本
nvm current           # 显示当前的版本

# 使用 .nvmrc 文件配置项目所使用的 node 版本

如果你的默认 node 版本（通过 nvm alias 命令设置的）与项目所需的版本不同，则可在项目根目录或其任意父级目录中创建 .nvmrc 文件，在文件中指定使用的 node 版本号，例如

cd <项目根目录>  #进入项目根目录
echo 4 > .nvmrc #添加 `.nvmrc` 文件
nvm use #无需指定版本号，会自动使用 .nvmrc 文件中配置的版本
node -v #查看 node 是否切换为对应版本

# nvm 与 n 的区别

node 版本管理工具还有一个是 TJ 大神的 n 命令，n 命令是作为一个 node 的模块而存在，而 nvm 是一个独立于 node/npm 的外部 shell 脚本，因此 n 命令相比 nvm 更加局限。

由于 npm 安装的模块路径均为 /usr/local/lib/node_modules ，当使用 n 切换不同的 node 版本时，实际上会共用全局的 node/npm 目录。 因此不能很好的满足『按不同 node 版本使用不同全局 node 模块』的需求。

# windows平台上可以直接用`nodist`, 在Linux下,习惯使用`nvm`

`nodist` 常用命令如下：

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