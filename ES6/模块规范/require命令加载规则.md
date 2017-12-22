require命令用于加载文件，后缀名默认为.js

根据参数的不同格式，require命令去不同路径寻找模块文件。




1. 如果参数字符串以“/”开头，则表示加载的是一个位于绝对路径的模块文件。比如，require('/home/marco/foo.js')将加载/home/marco/foo.js。

2. 如果参数字符串以“./”开头，则表示加载的是一个位于相对路径（跟当前执行脚本的位置相比）的模块文件。比如，require('./circle')将加载当前脚本同一目录的circle.js。

3. 如果参数字符串不以“./“或”/“开头，则表示加载的是一个默认提供的核心模块（位于Node的系统安装目录中），或者一个位于各级node_modules目录的已安装模块（全局安装或局部安装）。

举例来说，脚本/home/user/projects/foo.js执行了require('bar.js')命令，Node会依次搜索以下文件。

```
/usr/local/lib/node/bar.js
/home/user/projects/node_modules/bar.js
/home/user/node_modules/bar.js
/home/node_modules/bar.js
/node_modules/bar.js
```

这样设计的目的是，使得不同的模块可以将所依赖的模块本地化。

4. 如果参数字符串不以“./“或”/“开头，而且是一个路径，比如require('example-module/path/to/file')，则将先找到example-module的位置，然后再以它为参数，找到后续路径。

5. 如果指定的模块文件没有发现，Node会尝试为文件名添加.js、.json、.node后，再去搜索。.js件会以文本格式的JavaScript脚本文件解析，.json文件会以JSON格式的文本文件解析，.node文件会以编译后的二进制文件解析。

6. 如果想得到require命令加载的确切文件名，使用require.resolve()方法。

# 目录的加载规则

通常，我们会把相关的文件会放在一个目录里面，便于组织。这时，最好为该目录设置一个入口文件，让require方法可以通过这个入口文件，加载整个目录。

在目录中放置一个package.json文件，并且将入口文件写入main字段。下面是一个例子。

```
// package.json
{ 
  "name" : "some-library",
  "main" : "./lib/some-library.js"
}
```

require发现参数字符串指向一个目录以后，会自动查看该目录的package.json文件，然后加载main字段指定的入口文件。如果package.json文件没有main字段，或者根本就没有package.json文件，则会加载该目录下的index.js文件或index.node文件。