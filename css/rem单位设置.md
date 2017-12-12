http://www.w3cplus.com/css3/define-font-size-with-css3-rem

rem是相对于根元素<html>，这样就意味着，我们只需要在根元素确定一个参考值，，在根元素中设置多大的字体，这完全可以根据您自己的需，大家也可以参考下图：著作权归作者所有。


在根元素<html>中定义了一个基本字体大小为62.5%（也就是10px。设置这个值主要方便计算，如果没有设置，将是以“16px”为基准 ）。从上面的计算结果，我们使用“rem”就像使用“px”一样的方便，而且同时解决了“px”和“em”两者不同之处。

**demo**

```
html {font-size: 62.5%;/*10 ÷ 16 × 100% = 62.5%*/}
body {font-size: 1.4rem;/*1.4 × 10px = 14px */}
h1 { font-size: 2.4rem;/*2.4 × 10px = 24px*/}
```

# px rem 对照表

![em](./emTable.png)

# 兼容性：

IE6-8无法支持

# 动态设置

```
<!-- js -->

var PAGE_MAX_WIDTH = 750, BASE_FONT_SIZE = 40;
// documentElement 属性可返回文档的根节点。
var DOC_ROOT_STYLE = document.documentElement.style;
var timer = null;

function resizeFontSize() {
  DOC_ROOT_STYLE.fontSize = Math.min( (document.documentElement.clientWidth) / PAGE_MAX_WIDTH * BASE_FONT_SIZE, BASE_FONT_SIZE) + 'px';
}

window.addEventListener('load', resizeFontSize);
window.addEventListener('resize', function() {
    clearTimeout(timer);
    timer = setTimeout(resizeFontSize, 100);
});
timer = setTimeout(resizeFontSize, 300);
resizeFontSize();

// 或者

window.addEventListener(('orientationchange' in window ? 'orientationchange' : 'resize'), (function () {
    function c() {
        var d = document.documentElement;
        var cw = d.clientWidth || 720;
        d.style.fontSize = (20 * (cw / 360)) > 40 ? 40 + 'px' : (20 * (cw / 360)) + 'px';
    }

    c();
    return c;
})(), false);

<!-- less -->

@rem: 40;

h1 {
  font-size: 20/@rem;
}
```



window.addEventListener(('orientationchange' in window ? 'orientationchange' : 'resize'), (function () {
    function f() {
        var d = document.documentElement;
        var cw = d.clientWidth || 720;
        var fs = 0;
        if (cw <= 360) {
            fs = 24;
        } else if (cw <= 416) {
            fs = 26;
        } else {
            fs = 20 * (cw / 360) > 40 ? 40 : 20 * (cw / 360);
        }
        d.style.fontSize = fs + 'px';
    }

    f();
    return f;
})(), false);