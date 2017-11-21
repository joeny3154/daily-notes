

样式分离
=======

***作用：*** 将你的样式分离到单独的 bundle 中，与应用程序的逻辑分离。 这加强了样式的可缓存性，并且浏览器能够并行加载应用程序代码中的样式文件，避免无样式内容造成的闪烁问题(FOUC - flash of unstyled content)。


[如何使用 ExtractTextWebpackPlugin 来分离 css](http://www.css88.com/doc/webpack2/guides/code-splitting-css)