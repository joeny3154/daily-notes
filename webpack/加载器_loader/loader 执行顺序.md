
webpack loader 执行顺序
====

1. 配置文件 `module.rules` 中定义的 loader 的执行顺序

先对该资源文件的所有符合条件的 loader 进行排序，根据`enforce`的配置进行排序，顺序：前置, 行内, 普通, 后置 排序

> webpack `Rule.enforce`配置来指定loader的种类, 可设置的值有："pre" | "post", 分别表示 前置|后置`loader`, 没有值表示是普通 loader.
> 还有一个额外的种类: "行内 loader"，此loader 被应用在 import/require 行内。
> 所有 loader 通过 前置, 行内, 普通, 后置 排序，并按此顺序使用。 [更多查看](https://doc.webpack-china.org/configuration/module#rule-enforce)

import/require中：

`!!`: 表示 `enforce: 'post'`
`-!`: 表示 `enforce: 'pre'`

其他都是`! `

2. 在 require 中定义 loader 的执行顺序

这里定义的顺序是确定的，webpack 不会改变该顺序

3. 同时在配置文件 和 require 中定义的 loader 的执行顺序

可以在 import 语句或任何等效于 "import" 的方式(比如`import()`、`require`、`require.cache`、`require.ensure` 等等)中指定 loader使用`!`将资源中的 loader 分开。
分开的每个部分都相对于当前目录解析.

通过前置所有规则及使用 `!`，都可以对应覆盖到配置中的任意 loader