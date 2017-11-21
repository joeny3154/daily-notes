http://www.css88.com/doc/webpack2/loaders/babel-loader/



# 特定选项

- `cacheDirectory`：默认值 false。当设置时，给定的目录将用于缓存加载器的结果。未来的webpack构建将尝试从缓存中读取，以避免在每次运行时，需要运行 Babel 重新编译过程可能带来的高昂的开销。 如果值为空（loader: 'babel-loader?cacheDirectory'）或true (loader: babel-loader?cacheDirectory=true)，加载器将使用 node_modules/.cache/babel-loader 中的默认缓存目录，或者如果在任何根目录中找不到node_modules文件夹，加载器将使用默认的操作系统临时文件目录。

- `cacheIdentifier`：默认是由 babel-core 的版本组成的字符串，babel-loader 的版本，.babelrc文件的内容（如果存在）和环境变量 BABEL_ENV 的值，并返回到 NODE_ENV 环境变量。可以将其设置为自定义值，以在标识符更改时强制缓存无效。

- `babelrc`：默认true。当为false时，将忽略.babelrc文件（除了extends选项引用的那些文件）。

- `forceEnv`：默认将解析BABEL_ENV，然后NODE_ENV。允许您在加载器级别覆BABEL_ENV/NODE_ENV。对于同构应用程序，在为客户端和服务器配置不同的babel时有用。


***注意：*** sourceMap选项被忽略，相反，当webpack配置为使用sourceMaps时，会自动启用它们（通过devtool 配置选项）。