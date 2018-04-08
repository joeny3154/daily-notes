# DocumentFragment (fu ruai 门)
DocumentFragment 接口表示一个没有父级文件的最小文档对象。它被当做一个轻量版的 Document 使用，用于存储已排好版的或尚未打理好格式的XML片段

DocumentFragment不是真实DOM树的一部分，它的变化不会引起DOM树的重新渲染的操作(reflow) ，且不会导致性能等问题

创建：`document.createDocumentFragment `

##### 属性
该接口没有特殊的属性，其属性都继承自 Node ，并补充了 ParentNode 接口中的属性。

`ParentNode.children` 只读，返回一个实时（live） HTMLCollection ，包含所有属于 DocumentFragment  的元素类型的子对象。

`ParentNode.firstElementChild` 只读，返回 DocumentFragment 的第一个 Element 类型的子对象，如果没有则返回 null 。

`ParentNode.lastElementChild` 只读，返回 DocumentFragment 的最后一个 Element 类型的子对象，如果没有则返回 null 。

`ParentNode.childElementCount` 只读，子项数量

##### 方法

该接口继承 Node 的全部方法，并实现了 ParentNode 接口中的方法。

`DocumentFragment.find()` : 返回 DocumentFragment 树里第一个匹配的元素 Element 。
`DocumentFragment.findAll()` : 返回 DocumentFragment 树里所有匹配的元素  NodeList。
`DocumentFragment.querySelector()`
`DocumentFragment.querySelectorAll()`
`DocumentFragment.getElementById()`

# DOM 创建

``` js
var el1 = document.createElement('div');

var node = document.createTextNode('hello world!');
```

# DOM 查询

``` js
// 返回当前文档中第一个类名为 "myclass" 的元素
var el = document.querySelector(".myclass");

// 返回一个文档中所有的class为"note"或者 "alert"的div元素
var els = document.querySelectorAll("div.note, div.alert");

// 获取元素
var el = document.getElementById('xxx');
var els = document.getElementsByClassName('highlight');
var els = document.getElementsByTagName('td');
```

# DOM 

``` js
// 获取父元素、父节点
var parent = ele.parentElement;
var parent = ele.parentNode;

// 获取子节点，子节点可以是任何一种节点，可以通过nodeType来判断
var nodes = ele.children;    

// 查询子元素
var els = ele.getElementsByTagName('td');
var els = ele.getElementsByClassName('highlight');

// 当前元素的第一个/最后一个子元素节点
var el = ele.firstElementChild;
var el = ele.lastElementChild;

// 下一个/上一个兄弟元素节点
var el = ele.nextElementSibling;
var el = ele.previousElementSibling;
```

# DOM 更改

``` js
// 添加、删除子元素
ele.appendChild(el);

ele.removeChild(el);

// 替换子元素
replacedNode = parentNode.replaceChild(newChild, oldChild)
// 返回被替换掉的节点

// 插入子元素
parentElement.insertBefore(newElement, referenceElement);
```

# 属性操作

``` js
// 获取一个{name, value}的数组
var attrs = el.attributes;

// 获取、设置属性
var c = el.getAttribute('class');
el.setAttribute('class', 'highlight');

// 判断、移除属性
el.hasAttribute('class');
el.removeAttribute('class');

// 是否有属性设置
el.hasAttributes();  
```


http://harttle.land/2015/10/01/javascript-dom-api.html