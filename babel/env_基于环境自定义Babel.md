Babel 插件解决许多不同的问题。 其中大多数是开发工具，可以帮助你调试代码或是与工具集成。 也有大量的插件用于在生产环境中优化你的代码。

因此，想要基于环境来配置 Babel 是很常见的。你可以轻松的使用 .babelrc 文件来达成目的。

  {
    "presets": ["es2015"],
    "plugins": [],
+   "env": {
+     "development": {
+       "plugins": [...]
+     },
+     "production": {
+       "plugins": [...]
+     }
    }
  }


  Babel 将根据当前环境来开启 env 下的配置。

当前环境可以使用 process.env.BABEL_ENV 来获得。 如果 BABEL_ENV 不可用，将会替换成 NODE_ENV，并且如果后者也没有设置，那么缺省值是"development"。


Unix

$ BABEL_ENV=production [COMMAND]
$ NODE_ENV=production [COMMAND]
Windows

$ SET BABEL_ENV=production
$ [COMMAND]
注意：[COMMAND] 指的是任意一个用来运行 Babel 的命令（如：babel，babel-node，或是 node，如果你使用了 register 钩子的话）。

**提示：**如果你想要让命令能够跨 unix 和 windows 平台运行的话，可以使用 [cross-env](https://www.npmjs.com/package/cross-env)。