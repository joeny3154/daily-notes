
gzip 压缩
=====

https://betterexplained.com/articles/how-to-optimize-your-site-with-gzip-compression/

# 什么是Gzip压缩

如果我们可以发送一个.zip文件到浏览器（index.html.zip）而不是普通的旧index.html，我们会节省带宽和下载时间。
浏览器可以下载压缩文件，将其解压缩，然后将其显示给用户，网页加载速度很快

启用压缩是提高网站性能的最快方法之一

### 过程：

- 浏览器发送一个报头，告诉服务器 它接受的压缩内容（gzip和deflate两个压缩方案）：`Accept-Encoding: gzip, deflate`

- 如果内容被实际压缩，服务器将发送一个响应：`Content-Encoding: gzip`

- 如果服务器不发送内容编码响应头，则表示该文件未被压缩（在许多服务器上是默认的）。“Accept-encoding”标题只是浏览器的请求，而不是需求。如果服务器不想发回压缩的内容，浏览器必须要处理繁重的常规版本。

### 注意事项

1. **较老的浏览器不支持**：虽然他们说自己可以接受压缩内容

2. **已压缩的内容**： 大多数图像，音乐和视频已经被压缩。不要浪费时间再压缩它们。事实上，你可能只需要压缩HTML，CSS和Javascript

3. **CPU -load**：即时压缩内容使用 CPU时间并节省带宽。通常考虑到压缩速度这是一个很大的折衷。