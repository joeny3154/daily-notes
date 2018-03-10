[css font](https://www.w3cplus.com/content/css3-font-face)

# 1.下载
[google fonts](https://fonts.google.com/)


# 2.生成@font-face所需字体格式: `.eot, .svg, .ttf, .otf`：
[工具fontsquirrel](https://www.fontsquirrel.com/tools/webfont-generator)


# 3.使用到项目

```
   @font-face {
      font-family: 'SingleMaltaRegular';
      src: url('../fonts/singlemalta-webfont.eot');
      src: url('../fonts/singlemalta-webfont.eot?#iefix') format('embedded-opentype'),
           url('../fonts/singlemalta-webfont.woff') format('woff'),
	   url('../fonts/singlemalta-webfont.ttf') format('truetype'),
	   url('../fonts/singlemalta-webfont.svg#SingleMaltaRegular') format('svg');
      font-weight: normal;
      font-style: normal;
   }

   h2 {
     font-family: 'SingleMaltaRegular'
   }
```

### 字体选择
https://segmentfault.com/a/1190000006110417