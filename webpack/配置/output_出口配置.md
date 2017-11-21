

[webpack 输出(Output)](http://www.css88.com/doc/webpack2/configuration/output/)


- output.path

string

output 目录对应一个***绝对路径***。

path: path.resolve(__dirname, 'dist/assets')


- output.chunkFilename

`string`

此选项决定了***按需加载***(on-demand loaded)的 chunk 文件的名称。有关可取的值的详细信息，请查看 output.filename 选项。

注意，这些文件名需要在 `runtime` 根据 `chunk` 发送的请求去生成。因此，需要在 webpack runtime 输出 `bundle` 值时，将 `chunk id` 的值对应映射到占位符(如 `[name]` 和 `[chunkhash]`)。这会增加文件大小，并且在任何 `chunk` 的占位符值修改后，都会使 bundle 失效。

默认使用 `[id].js` 或从 `output.filename` 中推断出的值（`[name]` 会被预先替换为 `[id]` 或 `[id]`.）。


- output.filename

默认值是 "[name].js"。

此选项决定了每个输出 bundle 的名称。这些 bundle 将写入到 output.path 选项指定的目录下。
对于单个入口起点，filename 会是一个静态名称。默认值是 "[name].js"。

名称配置：

- 使用入口名称： 

`filename: "[name].bundle.js"`

- 使用内部 chunk id： 

`filename: "[id].bundle.js"`

- 使用每次构建过程中，唯一的 hash 生成

`filename: "[name].[hash].bundle.js"`

- 使用基于每个 chunk 内容的 hash

`filename: "[chunkhash].bundle.js"`

注意此选项被称为文件名，但是你还是可以创建像 "`js/[name]/bundle.js`" 这样的文件夹结构。

***注意***

此选项不会影响那些「按需加载 chunk」的输出文件。对于这些文件，请使用 `output.chunkFilename` 选项来控制输出。
同样也不影响通过 `loader` 创建的文件，对于这些文件，请查看 `loader` 选项来输出控制。

- `output.library`

- `output.libraryTarget`

- `output.publicPath`