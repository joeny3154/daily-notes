
# Error

```
try {
  writeFile(Data);
} catch(e) {
  handleError(e);
} finally {
  closeFile();
}
```

- 属性

message：错误提示信息
name：错误名称（非标准属性）
stack：错误的堆栈（非标准属性）

console.log(error.name + ": " + error.message)

# 原生错误类型

- `SyntaxError` 是解析代码时发生的语法错误
- `ReferenceError` 是引用一个不存在的变量时发生的错误
- `RangeError` 是当一个值超出有效范围时发生的错误。主要有几种情况，一是数组长度为负数，二是Number对象的方法参数超出范围，以及函数堆栈超过最大值。
- `TypeError` 是变量或参数不是预期类型时发生的错误。比如，对字符串、布尔值、数值等原始类型的值使用new命令，就会抛出这种错误，因为new命令的参数应该是一个构造函数。
- `URIError` 是URI相关函数的参数不正确时抛出的错误，主要涉及encodeURI()、decodeURI()、encodeURIComponent()、decodeURIComponent()、escape()和unescape()这六个函数。
- `EvalError` eval函数没有被正确执行时，会抛出EvalError错误。该错误类型已经不再在ES5中出现了，只是为了保证与以前代码兼容，才继续保留。

以上这6种派生错误，连同原始的Error对象，都是构造函数。
new Error('出错了！');
new RangeError('出错了，变量超出有效范围！');
new TypeError('出错了，变量类型无效！');

# 自定义错误
除了JavaScript内建的7种错误对象，还可以定义自己的错误对象

```
function CustomizeError() {
  this.message = message || '默认信息'
  this.name = 'customizeError'
}
<!-- 继承Error对象 -->
CustomizeError.prototype = new Error()
CustomizeError.prototype.constructor = CustomizeError
<!-- 生成这种自定义的错误 -->
new CustomizeError("这是自定义的错误！")
```

# throw语句
作用是中断程序执行，抛出一个意外或错误。它接受一个表达式作为参数，可以抛出*各种值*。

// 抛出自定义错误
throw new CustomizeError("出错了！");
# try…catch结构

*catch*接受一个参数，表示try代码块抛出的值

```
try {
  throw exception;
} catch (e) {
  <!-- 捕捉不同类型的错误，catch代码块之中可以加入判断语句 -->
  if (e instanceof EvalError) {
    console.log(e.name + ": " + e.message);
  } else if (e instanceof RangeError) {
    console.log(e.name + ": " + e.message);
  }
}
```

# finally代码块

try...catch结构允许在最后添加一个finally代码块，表示不管是否出现错误，都必需在最后运行的语句。

```
try {
  throw new Error('出错了……');
  console.log('此行不会执行');
} finally {
  console.log('完成清理工作');
}

// 完成清理工作
// Error: 出错了……

```

即使有return语句在前，finally代码块依然会得到执行，且在其执行完毕后，才会显示return语句的值
```
function f() {
  try {
    console.log(0);
    throw 'bug';
  } catch(e) {
    console.log(1);
    return true; // 这句原本会延迟到finally代码块结束再执行
    console.log(2); // 不会运行
  } finally {
    console.log(3);
    return false; // 这句会覆盖掉前面那句return
    console.log(4); // 不会运行
  }

  console.log(5); // 不会运行
}

var result = f();
// 0
// 1
// 3

result
// false
```
