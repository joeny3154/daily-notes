
假设设计图稿是 750px 像素

```

var PAGE_MAX_WIDTH = 750, BASE_FONT_SIZE = 40;
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