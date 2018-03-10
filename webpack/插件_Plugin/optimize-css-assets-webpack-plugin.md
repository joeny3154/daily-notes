
optimize-css-assets-webpack-plugin
====

1. 它将在Webpack构建期间搜索CSS资源，并优化\最小化CSS（默认情况下，它使用[cssnano](http://github.com/ben-eb/cssnano)，但可以指定自定义CSS处理器）。

2. 解决`extract-text-webpack-plugin` CSS重复问题：由于`extract-text-webpack-plugin`仅仅 bundles(merges) 文本chunks, 如果使用它来bundles CSS, bundle 可能有重复的条目

同一个入口模块及其子模块`import`同样的**样式文件**并不会出现bundle中存在重复的模块内容，存在重复条目指的是不同的样式文件中可能存在同样的条目，比如两个css文件中都要有`.clearfix { ... }`,使用`extract-text-webpack-plugin` 来bundles CSS后，bundle 就会出现重复的`.clearfix { ... }`条目。


optimize-css-assets-webpack-plugin内部使用了cssnano来优化css，而cssnano内部又调用了postcss，所以如果你对这两个工具比较熟的话，可以在后文的配置的地方更清楚一点。

# cssnano

https://github.com/iuap-design/blog/issues/159

cssnano是基于postcss的一款功能强大的插件包，它集成了近30个插件，只需要执行一个命令，就可以对我们的css做多方面不同类型的优化，比如：

删除空格和最后一个分号
删除注释
优化字体权重
丢弃重复的样式规则
优化calc()
压缩选择器
减少手写属性
合并规则
...