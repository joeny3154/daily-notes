String.prototype.search()
===========

字符串对象的search方法，返回第一个满足条件的匹配结果在整个字符串中的位置。如果没有任何匹配，则返回-1

**该方法会忽略`g`修饰符**

var r = /x/g;
r.lastIndex = 2; // 无效
'_x_x'.search(r) // 1