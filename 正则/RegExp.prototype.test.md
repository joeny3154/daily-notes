- test()

test方法返回一个布尔值，表示当前模式是否能匹配参数字符串

*如果正则模式是一个空字符串，则匹配所有字符串*

```
/cat/.test('cats and dogs') // true

<!-- 如果正则表达式带有 g 修饰符，则每一次test方法都从上一次结束的位置开始向后匹配。 -->
var r = /x/g;
var s = '_x_x';

r.lastIndex // 0
r.test(s) // true

r.lastIndex // 2
r.test(s) // true

r.lastIndex // 4
r.test(s) // false

<!-- 正则对象的lastIndex属性指定开始搜索的位置, 下例从第五个位置开始搜索-->

var r = /x/g;
var s = '_x_x';

r.lastIndex = 4;
r.test(s) // false
```
