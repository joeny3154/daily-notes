

attribute 绑定
=====

可以通过attribute 绑定来直接设置 attribute 的值。

```
<tr><td [attr.colspan]="1 + 1">One-Two</td></tr>

// attribute 绑定的主要用例之一是设置 ARIA attribute（译注：ARIA指可访问性，用于给残障人士访问互联网提供便利）
<button [attr.aria-label]="actionName">{{actionName}} with Aria</button>

```

**因为当元素没有属性可绑的时候，就必须使用 attribute 绑定**

比如考虑 ARIA， SVG 和 table 中的 colspan/rowspan 等 attribute。 它们是纯粹的 attribute，没有对应的属性可供绑定。

<tr><td colspan="{{1 + 1}}">Three-Four</td></tr>

Template parse errors:
Can't bind to 'colspan' since it isn't a known native property
（模板解析错误：不能绑定到 'colspan'，因为它不是已知的原生属性）

原因： <td>元素没有colspan属性。 但是插值表达式和属性绑定只能设置属性，不能设置 attribute


**方式：**由attr前缀，一个点 (.) 和 attribute 的名字组成

<tr><td [attr.colspan]="1 + 1">One-Two</td></tr>