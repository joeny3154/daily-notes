http://www.cnblogs.com/eoiioe/archive/2008/12/31/1366081.html

https://www.ibm.com/developerworks/cn/web/1306_jiangjj_jsinstanceof/index.html

## typeof 运算符

### 语法: `()`可选
typeof[(]expression[)]

### 返回值(6种)：

- `number`： 以下两种都返回`number`
  - 常规数字
  - 特殊的数字类型

    |Infinity                |表示无穷大特殊值 |
    |-------|-----|-----|
    |NaN　　　　　　　　　　　　 |特殊的非数字值 |
    |Number.MAX_VALUE　　　　　|可表示的最大数字 |
    |Number.MIN_VALUE　　　　　|可表示的最小数字（与零最接近）| 
    |Number.NaN　　　　　　　　  |特殊的非数字值 |
    |Number.POSITIVE_INFINITY　|表示正无穷大的特殊值 |
    |Number.NEGATIVE_INFINITY  |表示负无穷大的特殊值 |

- `string`：
  字符串

- `boolean`：
  布尔值（true, false）

- `object`： 
  对象: 比如window, {}, ....
  数组
  null

- `function`： 函数
```
  typeof(eval) === 'funtion' // true
  typeof(Date) === 'funtion' // true
```
- `undefined`： 未定义,比如不存在的变量、函数或者undefined
  typeof(undefined)

### 常见用法

- 测试变量的数据类型

- 判断一个变量是否存在
  ***常见于if判断***
  错误写法：如果a不存在（未声明）则会出错
```
if (a) {
  ...
}
// Uncaught ReferenceError: a is not defined
```
  正确写法：
```
if (typeof a === 'undefined') {
  ...
}

```

  还常见于***三元表达式中***：
  ```
  closable = typeof closable === 'undefined' ? true : closable;
  ```
  
### 局限性
Array,Null等特殊对象使用typeof一律返回object


