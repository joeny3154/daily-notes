String.prototype.match()
==============

字符串对象的match方法对字符串进行正则匹配，返回匹配结果。

字符串的match方法与正则对象的exec方法非常类似：匹配成功返回一个数组，匹配失败返回null。

var s = 'abcd';
var r = /\w/;
["a", index: 0, input: "abcd"]

如果正则表达式带有`g`修饰符，则该方法与正则对象的exec方法行为不同，会一次性返回所有匹配成功的结果。

var s = 'abcd';
var r = /\w/g;

s.match(r) // ["a", "b", "c", "d"]
r.exec(s) // ["a", index: 0, input: "abcd"]

设置正则表达式的lastIndex属性，对match方法无效，匹配总是从字符串的第一个字符开始。

```
var r = /a|b/g;
r.lastIndex = 7;
'xaxb'.match(r) // ['a', 'b']
r.lastIndex // 0
```