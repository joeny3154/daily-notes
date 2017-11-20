jquery要点总结
==============

### 选择器

什么是jQuery对象？

jQuery对象类似数组，它的每个元素都是一个引用了DOM节点的对象。 与css3类似

```
var $div = $("#demo");
```

如果id 为 demo的div不存在，返回的jquery对象如下`[]`；

所以jQuery的选择器不会返回undefined或者null，这样的好处是你不必在下一行判断if ($dom === undefined)。

**jQuery对象和DOM对象之间可以互相转化：**

get([index]) 取得第

index ：个位置上的元素

get() ：取得所有匹配的 DOM 元素集合。

```
var $div = $('#abc'); // jQuery对象
var divDom = $div.get(0); // $div.[0],$div.eq(0) ...假设存在div，获取第1个DOM元素
var another = $(divDom); // 重新把DOM包装为jQuery对象

```

```
<!-- get() -->
$("img").get(0);    //[ <img src="test1.jpg"/> ]

```

### 过滤选择器

```
$('ul.lang li'); // 选出JavaScript、Python和Lua 3个节点

$('ul.lang li:first-child'); // 仅选出JavaScript
$('ul.lang li:last-child'); // 仅选出Lua
$('ul.lang li:nth-child(2)'); // 选出第N个元素，N从1开始
$('ul.lang li:nth-child(even)'); // 选出序号为偶数的元素
$('ul.lang li:nth-child(odd)'); // 选出序号为奇数的元素

```

**表单相关:**

-	针对表单元素，jQuery还有一组特殊的过滤选择器：

-	`:input`：可以选择`<input>`，`<textarea>`，`<select>`和`<button>`；

-	`:file`：可以选择`<input type="file">`，和`input[type=file]`一样；

-	`:checkbox`：可以选择复选框，和`input[type=checkbox]`一样；

-	`:radio`：可以选择单选框，和`input[type=radio]`一样；

-	`:focus`：可以选择当前输入焦点的元素，例如把光标放到一个`<input>`上，用`$('input:focus')`就可以选出；

-	`:checked`：选择当前勾上的单选框和复选框，用这个选择器可以立刻获得用户选择的项目，如`$('input[type=radio]:checked')`；

-	`:enabled`：可以选择可以正常输入的`<input>`、`<select>` 等，也就是没有灰掉的输入；

-	`:disabled`：和`:enabled`正好相反，选择那些不能输入的。

其他过滤选择器：`
$('div:visible'); // 所有可见的div
$('div:hidden'); // 所有隐藏的div
`

### 查找和过滤

##### 查找

向下查找：

find()查找：

从当前节点开始向上查找：

parent()方法： 取得一个包含着所有匹配元素的唯一父元素的元素集合。

parents()方法： 父元素开始匹配寻找；

closet()方法: closest会首先检查当前元素是否匹配，如果匹配则直接返回元素本身。如果不匹配则向上查找父元素，一层一层往上，直到找到匹配选择器的元素。如果什么都没找到则返回一个空的jQuery对象。

注意： closest和parents的主要区别是：1，前者从当前元素开始匹配寻找，后者从父元素开始匹配寻找；2，前者逐级向上查找，直到发现匹配的元素后就停止了，后者一直向上查找直到根元素，然后把这些元素放进一个临时集合中，再用给定的选择器表达式去过滤；3，前者返回0或1个元素，后者可能包含0个，1个，或者多个元素。

位于同一层级的节点，可以通过next()和prev()方法，例如：

同级查找：

next()：同辈后一个；可添加一个选择器过滤

prev()： 同辈前一个；可添加一个选择器过滤

取得一个包含匹配的元素集合中每一个元素的所有唯一同辈元素的元素集合。可以用可选的表达式进行筛选。

##### 过滤

自身当过滤条件：

-	filter():方法可以过滤掉不符合选择器条件的节点：

```
// 传入选择器
var $langs = $("ul.lang li");
var $a = $langs.filter(".dy");
```

```
// 传入函数
var $langs = $("ul.lang li");
langs.filter(function(){
    return $(this).html().indexOf("S") == 0;
})

```

-	not():删除与指定表达式匹配的元素

filter()与not()的区别： 两个方法的筛选方向相反，一个是删除与表达是匹配的，一个是保留与表达是匹配的。

后代当过滤条件：

-	has(): 保留包含特定后代的元素，去掉那些不含有指定后代的元素。

```
//  从p元素中删除带有 select 的ID的元素
<!-- html -->
<p>Hello</p><p id="selected">Hello Again</p>

<!-- js -->
$("p").not("#selected");
console.log($("p").not("#selected").html());//Hello

```

-	map():方法把一个jQuery对象包含的若干DOM节点转化为其他对象：

