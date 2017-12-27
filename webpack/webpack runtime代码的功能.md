webpack runtime 主要功能
======

webpack runtime（webpackBootstrap）代码不多，主要包含几个功能：

1. 全局 `webpackJsonp` 方法：模块读取函数，用来区分模块是否加载，并调用 `__webpack_require__` 函数；

2. 私有 `__webpack_require__` 方法：模块初始化执行函数，并给执行过的模块做标记；

3. 异步 chunk 加载函数（用 script 标签异步加载），加载的 chunk 内容均被 webpackJsonp 包裹的，script 加载成功会直接执行。这个函数还包含了所有生成的 chunks 的路径。在 webpack 2 中这个函数用到了 Promise，因此可能需要提供 Promise Polyfill；

4. 对 ES6 Modules 的默认导出（export default）做处理。