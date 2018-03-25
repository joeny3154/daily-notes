
使用`float`造成容器高度塌陷解决方法
======

父元素只包含浮动元素，那么它的高度就会塌缩为零（前提就是没有设置高度height属性,或者设置了为auto就会出现这种情况，当然不是所用的浏览器都是这样的，在IE8下面没有这种情况。）

1. `clear: both`

使用浮动的元素后面加一个div, css 添加`clear: both`

**缺点：** 添加很多无意义的空标签

eg:
```
<div class="wrap">
  <div class="float"></div>
  <div class="clear"></div>
</div>
```

2. `overflow: hidden`

**缺点：** `overflow:hidden` 内容增多时候容易造成不会自动换行导致内容被隐藏掉，无法显示需要溢出的元素；`overflow:auto`多层嵌套后，firefox与IE 可能会出现显示错误

3. 父元素设置`display: table`

**缺点：** 盒模型属性已经改变，由此造成的一系列问题，得不偿失

4. 给父级容器加一个 `class="clearfix"`

``` css
.clearfix {
  /* 触发 hasLayout */ 
  zoom: 1; 
}
.clearfix::after {
  content:"";
  display:block;
  clear:both; 
  height:0;
  visibility:hidden;
}
```

layout是windows IE的一个私有概念，它决定了元素如何对其内容定位和尺寸计算，以及与其他元素的关系和相互作用。当一个元素“拥有布局”时，它会负责本身及其子元素的尺寸和定位。而如果一个元素“没有拥有布局”，那么它的尺寸和位置由最近的拥有布局的祖先元素控制。

必须说明的是，IE8及以上浏览器使用了全新的显示引擎，已经不在使用haslayout属性，因此文中提到的haslayout属性只针对IE6和IE7。

1. `display:block` 使生成的元素以块级元素显示,占满剩余空间;

2. `height:0` 避免生成内容破坏原有布局的高度。

3. `visibility:hidden` 使生成的内容不可见，并允许可能被生成内容盖住的内容可以进行点击和交互;

4. 通过 `content:""` 生成内容作为最后一个元素，至于content里面是点还是其他都是可以的

5. `zoom:1` 触发IE hasLayout。

通过分析发现，除了`clear:both` 用来闭合浮动的，其他代码无非都是为了隐藏掉`content`生成的内容，这也就是其他版本的闭合浮动为什么会有`font-size:0，line-height：0`