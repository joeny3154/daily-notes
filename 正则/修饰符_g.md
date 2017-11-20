g修饰符
=========

默认情况下，第一次匹配成功后，正则对象就停止向下匹配了。g修饰符表示全局匹配（global），加上它以后，正则对象将匹配全部符合条件的结果，主要用于***搜索***和***替换***。

影响的方法有：

# 一、 影响的`RegExp`对象方法有:

### exec 

正则对象的exec方法，可以返回匹配结果。如果发现匹配，就返回一个数组，成员是每一个匹配成功的子字符串，否则返回null。

- 可以使用多次exec方法

如果正则表达式加上g修饰符，则***可以使用多次exec方法***，下一次搜索的位置从上一次匹配成功结束的位置开始

```
  var r = /a(b+)a/g;

  var a1 = r.exec('_abbba_aba_');
  a1 // ['abbba', 'bbb']
  a1.index // 1
  r.lastIndex // 6

  var a2 = r.exec('_abbba_aba_');
  a2 // ['aba', 'b']
  a2.index // 7
  r.lastIndex // 10

  var a3 = r.exec('_abbba_aba_');
  a3 // null
  a3.index // TypeError: Cannot read property 'index' of null
  r.lastIndex // 0

<!-- 当第三次匹配结束以后，整个字符串已经到达尾部，正则对象的lastIndex属性重置为0，意味着第四次匹配将从头开始 -->

  var a4 = r.exec('_abbba_aba_');
  a4 // ['abbba', 'bbb']
  a4.index // 1
  r.lastIndex // 6

```

- 手动设置`lastIndex`的值，并是它生效

手动设置了lastIndex的值，就会从指定位置开始匹配。但是，这**只在设置了g修饰符**的情况下，才会有效

```
var r = /a/;

r.lastIndex = 7; // 无效
var match = r.exec('xaxa');
match.index // 1
r.lastIndex // 7

```


```
var r = /a/g;
r.lastIndex = 2;
var match = r.exec('xaxa');
match.index // 3
r.lastIndex // 4
```

### test

正则模式不含`g`修饰符，每次都是从字符串头部开始匹配; 

***含有`g`修饰符，每次都是从上一次匹配成功处，开始向后匹配***。

```
var regex = /b/g;
var str = 'abba';

regex.test(str); // true
regex.test(str); // true
regex.test(str); // false
```

***带有g修饰符时，可以通过正则对象的lastIndex属性指定开始搜索的位置***

```
var r = /x/g;
var s = '_x_x';

r.lastIndex = 4;
r.test(s) // false
```

# 二、 影响的`String`对象方法有：


# match

- 一次性返回所有结果

```
'abcd'.match(/\w/g) // ["a", "b", "c", "d"]
```

- 不会捕获分组的内容

使用组匹配时，不宜同时使用`g`修饰符，否则match方法不会捕获分组的内容, 只捕获了匹配*整个表达式*的部分

```
var m1 = 'abcabv'.match(/(.)b(.)/);
m1 // ["abc", "a", "c", index: 0, input: "abcabv"]

<!-- 只捕获了匹配整个表达式的部分 -->
var m2 = 'abcabv'.match(/(.)b(.)/g);
m2 // ["abc", "abv"]
```

# replace

搜索模式如果不加`g`修饰符，就替换第一个匹配成功的值，否则替换所有匹配成功的值。

```
'aaa'.replace('a', 'b') // "baa"
'aaa'.replace(/a/, 'b') // "baa"
'aaa'.replace(/a/g, 'b') // "bbb"
```