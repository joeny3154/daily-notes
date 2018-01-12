
eslint-loader
=====

https://github.com/MoOx/eslint-loader


# 概要


# 安装

npm install eslint-loader eslint --save-dev

# 基本用法

``` js
module: {
    rules: [
      {
        test: /\.js$/,
        // 排除
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          // eslint options (if necessary)
        }
      },
    ],
  },
```

当与运输装载机（如babel-loader）一起使用时，确保它们的顺序是正确的（从下到上）。否则，文件将被处理后检查babel-loader

``` js
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        "babel-loader",
        "eslint-loader",
      ],
    },
  ],
},
```

To be safe, you can use enforce: "pre" section to check source files, not modified by other loaders (like babel-loader)

为了安全起见，您可以使用强制：“pre”部分来检查源文件，而不是其他装载器修改（如babel-loader）

`Rule.enforce`

webpack `Rule.enforce`配置来指定loader的种类, 可设置的值有："pre" | "post", 分别表示 前置|后置`loader`, 没有值表示是普通 loader.
还有一个额外的种类"行内 loader"，loader 被应用在 import/require 行内。
所有 loader 通过 前置, 行内, 普通, 后置 排序，并按此顺序使用, [更多查看](https://doc.webpack-china.org/configuration/module#rule-enforce)

*补充：* npm 脚本有`pre`和`post`两个钩子，举例来说，build脚本命令的钩子就是`prebuild`和`postbuild`。用户执行`npm run build`的时候，会自动按照下面的顺序执行: npm run prebuild && npm run build && npm run postbuild

``` js
module: {
  rules: [
    {
      enforce: "pre",
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "eslint-loader",
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
    },
  ],
},
```

# Options 配置选项

``` js
rules: [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "eslint-loader",
    options: {
      emitError: true,
      fix: false,
      cache: false,
      formatter: 
    }
  },
]
```

- fix（默认：false）

该选项将启用 ESLint自动修复功能。

- cache （默认：false）

该选项将启用将LINTING结果缓存到文件中。这在减少完整构建的时间时特别有用。

这可以是一个boolean值或缓存目录路径（例如：）'./.eslint-loader-cache'。

如果cache: true使用，则将缓存文件写入./node_modules/.cache目录。这是推荐的用法

- formatter （默认：eslint 主流的格式化程序）

eslint格式化程序

``` js
options: {
  // 默认
  formatter: require("eslint/lib/formatters/stylish"),

  // 社区 formatter
  formatter: require("eslint-friendly-formatter"),

  // 自定义 formatter
  formatter: function(results) {
    // `results` format is available here
    // http://eslint.org/docs/developer-guide/nodejs-api.html#executeonfiles()

    // you should return a string
    // DO NOT USE console.*() directly !
    return "OUTPUT"
  }
}
```
- eslintPath

Path to eslint instance that will be used for linting.
将用于linting的eslint实例的路径

``` js
options: {
  eslintPath: path.join(__dirname, "reusable-eslint-rules.js"),
}
```

# 错误 和 警告

默认情况下，加载器将根据eslint错误/警告计数自动调整错误报告。 您仍然可以使用emitError或emitWarning选项来强制执行此操作：

- emitError （默认值：false）

``` js
options: {
  emitError: true,
}
```

如果此选项设置为true，装载程序将始终返回错误

- emitWarning  (default: false)

如果选项设置为true，装载程序将始终返回警告。如果您正在使用热模块替换，您可能希望在开发中启用此功能，否则当发生Eslint错误时，将会跳过更新

- quiet（默认值：false）

装载程序将仅处理和报告错误，如果此选项设置为true，则忽略警告

- failOnWarning（默认值：false）

如果存在任何eslint警告，Loader将导致模块构建失败。

- failOnError（默认值：false）

如果存在任何eslint错误，Loader将导致模块构建失败。

- outputReport（默认值：false）
将错误的输出写入文件，例如checkstyle xml文件，用于Jenkins CI的报告

filePath是相对于webpack config：output.path你可以传入一个不同的格式化程序来输出文件，如果没有在默认的/被配置的格式化程序中被传入将被使用

``` js
options: {
  outputReport: {
    filePath: 'checkstyle.xml',
    formatter: require('eslint/lib/formatters/checkstyle')
  }
}
```
# 陷阱

- NoErrorsPlugin

NoErrorsPlugin防止webpack输出任何东西到一个 bundle 。所以即使ESLint警告也会失败。无论 eslint-loader 使用什么错误设置。

所以如果你想在开发过程中在控制台中看到ESLint警告， 可以从webpack config中WebpackDevServer 删除NoErrorsPlugin。

- 定义configFile 或使用 eslint -c path/.eslintrc

请记住，在定义时configFile，eslint不会自动在待分割文件的目录中查找 .eslintrc 文件。有关更多信息，请参阅使用配置文件一节中的官方eslint文档。见[＃129](https://github.com/MoOx/eslint-loader/issues/129)。