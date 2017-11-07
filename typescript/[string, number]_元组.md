元组
=========
数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象。
let xcatliu: [string, number] = ['Xcat Liu', 25];

### 赋值

let xcatliu: [string, number];
<!-- 只赋值其中一项 -->
xcatliu[0] = 'Xcat Liu';
xcatliu[1] = 25;

<!-- 或者： -->
直接对元组类型的变量进行初始化或者赋值时，**需要提供所有元组类型中指定的项**

xcatliu = ['Xcat Liu', 25];

<!-- 访问： -->
xcatliu[0].slice(1);
xcatliu[1].toFixed(2);

### 越界的元素

当赋值给越界的元素时，它类型会被限制为元组中每个类型的联合类型：

let xcatliu: [string, number];
xcatliu = ['Xcat Liu', 25, 'http://xcatliu.com/'];

<!-- 数组的第三项满足联合类型 string | number -->


- 当访问一个越界的元素，也会识别为元组中每个类型的联合类型，所以只能访问共有的属性或方法

let xcatliu: [string, number];
xcatliu = ['Xcat Liu', 25, 'http://xcatliu.com/'];

console.log(xcatliu[2].slice(1));
// index.ts(4,24): error TS2339: Property 'slice' does not exist on type 'string | number'.

因为：
**如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的属性或方法。**