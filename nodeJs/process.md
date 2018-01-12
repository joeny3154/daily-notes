process.env
====

返回一个包含用户环境信息的对象

eg:

``` js
{
  TERM: 'xterm-256color',
  SHELL: '/usr/local/bin/bash',
  USER: 'maciej',
  PATH: '~/.bin/:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin',
  PWD: '/Users/maciej',
  EDITOR: 'vim',
  SHLVL: '1',
  HOME: '/Users/maciej',
  LOGNAME: 'maciej',
  _: '/usr/local/bin/node'
}
```

# 新增/修改属性

不会生效： 

`$ node -e 'process.env.foo = "bar"' && echo $foo`

正确方法：

``` js
process.env.foo = 'bar';
console.log(process.env.foo);
```

# 属性值转换成字符串

在process.env中新增一个属性，会将属性值转换成字符串

``` js
process.env.test = null;
console.log(process.env.test);
// => 'null'
process.env.test = undefined;
console.log(process.env.test);
// => 'undefined'
```

# 删除属性

``` js
process.env.TEST = 1;
delete process.env.TEST;
console.log(process.env.TEST);
// => undefined
```

# 在Windows系统下，环境变量是不区分大小写的

``` js
process.env.TEST = 1;
console.log(process.env.test);
// => 1
```

