
i修饰符
======

默认情况下，正则对象区分字母的大小写，加上i修饰符以后表示忽略大小写（ignorecase）。

eg: 

```
/abc/.test('ABC') // false
/abc/i.test('ABC') // true
```
