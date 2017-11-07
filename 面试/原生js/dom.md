

# 创建新节点

- 创建一个DOM片段 `let docFragment = document.createDocumentFragment()`

  文档片段存在于内存中，并不在DOM树中，所以将子元素插入到文档片段时不会引起页面回流(reflow)(对元素位置和几何上的计算)。
  因此，使用文档片段document fragments 通常会起到优化性能的作用(better performance)。

- 创建一个具体的元素 `let elem = document.createElement('name')`
- 创建一个文本节点 `let elem = document.createTextNode('hello world!')`

# 查询

- `querySelector('选择器')`
- `document.querySelectorAll("div.note, div.alert")`

- `getElementsByTagName('div')` 通过标签名称
- `getElementsByName('user')` 通过元素的Name属性的值(IE容错能力较强，会得到一个数组，其中包括id等于name值的)
- `getElementById('id')` 通过元素Id，唯一性
- `document.getElementsByClassName('show')`

# 操作

- 添加
  elem.appendChild()
- 移除
  elem.removeChild()
- 替换
  elem.replaceChild()
- 插入
  elem.insertBefore(newElement, referenceElement) //在已有的子节点前插入一个新的子节点
  
# 属性操作

- 获取、设置属性
<!-- 获取一个{name, value}的数组 -->
var attrs = el.attributes;

var c = el.getAttribute('class');
el.setAttribute('class', 'show');

- 判断、移除属性

el.hasAttribute('class');
el.removeAttribute('class');

- 是否有属性设置

el.hasAttributes();
  
  
