es5
===

### typeof

```
var x = 3;
typeof x !== 'number'

```

### Function

##### arguments

##### return

JavaScript引擎有一个在行末自动添加分号的机制，这可能让你栽到return语句的一个大坑：

```
function foo() {
    return { name: 'foo' };
}

foo(); // { name: 'foo' }
```

如果把return语句拆成两行：

```
//相当于 return;  // 自动添加了分号，相当于return undefined;
function foo() {
    return
        { name: 'foo' };
}

foo(); // undefined
```

正确的多行写法是：

```
function foo() {
    return { // 这里不会自动加分号，因为{表示语句尚未结束
        name: 'foo'
    };
}
```

##### 变量作用域

减少冲突： 把自己的所有变量和函数全部绑定到一个全局变量中

```
var MYAPP = {};

// 其他变量:
MYAPP.name = 'myapp';
MYAPP.version = 1.0;

// 其他函数:
MYAPP.foo = function () {
    return 'foo';
};

```

##### 局部作用域

es5: 函数内 JavaScript的变量作用域实际上是函数内部，我们在for循环、if..else等 语句块中是无法定义具有局部作用域的变量的;

用let替代var可以申明一个块级作用域的变量： const来定义常量， const与let都具有块级作用域：

注意：**`const`与`let`都具有块级作用域**

##### 方法 & this
