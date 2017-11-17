

# exec()

正则对象的exec方法，可以返回匹配结果。

如果发现匹配，就返回一个数组，成员是每一个匹配成功的子字符串，否则返回null

***exec方法的返回数组还包含以下两个属性:***

> input：整个原字符串。
> index：整个模式匹配成功的开始位置（从0开始计数）

```
["abbba", "bbb", index: 1, input: "_abbba_aba_"]

var r = /a(b+)a/;
var arr = r.exec('_abbba_aba_');
arr // ["abbba", "bbb"]

arr.index // 1 因为从原字符串的第二个位置开始匹配成功
arr.input // "_abbba_aba_"
```

***如果正则表达式加上`g`修饰符，则可以使用多次`exec`方法，下一次搜索的位置从上一次匹配成功结束的位置开始。***

利用`g`修饰符允许多次匹配的特点，可以用一个循环完成全部匹配

```
var r = /a(b+)a/g;
var s = '_abbba_aba_';

while(true) {
  var match = r.exec(s);
  if (!match) break;
  console.log(match[1]);
}
// bbb
// b

```

正则对象如果手动设置了`lastIndex`的值，就会从指定位置开始匹配。但是，这**只在设置了g修饰符**的情况下，才会有效

```
var r = /a/;

r.lastIndex = 7; // 无效
var match = r.exec('xaxa');
match.index // 1
r.lastIndex // 7
```

*如果正则对象是一个空字符串，则exec方法会匹配成功，但返回的也是空字符串*

```

```