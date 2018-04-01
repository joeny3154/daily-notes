#  JavaScript 检测浏览器能否处理0.5px的边框，如果可以，给<html>元素添加个class

``` js

if (window.devicePixelRatio && devicePixelRatio >= 2) {
  var testElem = document.createElement('div');
  testElem.style.border = '.5px solid transparent';
  document.body.appendChild(testElem);
  if (testElem.offsetHeight == 1)
  {
    document.querySelector('html').classList.add('hairlines');
  }
  document.body.removeChild(testElem);
}
// 脚本应该放在<body>内， 如果在<head>里面运行，需要包装 $(document).ready(function() {   })

```
 
``` css
div {
  border: 1px solid #bbb;
}
 
.hairlines div {
  border-width: 0.5px;
}
```

缺点：不能兼容安卓设备和 iOS 8 以下设备


# border-image

通常手机端的页面设计稿都是放大一倍的，如：为适应iphone retina，设计稿会设计成640*960的分辨率，图片按照2倍大小切出来，在手机端看着就不会虚化，非常清晰。
同样，在使用border-image时，将border设计为物理1px

https://juejin.im/entry/584e427361ff4b006cd22c7c

https://github.com/AlloyTeam/Mars/blob/master/solutions/border-1px.md

- 底边

`linenew.png`要求：宽1px，高2px（其中上半部分透明，下半部分是边框颜色）

``` css
.border-bottom-1px {
  border-width: 0 0 1px 0;
  -webkit-border-image: url(linenew.png) 0 0 2 0 stretch;
  border-image: url(linenew.png) 0 0 2 0 stretch;
}
```

- 上下边框

`linenew.png`要求：宽1px，高4px（其中上下1px部分是边框颜色, 中间部分透明）

``` css
.border-image-1px {
  border-width: 1px 0;
  -webkit-border-image: url(linenew.png) 2 0 stretch;
  border-image: url(linenew.png) 2 0 stretch;
}
```

兼容处理：在非视网膜屏上会出现border显示不出来的现象，于是使用Media Query做一些兼容，样式设置如下：

``` css
.border-image-1px {
  border-bottom: 1px solid #666;
}
@media only screen and (-webkit-min-device-pixel-ratio: 2) {
  .border-image-1px {
    border-bottom: none;
    border-width: 0 0 1px 0;
    -webkit-border-image: url(../img/linenew.png) 0 0 2 0 stretch;
    border-image: url(../img/linenew.png) 0 0 2 0 stretch;
  }
}
```

缺点：更换border颜色需要更换图片；圆角需要特殊处理，并且边缘会模糊

# 多背景渐变实现

``` css
.background-gradient-1px {
  background:
  linear-gradient(180deg, black, black 50%, transparent 50%) top left / 100% 1px no-repeat,
  linear-gradient(90deg, black, black 50%, transparent 50%) top right / 1px 100% no-repeat,
  linear-gradient(0, black, black 50%, transparent 50%) bottom right / 100% 1px no-repeat,
  linear-gradient(-90deg, black, black 50%, transparent 50%) bottom left / 1px 100% no-repeat;
}
/* 或者 */
.background-gradient-1px{
  background: -webkit-gradient(linear, left top, left bottom, color-stop(.5, transparent), color-stop(.5, #c8c7cc), to(#c8c7cc)) left bottom repeat-x;
  background-size: 100% 1px;
}
```

# 使用`background-image`实现

``` css
.background-image-1px {
background: url(../img/line.png) repeat-x left bottom;
-webkit-background-size: 100% 1px;
background-size: 100% 1px;
}
```

缺点：更换border颜色需要更换图片；圆角需要特殊处理，并且边缘会模糊

# 伪类 + transform 实现

单条边

``` css
.scale-1px{
  position: relative;
  border:none;
}
.scale-1px:after{
  content: '';
  position: absolute;
  bottom: 0;
  background: #000;
  width: 100%;
  height: 1px;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}
```

四条边

``` css 
.scale-1px{
  position: relative;
  margin-bottom: 20px;
  border:none;
}
.scale-1px:after{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid #000;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 200%;
  height: 200%;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
  -webkit-transform-origin: left top;
  transform-origin: left top;
}
```

媒体查询判断一下：

``` css
@media only screen and (-webkit-min-device-pixel-ratio: 2) {
  .scale-1px{
    position: relative;
    margin-bottom: 20px;
    border:none;
  }
  .scale-1px:after{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid #000;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 200%;
    height: 200%;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    -webkit-transform-origin: left top;
    transform-origin: left top;
  }
}
```

优点：所有场景都能满足，支持圆角(伪类和本体类都需要加border-radius)

# viewport + rem 实现

淘宝M站是通过 viewport + rem 实现的

在devicePixelRatio = 2 时，输出viewport

<meta name="viewport" content="initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no">

在devicePixelRatio = 3 时，输出viewport

	
<meta name="viewport" content="initial-scale=0.3333333333333333, maximum-scale=0.3333333333333333, minimum-scale=0.3333333333333333, user-scalable=no">

同时通过设置对应viewport的rem基准值，这种方式就可以像以前一样轻松愉快的写1px了
