Path模块
=====

http://nodejs.cn/api/path.html#path_path_sep

# 概要

- 方法
  - path.join([...paths]) 使用平台特定的分隔符连接生成规范化的路劲

- 属性
  - path.delimiter 提供平台特定的路径分隔符 Windows 上是 `;` POSIX 上是 `:`

# 详解

### `path.join([...paths])`

path.join() 方法使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径

``` js
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..'); // 返回: '/foo/bar/baz/asdf'
```

path.join方法用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是”/“，Windows系统是”\“

path.resolve()

accessSync()

path.relative

path.parse()

### 属性
sep

提供了平台特定的路径片段分隔符：

Windows 上是 \
POSIX 上是 /