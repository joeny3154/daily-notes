rem
====

``` css
html {
  font-size: 100%; // 1rem = 16px;
  font-size: 16px; // 1rem = 16px;
}
```



假设设计图稿是 750px 像素

cw = 750/@rem * fontSize => fontSize = cw * @rem / 750

``` js

var PAGE_MAX_WIDTH = 750;
var BASE_FONT_SIZE = 40; // font-size小于12px不生效
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

```

或者

``` js
window.addEventListener(('orientationchange' in window ? 'orientationchange' : 'resize'), (function () {
    function c() {
        var d = document.documentElement;
        var cw = d.clientWidth || 720;
        d.style.fontSize = (20 * (cw / 360)) > 40 ? 40 + 'px' : (20 * (cw / 360)) + 'px';
    }
    c();
    return c;
})(), false);
```

使用：

``` less
@rem: 40
div {
  width: 100/@rem;
}
···