
代码分割 - Libraries
========

[如何使用 CommonsChunkPlugin 分离 vendor/library 代码](http://www.css88.com/doc/webpack2/guides/code-splitting-libraries)

***目标：***
应用本身的代码改变不导致vendor 文件的改变； 第三方代码（vendor 文件的 hash 始终恒定不变，利于浏览器缓存

所以： 只有当我们把 `vendor` 和应用代码的 `bundle` 分离时，才能实现这一目标

把第三方代码和应用本身的代码一起打包是非常低效的。因为浏览器会根据缓存头来缓存资源文件，如果文件没有被改变，文件将会被缓存从而不用去再次请求 cdn。为了利用这一特性，我们希望不管应用本身的代码如何改变，vendor 文件的 hash 始终恒定不变。


eg:

```
var path = require('path');

module.exports = function(env) {
    return {
        entry: './index.js',
        output: {
            filename: '[chunkhash].[name].js',
            path: path.resolve(__dirname, 'dist')
        }
    }
}
```

***存在的问题：***

项目中运行 webpack，如果你查看生成的包，会发现 moment 和 index.js 都被打包进了 bundle.js。
这对于该应用来说是很不理想的。如果 index.js 中的代码改变了，那么整个 bundle 都会重新构建。浏览器就需要加载新的 bundle，即使其中大部分代码都没改变。

# 方法1：多入口

让我们尝试通过为 moment 添加一个单独的入口点并将其命名为 vendor 来缓解这一情况

```
var path = require('path');

module.exports = function(env) {
    return {
        entry: {
            main: './index.js',
            vendor: 'moment'
        },
        output: {
            filename: '[chunkhash].[name].js',
            path: path.resolve(__dirname, 'dist')
        }
    }
}
```

***存在的问题：***

再次运行 `webpack` ，可以发现生成了两个 `bundle` 。然而如果查看他们的代码，会发现 `moment` 的代码在两个文件中都出现了！
我们希望两个入口的共享一份 `moment` 代码，的正是由于这个原因，我们需要使用`CommonsChunkPlugin`

# 方法2： CommonsChunkPlugin

它从根本上允许我们从不同的 bundle 中提取所有的公共模块，并且将他们加入公共 `bundle` 中。
如果公共 `bundle` 不存在，那么它将会创建一个出来


```
<!-- webpack.config.js -->

var webpack = require('webpack');
var path = require('path');

module.exports = function(env) {
    return {
        entry: {
            main: './index.js',
            vendor: 'moment'
        },
        output: {
            filename: '[chunkhash].[name].js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor' // 指定公共 bundle 的名字。
            })
        ]
    }
}
```

> `name`: 这是 common chunk 的名称。已经存在的 `chunk` 可以通过传入一个已存在的 `chunk` 名称而被选择。
以上配置因为入口中 vendor chunk 已经存在，所以不会创建新的chunk，而是将公共模块打包到 vendor bundle 中

现在运行 webpack。查看结果会发现 moment 代码只会出现在 vendor bundle 中

# 隐式公共 vendor chunk

你可以将 CommonsChunkPlugin 配置为只接受 vendor 库。

```
var webpack = require('webpack');
var path = require('path');

module.exports = function() {
    return {
        entry: {
            main: './index.js'
        },
        output: {
            filename: '[chunkhash].[name].js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: function (module) {
                   // 该配置假定你引入的 vendor 存在于 node_modules 目录中
                   return module.context && module.context.indexOf('node_modules') !== -1;
                }
            })
        ]
    };
}

```

***存在问题：***

但是，如果我们改变应用的代码并且再次运行 webpack，可以看到 vendor 文件的 hash 改变了。即使我们把 vendor 和 main 的 bundle 分开了，也会发现 vendor bundle 会随着应用代码改变。

这意味着我们任然无法从浏览器缓存机制中受益，因为 vendor 的 hash 在每次构建中都会改变，浏览器也必须重新加载文件。

这里的问题在于，每次构建时，webpack 生成了一些 webpack runtime 代码，用来帮助 webpack 完成其工作。当只有一个 bundle 的时候，runtime 代码驻留在其中。但是当生成多个 bundle 的时候，运行时代码被提取到了公共模块中，在这里就是 vendor 文件。

为了防止这种情况，我们需要将运行时代码提取到一个单独的 manifest 文件中。尽管我们又创建了另一个 bundle，其开销也被我们在 vendor 文件的长期缓存中获得的好处所抵消。

# Manifest 文件

为了防止这种情况，我们需要将运行时代码提取到一个单独的 manifest 文件中。尽管我们又创建了另一个 bundle，其开销也被我们在 vendor 文件的长期缓存中获得的好处所抵消。

```
<!-- webpack.config.js -->
var webpack = require('webpack');
var path = require('path');

module.exports = function(env) {
    return {
        entry: {
            main: './index.js',
            vendor: 'moment'
        },
        output: {
            filename: '[chunkhash].[name].js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                names: ['vendor', 'manifest'] // 指定公共 bundle 的名字。
            })
        ]
    }
};
```

使用上面的 webpack 配置，我们看到生成了三个bundle：vendor、main和manifest。

注意，长效的 bundle 缓存是通过“基于内容的 hash 策略”来实现的（content-based hashing）。查阅更多关于缓存