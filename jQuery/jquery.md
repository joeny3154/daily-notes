
jQuery
==========

- children(expr) 返回所有子节点，这个方法只会返回直接的孩子节点，不会返回所有的子孙节点
- contents() 返回下面的所有内容，包括节点和文本。这个方法和children()的区别就在于，包括空白文本，也会被作为一个jQuery对象返回，children()则只会返回节点

# jQuery对象 与 DOM对象 之间转换

- jQuery对象 => jQuery对象

  `eq(index)`: jQuery对象构建新的jQuery对象。 `$( "li" ).eq( 0 ).css("color", "red");`

- jQuery对象 => DOM对象

  `get(index)` or `$obj[index]` index从0开始计数

  `index()` 从匹配的元素中搜索给定元素的索引值，从0开始计数

- 转DOM对象 => jQuery对象: 使用`$()` 

- 其他

  `size()` 返回的jQuery对象匹配的DOM元素的数量

  `toArray()` 返回一个包含jQuery对象集合中的所有DOM元素的数组

# 元素操作

### 查找

- `filter(selector)` 缩小匹配的范围，初始的jQuery对象集合中筛选
- `find(selector)` 不会有初始集合中的内容

- `end()`方法 在jquery命令链内调用，以便退回到前一个包装集。
- `contents()`

- `parent(selector)` 找父亲节点，可以传入expr进行过滤，比如$("span").parent()或者$("span").parent(".class")
- `parents(selector)` 类似于.parent(expr),但是是查找所有祖先元素，不限于父元素
- `closest(selector)` 获得匹配选择器的第一个祖先元素，从当前元素开始沿 DOM 树向上

- `children(expr)` 返回所有子节点，这个方法只会返回直接的孩子节点，不会返回所有的子孙节点

- `prev()` 返回上一个兄弟节点，不是所有的兄弟节点
- `prevAll()` 返回所有之前的兄弟节点
- `next()` 返回下一个兄弟节点，不是所有的兄弟节点
- `nextAll()` 返回所有之后的兄弟节点
- `siblings()` 返回兄弟姐妹节点

```
$("p").filter(".selected, :first")
```
### 删除

- `detach()` 从DOM中去掉所有匹配的元素。
- `empty()` 从DOM中移除集合中匹配元素的所有子节点。
- `remove()` 将匹配元素集合从DOM中删除。（注：同时移除元素上的事件及 jQuery 数据。）
- `unwrap()` 将匹配元素集合的父级元素删除，保留自身（和兄弟元素，如果存在）在原来的位置。

### 插入
- `insertAfter()` & `after()`：在现存元素的外部，从后面插入元素  
- `insertBefore()` & `before()`：在现存元素的外部，从前面插入元素  
- `appendTo()` & `append()`：在现存元素的内部，从后面插入元素  
- `prependTo()` & `prepend()`：在现存元素的内部，从前面插入元素

- `.html()`

jQuery的.html()会调用.innerHTML来操作，但同时也会catch异常，然后用`.empty()`, `.append()`来重新操作。

### 替换
- `replaceAll()` 用集合的匹配元素替换每个目标元素。
- `replaceWith()` 用提供的内容替换集合中所有匹配的元素并且返回被删除元素的集合。


# 样式操作

- `addClass()` & `removeClass()` 添加 & 移除 类名称
- `toggleClass()` 类名称不存在，则添加指定类名称；如果元素已经拥有指定类名称，则从元素中删除指定类名称。
- `hasClass()` 确定任何一个匹配元素是否有被分配给定的（样式）类
- `css(name,value)` 指定的css样式属性

# 属性操作

- `attr()` 返回 `attributes` 的值
  获取匹配的元素集合中的第一个元素的属性的值。设置每一个匹配元素的一个或多个属性

- `removeAttr()`为匹配的元素集合中的每个元素中移除一个属性（attribute）。

- `prop()` 返回 `property` 的值
  若要检索和更改DOM属性，比如元素的`checked`, `selected`, 或 `disabled` 状态，请使用`.prop()`方法。
  selectedIndex, tagName, nodeName, nodeType, ownerDocument, defaultChecked, 和 defaultSelected 应使用.prop()方法进行取值或赋值

- `removeProp()` 为集合中匹配的元素删除一个属性（property）

- `val()` 获取匹配的元素集合中第一个元素的当前值。设置匹配的元素集合中每个元素的值。

# 文本操作

- `text()`

# 事件

### event 属性

- event.pageX	相对于文档左边缘的鼠标位置。
- event.pageY	相对于文档上边缘的鼠标位置。
- event.preventDefault()	阻止事件的默认动作。
- event.target	触发该事件的 DOM 元素。
- event.type	描述事件的类型。

### 绑定与解绑

- bind(eventName, cb) 可以自定义事件
- unbind() 从匹配元素移除一个被添加的事件处理器

- on(event,childSelector,data,function,map) 添加的事件处理程序适用于当前及未来的元素（比如由脚本创建的新元素）
- off() 方法

- one() 添加只运行一次的事件然后移除

### 触发事件

- trigger(eventName, param1, param2, ...) param可选，传递到事件处理程序的额外参数, 额外的参数对自定义事件特别有用。

# 遍历

- `$(selector).each()(function(index, Element))` each返回的是原来的数组，并不会新创建一个数组。
- `$.each(collection, callback(indexInArray, valueOfElement) )`
  collection 类型: Object遍历的对象或数组。
  callback(indexInArray, valueOfElement)

`$.each()`函数和 `$(selector).each()`是不一样的，那个是专门用来遍历一个jQuery对象。$.each()函数可用于迭代任何集合，无论是“名/值”对象（JavaScript对象）或数组。

在迭代数组的情况下，回调函数每次传递一个数组索引和相应的数组值作为参数。（该值也可以通过访问this关键字得到，但是JavaScript将始终将this值作为一个Object ，即使它是一个简单的字符串或数字值。）该方法返回其第一个参数，这是迭代的对象。

# 数据存储

- `data()` 在匹配元素上存储任意相关数据. 返回匹配的元素集合中的第一个元素的给定名称的数据存储的值。 通过.data(name, value)或HTML5 data-* 属性设置
- `removeData()` 在元素上移除绑定的数据


# 文档加载

- `.load()` 为 JavaScript 的 "load" 事件绑定一个处理函数
- `.ready()` 当DOM准备就绪时，指定一个函数来执行。
- `.unload()` 为 JavaScript 的 "unload" 事件绑定一个处理函数。

# 原生

var a = document.getElementById("dom");
del_space(a); //清理空格
var b = a.childNodes; //获取a的全部子节点；
var c = a.parentNode; //获取a的父节点；
var d = a.nextSibling; //获取a的下一个兄弟节点
var e = a.previousSibling; //获取a的上一个兄弟节点
var f = a.firstChild; //获取a的第一个子节点
var g = a.lastChild; //获取a的最后一个子节点