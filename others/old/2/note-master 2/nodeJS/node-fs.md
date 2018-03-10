fs 模块
=======

[参考网址](http://javascript.ruanyifeng.com/nodejs/fs.html\)

### readFile()，readFileSync()

-	readFile():异步读取数据。

-	readFile():同步读取文件，返回一个字符串

```
    var text = fs.readFileSync(fileName, 'utf8');
```

readdir()，readdirSync(): readdirSync方法是readdir方法的同步版本 readdir方法用于读取目录，返回一个所包含的文件和子目录的数组。

### writeFile()，writeFileSync()

-	writeFile(): writeFile方法用于异步写入文件。
-	writeFileSync(): 用于同步写入文件。

### readdir()，readdirSync()

-	readdir() 读取目录，返回一个所包含的文件和子目录的数组
-	readdirSync() 同步版本，

```
    var srcPath = path.resolve(process.cwd(), 'src');
    var files = fs.readdirSync(dir);
    files.forEach(function (filename) {
      var fullname = path.join(dir,filename);
      //
      var stats = fs.statSync(fullname);
      //如果是文件
      if (stats.isDirectory()) filename += '/';
      process.stdout.write(filename + '\t' +
        stats.size + '\t' +
        stats.mtime + '\n'
      );
    });
```

### stat()

stat方法的参数是一个文件或目录，它产生一个对象，该对象包含了该文件或目录的具体信息。我们往往通过该方法，判断正在处理的到底是一个文件，还是一个目录。

```
var fs = require('fs');

fs.readdir('/etc/', function (err, files) {
  if (err) throw err;

  files.forEach( function (file) {
    fs.stat('/etc/' + file, function (err, stats) {
      if (err) throw err;

      if (stats.isFile()) {
        console.log("%s is file", file);
      }
      else if (stats.isDirectory ()) {
      console.log("%s is a directory", file);
      }
    console.log('stats:  %s',JSON.stringify(stats));
    });
  });
});
```

### mkdir()，writeFile()，readFile()

### mkdirSync()，writeFileSync()，readFileSync()

这三个方法是建立目录、写入文件、读取文件的同步版本
