https://www.vanadis.cn/2017/03/18/babel-stage-x/


stage不同阶段的区别

es7不同阶段语法提案的转码规则模块（共有4个阶段），分别是stage-0，stage-1，stage-2，stage-3。


JavaScript 还有一些提案，正在积极通过 TC39（ECMAScript 标准背后的技术委员会）的流程成为标准的一部分。

这个流程分为 5（0－4）个阶段。 随着提案得到越多的关注就越有可能被标准采纳，于是他们就继续通过各个阶段，最终在阶段 4 被标准正式采纳。

以下是4 个不同阶段的（打包的）预设：

- babel-preset-stage-0

- babel-preset-stage-1

- babel-preset-stage-2

- babel-preset-stage-3

注意 stage-4 预设是不存在的因为它就是上面的 es2015 预设。
以上每种预设都依赖于紧随的后期阶段预设。例如，babel-preset-stage-1 依赖 babel-preset-stage-2，后者又依赖 babel-preset-stage-3。.

使用的时候只需要安装你想要的阶段就可以了：

$ npm install --save-dev babel-preset-stage-2

然后添加进你的 .babelrc 配置文件。

  {
    "presets": [
      "es2015",
      "react",
+     "stage-2"
    ],
    "plugins": []
  }