```
//把form中的每个input元素的值建立一个列表:

 var str = $("input").map(function(){
  return $(this).val();
}).get().join(", ") ;
$("p").append(str);

//get()不传值，取得所有匹配的 DOM 元素集合。

```

-	eq():

判断：

-	is(): 根据选择器、DOM元素或 jQuery 对象来检测匹配元素集合，如果其中至少有一个元素符合这个给定的表达式就返回true。

```
// 判断父元素是否是 form元素
<!-- html -->
<form><input type="checkbox" /></form>

<!-- js -->
$("input[type='checkbox']")

```

### DOM操作

##### 修改Text和HTML

```
<!-- HTML结构 -->
<ul id="test-ul">
    <li class="js">JavaScript</li>
    <li name="book">Java &amp; JavaScript</li>
</ul>

<!-- js -->
$('#test-ul li[name=book]').text(); // 'Java & JavaScript'
$('#test-ul li[name=book]').html(); // 'Java &amp; JavaScript'

```

text() 和 html()方法的区别：

```
// $("ul").text();
// 结果：
"
    JavaScript
    Java & JavaScript
"
//说明 ： 去除了标签，特殊字符转义成文本
```

```
// $("ul").html();
// 结果：
"
    <li class='js'>JavaScript</li>
    <li name='book'>Java &amp; JavaScript</li>
"
//说明 ：特殊字符不转义成文本
```

##### 修改CSS

```
<!-- html -->
<ul id="test-css">
    <li class="lang dy"><span>JavaScript</span></li>
    <li class="lang"><span>Java</span></li>
    <li class="lang dy"><span>Python</span></li>
    <li class="lang"><span>Swift</span></li>
    <li class="lang dy"><span>Scheme</span></li>
</ul>

<!-- js -->
$('#test-css li.dy>span').css('background-color', '#ffd351').css('color', 'red');
```

修改class属性

-	css():方法将作用于DOM节点的style属性，具有最高优先级。

修改class属性

-	hasClass()
-	addClass()
-	removeClass()

```
var div = $('#test-div');
div.hasClass('highlight'); // false， class是否包含highlight
div.addClass('highlight'); // 添加highlight这个class
div.removeClass('highlight'); // 删除highlight这个class
```

获取DOM信息

```
// 浏览器可视窗口大小:
$(window).width(); // 800
$(window).height(); // 600

// HTML文档大小:
$(document).width(); // 800
$(document).height(); // 3500

// 某个div的大小:
var div = $('#test-div');
div.width(); // 600
div.height(); // 300
div.width(400); // 设置CSS属性 width: 400px，是否生效要看CSS是否有效
div.height('200px'); // 设置CSS属性 height: 200px，是否生效要看CSS是否有效
```

操作DOM的属性

-	attr()
-	removeAttr()

prop()方法和attr()类似，但是HTML5规定有一种属性在DOM节点中可以没有值，只有出现与不出现两种，例如：

```
<input id="test-radio" type="radio" name="test" checked value="1">
```

等价于

```
<input id="test-radio" type="radio" name="test" checked="checked" value="1">
```

attr()和prop()对于这样的属性的处理有所不同：

```
var radio = $('#test-radio');
radio.attr('checked'); // 'checked'
radio.prop('checked'); // true
```

prop()返回值更合理一些。不过，用is()方法判断更好：

```
var radio = $('#test-radio');
radio.is(':checked'); // true
```

类似的属性还有:

-	enabled  
-	disabled
-	checked
-	selected
-	处理时最好用is(':selected')...

当属性没有被设置时候，.attr()方法将返回undefined。若要检索和更改DOM属性,比如元素的checked, selected, 或 disabled状态，请使用.prop()方法。

操作表单 value 属性

val()方法获取和设置对应的value属性：

```
<!-- html -->
    <input id="test-input" name="email" value="">
    <select id="test-select" name="city">
        <option value="BJ" selected>Beijing</option>
        <option value="SH">Shanghai</option>
        <option value="SZ">Shenzhen</option>
    </select>
    <textarea id="test-textarea">Hello</textarea>

<!-- js -->
var
    input = $('#test-input'),
    select = $('#test-select'),
    textarea = $('#test-textarea');

input.val(); // 'test'
input.val('abc@example.com'); // 文本框的内容已变为abc@example.com

select.val(); // 'BJ'
select.val('SH'); // 选择框已变为Shanghai

textarea.val(); // 'Hello'
textarea.val('Hi'); // 文本区域已更新为'Hi'
```

### 修改DOM结构

##### 插入到子节点：

-	html()
-	append()把DOM添加到最后，
-	prepend()则把DOM添加到最前

除了接受字符串，append()还可以传入原始的DOM对象，jQuery对象和函数对象

##### 插入到同级节点：

-	after()

-	before()
