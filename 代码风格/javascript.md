
# 分号

在语句（Statement）的结尾加分号

以防万一，在可能有坑的地方手工加分号

``` js
var f1 = function ff1() {
  return function() {
    return 1;
  };
} // 此处漏写分号
(function() { // 此处调用了上面的ff1，WAT
})();
console.log(f2); // 1

var f2 = function ff2() {
  return function() {
    return 1;
  };
} // 此处漏写分号
// IIFE
;(function() { // 注意前面的分号
})();
console.log(f2); // function
```

### var

如果变量有初始赋值则使用单独的 var：

``` js
// 不推荐
var hello = 1, world = 2;

// 推荐
var hello = 1;
var world = 2;
var foo, fee, fxx;
```

# 使用字面量

``` js
// 不建议
var obj = new Object();
var array = new Array();

// 推荐
var obj = {};
var array = [];

// 鉴于 Array 构造函数的特殊性，不建议
var arr1 = new Array(4, 5, 6); // [4, 5, 6]

// 以免与下面混淆
var arr2 = new Array(4); // [ undefined * 4 ]
// 等价于（不推荐）
var arr3 = [];
arr3.length = 4;
// 等价于（不推荐）
var arr4 = [,,,,];
console.log('0' in arr2, '0' in arr3, '0' in arr4); // false, false, false

// 不推荐
var str = new String('str');
console.log(str === 'str'); // false

var bool = new Boolean(false);
if (bool) console.log('wat'); // wat

// 当真需要使用字面量包装类时，使用显式强制转换（请先三思）
var strObject = Object('str');
strObject.customProperty = someValue;
```


### 复杂逻辑中建议使用显式转换

``` js
+num === Number(num);
!!bool === Boolean(bool);
str + '' === String(str);

// 特别的
if (bool)
// 等价于
if (Boolean(bool))
// 故
if ([]) console.log('true'); // true
// 而
if ([] === true) console.log('true'); // 无输出

// 另外
if (Boolean(String(false))) console.log('true'); // true
// 这点在保存 localStorage 时需要注意
```

### parseInt & parseFloat

- 不要使用 parseInt 做整数转换，如需使用 parseInt，请给它传入第二个参数 10，避免老式浏览器的坑（IE8？）

``` js
var floatValue = 123.456;

// 不要
var intValue = parseInt(floatValue);

// 可以用
var intValue2 = floatValue | 0;

// 更显然的
var intValue3 = Math.floor(floatValue);
```

特别地，使用 parseFloat 做部分转换

``` js
// 例如有：
// <div id="div" style="width: 10px"></div>

var divWidth = getComputedStyle(document.getElementById('div')).width; // '10px'

console.log(parseFloat(divWidth)); // 10
console.log(Number(divWidth)); // NaN
console.log(+divWidth); // NaN
```

### 自执行函数

``` js
// 不推荐
(function() {
  // ...
})();

+function() {
  // ...
}();

// 推荐
~function() {
  // ...
}();

// 推荐
void function() {
  // ...
}();
```

括号和加号不是上下文无关的，可能受到上文缺分号的影响而出现奇怪的问题，这些问题甚至不会报错，极难调试，所以不推荐此种用法，比如：

``` js
var a = 1 // 此处无分号

+function() {
  return 2
}();

// 此处 a 的值为 3
```

# 避免嵌套过深

``` js
// 不推荐
async1(function() {
  // TODO 1
  async2(function() {
    // TODO 2
    async3(function() {
      // TODO 3
    });
  });
});

Promise.resolve()
  .then(function () {
    return new Promise(function (resolve) {
      async1(resolve)
    })
  })
  .then(function () {
    // TODO 1
    return new Promise(function (resolve) {
      async2(resolve)
    })
  })
  .then(function () {
    // TODO 2
    return new Promise(function(resolve) {
      async3(resolve);
    });
  })
  .then(function() {
    // TODO 3
  });
```

### 禁止事项

- 禁止使用未定义的变量

- 禁止使用 eval，非用不可时可以使用 Function 构造器替代。

- 禁止使用 with 语句。

- 禁止在块作用域中使用函数声明语句。

``` js
if (true) {
  // 禁止
  function func1() {
    // ...
  }
  // 允许
  var func2 = function() {
    // ...
  };
}
```

- 禁止使用 8 进制词法

``` js
if (010 === 8); // true
```

- 禁止使用 arguments 映射

``` js
void function(a) {
  arguments[0]++;
  // 此处 a 为 2
}(1);
```

- 禁止使用重名参数

- 禁止使用保留字做变量名如 interface 等

### 