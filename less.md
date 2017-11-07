
### 变量

- 选择器

- 选择器，URLs，属性，导入语句，变量名
```
// Variables
@mySelector: banner;
@images: "../img";
@themes: "../../src/themes"
@property: color;
@fnord:  "I am fnord.";
@var:    "fnord";


// Usage
@import "@{themes}/tidal-wave.less";

.@{mySelector} {
  background: url("@{images}/white-sand.png");
  @{property}: #0ee;
  
  &:before {
    content: @@var;
  }
}
```

### 父选择器
