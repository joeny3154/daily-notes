fs 模块
====

http://javascript.ruanyifeng.com/nodejs/fs.html

# 概要

- 读取文件: `readFile('/path/to/file', (err, buffer) => {})`，`readFileSync(fileName, 'utf8')`

- 写入文件: `writeFile('fileName', 'Hello Node.js', (err) => {})`，`writeFileSync('fileName', 'content string', 'utf8')`

- 判断给定路径是否存在: `exists('/path/to/file', (boolean) => {})`, `existsSync()`

- 新建目录: `mkdir()`, `mkdirSync()`

- 删除目录：`rmdir()`, `rmdirSync()`

- 读取目录: `readdir()`，`readdirSync()`

- 判断文件还是目录: `stat()`

- 监听 & 取消监听文件: `watchfile('./testFile.txt', (curr, prev) => {})`，`unwatchfile()`

- 创建读取 & 写入操作数据流: `createReadStream()`, `createWriteStream()`

# 详解

### 读取文件 readFile()，readFileSync()

- `readFile('/path/to/file', (err, buffer) => {})` 异步读取数据

**参数：**

参数1: 是文件的路径，可以是绝对路径，也可以是相对路径。注意，如果是相对路径，是相对于当前进程所在的路径（process.cwd()），而不是相对于当前脚本所在的路径
参数2: 是读取完成后的回调函数。该函数的第一个参数是发生错误时的错误对象，第二个参数是代表文件内容的Buffer实例

``` js
fs.readFile('./image.png', function (err, buffer) {
  if (err) throw err;
  process(buffer);
});
```

- `readFileSync()` 用于同步读取文件，返回一个字符串

### 写入文件

- `writeFile('/path/to/file', 'str', 'utf8', callback)`: 异步写入文件

**参数：**

第一个参数是写入的文件名，第二个参数是写入的字符串，第三个参数是回调函数。
回调函数前面，还可以再加一个参数，表示写入字符串的编码

文件编码包括“ascii”、“utf8”和“base64”。如果没有指定文件编码，返回的是原始的缓存二进制数据，这时需要调用buffer对象的toString方法，将其转为字符串

- `writeFileSync()`: 同步写入文件

第一个参数是文件路径，第二个参数是写入文件的字符串，第三个参数是文件编码，默认为utf8

### 判断给定路径是否存在

- `exists('/path/to/file', (boolean) => {})`: 判断给定路径是否存在, 不管结果如何，都会调用回调函数

- `existsSync('outputFolder')` 同步方法

**参数：**

回调函数的参数是一个表示文件是否存在的布尔值


### 新建目录

- `mkdir('./helloDir', 0777, (err) => {})`

**参数：**

第一个是目录名，第二个是权限值，第三个是回调函数。

- `mkdirSync('./helloDirSync', 0777)` 同步方法

# 删除目录：

- `rmdir('path', (err) => {]})`

- `rmdirSync('path')`


# 读取目录

- `readdir('path', (err, files) => {})`

**返回值：** 返回一个所包含的文件和子目录的数组

- `readdirSync('path')`


# 判断正在处理的是文件/目录： `stat('/path/to/file', (err, stats) => {})`

参数是一个文件或目录，它产生一个对象stats，该对象包含了该文件或目录的具体信息。

**stats对象：**

`stats.isFile()`, `stats.isDirectory()`

eg: 

``` js
var fs = require('fs')

fs.readdir('/etc/', (err, files) => {
  if (err) throw err

  files.forEach(file => {
    fs.stat('/etc/' + file, (err, stats) => {
      if (err) throw err

      if (stats.isFile()) {
        console.log("%s is file", file)
      } else if (stats.isDirectory ()) {
        console.log("%s is a directory", file)
      }

      console.log('stats:  %s',JSON.stringify(stats))
    })
  })
})

```

# 监听文件

`watchfile('./testFile.txt', (curr, prev) => {})`: 如果该文件发生变化，就会自动触发回调函数

`unwatchfile()`

# 创建读取 & 写入操作数据流

- `createReadStream()`


- `createWriteStream('fileName', optObj)`

  返回写入数据流对象 out, 该对象提供两个方法
  - write('content string')： 用于写入数据
  - end()： 用于结束写入操作

``` js
var out = fs.createWriteStream(fileName, {
  encoding: 'utf8'
});
out.write(str);
out.end();
```

**`createWriteStream`方法和`createReadStream`方法配合**，可以实现拷贝大型文件

``` js

function fileCopy(filename1, filename2, done) {
  var input = fs.createReadStream(filename1)
  var output = fs.createWriteStream(filename2)

  input.on('data', data => output.write(data))
  input.on('error', err => throw err)
  input.on('end', () => {
    output.end()
    if (done) done()
  })
}
```