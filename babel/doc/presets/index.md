各种配置 plugin 实在是费劲，es6+ 编译要加入好多 plugins，比如为了在 node 中使用 esmodule，要把 esmodule 转化成 commomjs，使用 transform-es2015-modules-commonjs，还有 asyncToGenerator，React jsx转化等等，不仅要装好多，还要配好多。

presets 就是 plugins 的组合，你也可以理解为是套餐... 主要有:

- env

- es2015

- react

- lastet

- stage-x 具体的语法属于哪个 stage 可参照[tc39](https://github.com/tc39/proposals)


大部分的 presets 我觉得都不需要介绍了，官网上写的比较详细。而且 babel-preset-lastet 已经废弃，被 babel-preset-env 代替。

`{ "presets": ["latest"] } === { "presets": ["env"] }`