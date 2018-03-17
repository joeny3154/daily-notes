
- `style-loader`：将CSS通过`<style>`标签注入到html中

- `flie-loader`: 可以解析`url`（不仅限于css），将资源拷贝到相应输出路径，并且会修改打包后文件引用路径(发布目录/输出路径)，使之使之指向正确的文件资源路径。

webpack 中使用`outputPath`，`useRelativePath`和 `publicPath`指定自定义 `output` 输出路径和 `public` 发布目录
默认情况下，生成的文件的文件名就是文件内容的 MD5 哈希值并会保留所引用资源的原始扩展名(即`[hash].[ext]`)。

https://doc.webpack-china.org/loaders/file-loader/

- `url-loader`: 是对`file-loader`的上层封装，但不依赖`file-loader`。url-loader 功能类似于 file-loader，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL。

https://doc.webpack-china.org/loaders/url-loader/