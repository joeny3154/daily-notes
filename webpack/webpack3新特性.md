# Scope Hoisting-作用域提升

`new webpack.optimize.ModuleConcatenationPlugin()`

# Magic Comments

在webpack2中引入了Code Splitting-Async的新方法import()，用于动态引入ES Module，webpack将传入import方法的模块打包到一个单独的代码块（chunk），但是却不能像require.ensure一样，为生成的chunk指定chunkName，因此在webpack3中提出了Magic Comment用于解决该问题，用法如下：

`import(/* webpackChunkName: "my-chunk-name" */ 'module');`


https://www.cnblogs.com/wmhuang/p/7065396.html