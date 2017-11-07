# 变量

- 声明 `$`

```
$blue : #1875e7;
```

- 变量字符串嵌套 `#{}`

```
$side : left;
.rounded {
  border-#{$side}-radius: 5px
}
```

- 计算: 与less一致

# 嵌套：选择器嵌套
  `&`引用父元素

# 注释： 分三种
- 单行注释：编译后被省略
```
// comment
```
- 多行注释：会保留在编译后的文件中
```
/* comment */
```
- 重要注释：即使是压缩模式编译，也会保留这行注释，通常可以用于声明版权信息
```
/*!
  重要注释
*/
```

# 继承： 使用@extend命令
```
.class1 {
  border: 1px solid #ddd;
}
.class2 {
  @extend .class1;
  font-size: 120%;
}
```

# Mixin混合： 可以重用的代码块

- 定义代码块 使用`@mixin` 命令
```
@mixin left {
  float: left;
  margin-left: 10px;
}
```

- 使用代码块 使用`@include`命令
```
div {
  @include left;
}
```
- 添加参数
```
// 定义
@mixin left($value: 10px) {
  float: left;
  margin-right: $value;
}
// 调用
div {
  @include left(20px)
}
```

# 函数

- 颜色函数
```
　　lighten(#cc3, 10%) // #d6d65c
　　darken(#cc3, 10%) // #a3a329
　　grayscale(#cc3) // #808080
　　complement(#cc3) // #33c
```

# 导入文件 `@import`命令
```
@import "path/filename.scss"
// 导入css文件
@import "path/filename.css"
```

# 条件语句
- if else
```
p {
　@if 1 + 1 == 2 { border: 1px solid; }
　@if 5 < 3 { border: 2px dotted; }
}

@if lightness($color) > 30% {
　　background-color: #000;
} @else {
　　background-color: #fff;
}
```
- 循环语句
- for
```
@for $i from 1 to 10 {
　.border-#{$i} {
　　border: #{$i}px solid blue;
　}
}

```
- while
```
$i: 6;
@while $i > 0 {
　.item-#{$i} { width: 2em * $i; }
　$i: $i - 2;
}
```
- each
```
@each $member in a, b, c, d {
　.#{$member} {
　　background-image: url("/image/#{$member}.jpg");
　}
}
```

# 自定义函数 `@function`
```
// 定义
@function double(fn) {
  @return $n * 2;
}

// 调用
#sidebar {
  width: double(5px)
}

```

