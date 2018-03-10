es6 新增内容
============

### 严格模式：

`'use strict';`

### 字符串

-	多行字符串

```
    var str = `
    这是
    一个
    多行字符串
    `
    console.log(str);
```

-	模板字符串

```
var name = 'joeny',age = 27;
var str_2 ="这是一个无效${name}字符串${age}";//这是一个无效${name}字符串${age}
var str_3 =`这是一个模板${name}字符串${age}`;//这是一个拼接joeny字符串27
```

### 数组

### 对象

注意：最后一个键值对不需要在末尾加“,”，如果加了，有的浏览器（如低版本的IE）将报错。

-	in 判断一个属性存在，可能是继承的`
	'toString' in obj; //true
	`
-	hasOwnProperty() 判断是否是自身拥有`
	obj.hasOwnProperty("name");//true
	`

### Map Set

1.Map

JavaScript的Object类型的key必须是**string类型**。但实际上Number或者其他数据类型作为key也是非常合理的。为了解决这个问题，最新的ES6规范引入了新的数据类型`Map`。

```
方法1： 传入一个二维数组
var m_1 = new Map([["one",1],[2,"two"]]);
//方法2 ： 初始化一个空Map对象 通过set方法添加
// var m_1 = new Map ();
m_1.set('3',3);
m_1.set('4',4);
m_1.delete("4");
console.log(m_1.has('one')); // true
console.log(m_1.has('4')); // false
console.log("one:" + m_1.get("one")); //one:1
console.log("2:" +m_1.get(2)); //  ;2:two
```

2.Set

`Set`类型是一组`key`的集合，但是不储存`value`;由于`key`不能重复，所以，在Set中没有重复的`key`。

key 不限制为 `String` 类型

```
// 初始化
var s_1 = new Set([1, "2", 3]);
//var s_1 = new Set();
s_1.add(4); // {1, "2", 3,4}
s_1.add("5"); // {1, "2", 3,4,"5"}
s_1.delete("5"); // {1, "2", 3,"4"}
s_1.has("5"); // false
s_1.add({a:1,b:2})

// Set 迭代 s_1 {1, "2", 3,"4"}
console.log(s_1.size); //4
for (let item of s_1) console.log(item); //1 2 3 4 {a:1,b:2}
for (let item of s_1.keys()) console.log(item); //1 2 3 4 {a:1,b:2}
for (let item of s_1.values()) console.log(item); //1 2 3 4 {a:1,b:2}

var arr = Array.from(s_1);
for(let item of arr) console.log(item); //1 2 3 4 {a:1,b:2}

```

### iterable

遍历`Array`可以采用下标循环，遍历`Map`和`Set`就无法使用下标循环。

为了统一集合类型，ES6标准引入了新的`iterable`类型，`Array`、`Map`和`Set`都属于iterable类型。

具有`iterable`类型的集合可以通过新的`for ... of`循环来遍历。

**注意**：`for ... of`循环和`for ... in`循环有何区别？

```
var a = ['A', 'B', 'C'];
a.name = 'Hello';
for (var x in a) {
    console.log(x); // '0', '1', '2', 'name'
}

```

-	for ... in循环将把name包括在内，但Array的length属性却不包括在内； - for ... of循环则完全修复了这些问题，它只循环集合本身的元素。

**iterable 类型** :内置 forEach()方法，它接收一个函数，每次迭代就自动回调该函数:

-	Array

```
var arr = ["a","b","c"];
arr.forEach(function(ele,index,arr){
  //ele: 指向当前元素
  //index: 指向当前索引
  // array :指向arr对象本身
})

```

-	Set

类型没有索引，因此回调函数的前两个参数都是元素本身：\`\`\`

##### 为何要引入for ... of循环，for ... or循环和for ... in循环有何区别？

//for ... in循环它遍历的实际上是对象的属性名称;Array 也是一个对象，它的每个元素的索引被视为一个属性；

for ... in 存在的问题？

```
// 数组中不应该有name属性（数组索引）
 var arr = ['A', 'B', 'C'];
 arr.name= "rose";
 for (let x in arr){
   console.log(x);// 0 1 2 name
  }
 console.log("length:"+arr.length); // 3 正确

```

for ... of 解决了这个问题：

```
// for ... of 循环中：
for (let x of arr){
  console.log(x);// 0 1 2
}
console.log("length:"+arr.length); // 3

```

##### forEach()方法

比使用 `for ... of`循环更好的方式是直接使用`iterable`内置的`forEach`方法，它接收一个函数，每次迭代就自动回调该函数；

-	Array

```
var a = new Array("a","b","c");
a.forEach(function(ele,index,arr){
  console.log("index: "+index + " ele: "+ ele) ;
})
// index: 0 ele: a
//index: 1 ele: b
//index: 2 ele :c
```

-	Map

Map的回调函数参数依次为value、key和map本身：

```
var m = new Map([[1, 'x'], [2, 'y'], [3, 'z']]);
m.forEach(function (value, key, map) {
  console.log(value);
});

```

-	Set

Set与Array类似，但Set没有索引，因此回调函数的前两个参数都是元素本身

```
var s = new Set(['A', 'B', 'C']);
s.forEach(function (element,_element, set) {
  console.log(element);
});

```

### 函数 Function

##### arguments

获得调用者传入的所有参数。 也就是说，**即使函数不定义任何参数**，还是可以拿到参数的值：

```
function foo (x){
  console.log(x);
  for(let i =0;i<arguments.length)
}
```
