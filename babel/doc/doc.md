

# [参考链接](./参考链接.md)

- 拆分成几个核心包，`babel-core`,`babel-node`,`babel-cli`...

- 没有了默认的转换，现在你需要手动的添加 plugin。也就是插件化

- 添加了 preset，也就是预置条件。

- 增加了 .babelrc 文件，方便自定义的配置。


# [babel-core](./babel-cli.md)

# [babel-core](./babel-cli.md)

# [babel-external-helpers](./babel-external-helpers.md)

# [babel-node](./babel-node.md)

# [babel-register](./babel-register.md)

# [babel-runtime](./babel-runtime.md)

# [babel-polyfill](./babel-polyfill.md)

# plugins

提起 `plugins` 需要 babel 编译的过程。babel 编译分为三步：

`parser`：通过 babylon 解析成 AST。

`transform[s]`：All the plugins/presets ，进一步的做语法等自定义的转译，仍然是 AST。

`generator`： 最后通过 babel-generator 生成 output string。

所以 plugins 是在第二步加强转译的，所以假如我们自己写个 plugin，应该就是对 ast 结构做一个遍历，操作。

# [babel-plugin-transform-runtime](./plugins/babel-plugin-transform-runtime.md)