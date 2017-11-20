[参考文章](https://segmentfault.com/a/1190000004219090)

真正开发一个应用的时候，我们不可避免的会用到一大堆的工具，模块化、预处理器、热模块加载、代码校验和测试

项目初始化将会是让人痛苦的事情。vue-cli让一个简单的命令行工具来帮助你快速的构建一个拥有强大构建能力的Vue.js项目。

### vue-cli：

```
仅仅为了初始化
```

### 使用：

```
    # 安装vue-cli
    npm install -g vue-cli

    # 使用vue-cli初始化项目
    vue init webpack my-project

    # 进入到目录
    cd my-project

    # 安装依赖
    npm install

    # 开始运行
    npm run dev

    命令会从vuejs-templates拉取模板并安装，然后用NPM安装依赖，最后你只需要用个NPM脚本启动就能开始开发了。
```

### 官方模板：

```
这些官方的模板存在的意义在于提供强大的项目构建能力，以至于用户可以尽可能快速的进行开发。然而能否真正的发挥作用还在于你如何组织你的代码和你使用的其他库。

所有的官方模板都可以在vuejs-templates organization找到。如果有一个新的模板放在了这里，你可以直接就用vue init <template-name> <project-name>使用。你也可以运行vue list命令来看看现在有哪些官方模板是现在可用的。

目前有以下模板可供选择：

    browserify - 拥有高级功能的 Browserify + vueify 用于正式开发。
    browserify-simple - 拥有基础功能的 Browserify + vueify 用于快速原型开发。
    webpack - 拥有高级功能的 Webpack + vue-loader 用于正式开发。
    webpack-simple - 拥有基础功能的 Webpack + vue-loader 用于快速原型开发。

创建属于你的模板
    如果你对官方的模板不感兴趣，你可以自己fork下来然后进行修改（或者重新写一个），然后用vue-cli来调用。因为vue-cli可以直接拉取git源
        vue init username/repo my-project
```
