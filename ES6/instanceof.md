instanceof 运算符
===========

### 语法

let result = object instanceof class

### 返回值：

布尔值，用于判断一个对象是否为特定类的一个实例

- 如果 object 是 class 的一个实例，则 instanceof 运算符返回 true。
- 如果 class 存在于对象的原型链中，则该运算符返回 true。
- 如果 object 不是 class 的实例，或 object 为 null，则该运算符返回 false


### instanceof测试的object是指js语法中的object，不是指dom模型对象

```
window instanceof Object // false
```

### 等价实现
```
function instance_of(L, R) {
  // L 表示左表达式，R 表示右表达式
  // 取 R 的显示原型
  var O = R.prototype;
  // 取 L 的隐式原型
  L = L.__proto__;
  while (true) { 
    if (L === null) 
      return false; 
    if (O === L)// 这里重点：当 O 严格等于 L 时，返回 true 
      return true; 
    L = L.__proto__; 
  } 
}
```

**判断数组**

1. instanceof
const a = [];
const b = {};
console.log(a instanceof Array);//true
console.log(a instanceof Object);//true,在数组的原型链上也能找到Object构造函数
console.log(b instanceof Array);//false

2. toString
const isArray = (something)=>{
    return Object.prototype.toString.call(something) === '[object Array]';
}

3. isArray
Array.isArray是ES5标准中增加的方法，部分比较老的浏览器可能会有兼容问题

if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}