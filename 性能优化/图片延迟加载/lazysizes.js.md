

https://github.com/aFarkas/lazysizes

原生js，不依赖于jquery/zepto


``` html
// 引入js文件
<script src="lazysizes.min.js" async=""></script>

// 非响应式 例子
<img data-src="image.jpg" class="lazyload" />
// 响应式 例子，自动计算合适的图片
<img
    data-sizes="auto"
    data-src="image2.jpg"
    data-srcset="image1.jpg 300w,
    image2.jpg 600w,
    image3.jpg 900w" class="lazyload" />
// iframe 例子
<iframe frameborder="0"
    class="lazyload"
    allowfullscreen=""
    data-src="//www.youtube.com/embed/ZfV-aYdU4uE">
</iframe>
```

lazysizes延迟加载过程中会改变图片的class：默认lazyload，加载中lazyloading，加载结束：lazyloaded

结合这个特性我们有两种解决上述问题办法：
1、设置opacity:0，然后在显示的时候设置opacity:1。

``` css
/* 渐现 lazyload */
.lazyload,
.lazyloading{
    opacity: 0;
}
.lazyloaded{
    opacity: 1;
    transition: opacity 500ms; //加上transition就可以实现渐现的效果
}
```

2、用一张默认的图占位，比如1x1的透明图或者灰图。

此外，为了让效果更佳，尤其是文章详情页中的大图，我们可以加上loading效果。

``` css
.article-detail-bd {
    .lazyload {
        opacity: 0;
    }
    .lazyloading {
        opacity: 1;
        background: #f7f7f7 url(/images/loading.gif) no-repeat center;
    }
}
```
