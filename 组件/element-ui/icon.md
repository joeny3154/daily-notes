# icon


``` html
<i :class="'el-icon-' + name"></i>
```

``` scss
@import "common/var";

@font-face {
  font-family: 'element-icons';
  src: url('#{$--font-path}/element-icons.woff') format('woff'), /* chrome, firefox */
       url('#{$--font-path}/element-icons.ttf') format('truetype'); /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  font-weight: normal;
  font-style: normal
}

[class^="el-icon-"], [class*=" el-icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'element-icons' !important;
  // 告诉浏览器不要说这个元素
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  vertical-align: baseline;
  display: inline-block;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.el-icon--right {
  margin-left: 5px;
}
.el-icon--left {
  margin-right: 5px;
}
.el-icon-info:before { content: "\e61a"; }
// ...
```

- loading

``` scss
.el-icon-loading:before { content: "\e61e"; }
.el-icon-loading {
  animation: rotating 2s linear infinite;
}

@keyframes rotating {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
```