正则表达式
==========

### 参考文献

-	[阮一峰 RegExp对象](http://javascript.ruanyifeng.com/stdlib/regexp.html)

-	[廖雪峰 RegExp](http://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434499503920bb7b42ff6627420da2ceae4babf6c4f2000)

正则表达式 vs 字符串

正则表达式用自己的字符规则来描述字符串字符；正则表达式是对字符串的匹配。

正则表达式可以被用于RegExp的exec和test方法以及 String的match、replace、search和split方法。

学习过程中可使用(正则表达式工具)[chrome-extension://pkgccpejnmalmdinmhkkfafefagiiiad/template/fehelper_regexp.html]进行测试

### 创建一个正则对象

新建正则表达式有两种方法： 1.字面量， 2. 构造函数。

**字面量：** 使用斜杠表示开始和结束

```
var reg = /xyz/
```

**构造函数：** 可添加两个参数

> RegExp(pattern [, flags])

pattern ：正则表达式文本；

flag：修饰符,选填，该参数可以是下面几个值的任意组合：

-	g：全局匹配
-	i：忽略大小写
-	m：让开始和结束字符（^ 和 $）工作在多行模式（也就是，^ 和 $ 可以匹配字符串中每一行的开始和结束（行是由 \n 或 \r 分割的），而不只是整个输入字符串的最开始和最末尾处。
-	u：Unicode。将模式视为Unicode码位（code points）序列。

```
var reg = new RegExp("xyz","i")
```

**注意：** 使用构造函数创建正则对象时，表达式文本中如使用`特殊字符`需要使用`\`进行转义；

比如：

```
// 两者等价
 var re = new RegExp("\\w+");
 var re = /\w+/;
```

**说明：** 正则表达式中字符`\w`表示任意来自基本拉丁字母表中的字母、数字字符，相当于可匹配于0~9、a~z、A~Z 所有字符；但字符串表达式中`\`也是特殊字符，需要进行转义`\`进行转义，所以`\w`中的斜杠也需要转义，所以需要添加两个斜杠：`\\w`；第1个斜杠是字符串表达式中对第二个斜杠进行转义

**两种创建正则表达式方式的区别：**

在运行时有一个细微的区别。采用字面量的写法，正则对象在代码载入时（即编译时）生成；采用构造函数的方法，正则对象在代码运行时生成。 考虑到书写的便利和直观，实际应用中，基本上都采用字面量的写法。

### 特殊字符

正则表达式中的特殊字符主要有以下几种：

-	字符类（Character Classes）
-	字符集合（Character Sets）
-	边界（Boundaries）
-	分组（grouping）与反向引用（back references）
-	数量词（Quantifiers）

**下面依次讲解：**

###　字符类

大部分字符在正则表达式中，就是字面的含义，比如/a/匹配a，/b/匹配b。如果在正则表达式之中，某个字符只表示它字面的含义（就像前面的a和b）。

如果多个字符都符合匹配要求：比如1,2,3都符合，将使用到`字符集合`

### 字符集合

`[xyz]`：一个字符集合，也叫字符组。可匹配集合中的任意一个字符；

`[^xyz]`：个反义或补充字符集，也叫反义字符组。也就是说，它匹配任意不在括号内的字符。你也可以通过使用连字符 '-' 指定一个范围内的字符，下面马上讲到。例如，

[^abc] 等价于 [^a-c]。 第一个匹配的是 "bacon" 中的'o' 和 "chop" 中的 'h'。

```
var reg = /[^a-c]/
reg.exec("bacon"); //[ 'o', index: 3, input: 'bacon' ]
```

**两个字符在字符类中有特殊含义:**

1.**连字符**：对于连续序列的字符，连字符（-）用来提供简写形式，表示字符的连续范围；`[abc]`可以写成`[a-c]`，`[0123456789]`可以写成`[0-9]`，同理`[A-Z]`表示26个大写字母。

2.**脱字符**：表示除了字符类之中的字符，其他字符都可以匹配。例如

```
/a-z/.test('b') // false
/[a-z]/.test('b') // true
```

[^xyz]表示除了x、y、z之外都可以匹配。 匹配多行中的字符集，可使用[^]，它将会匹配任意字符，包括换行符 而点号`.`是不包括换行符的。

```
var s = 'Please yes\nmake my day!';
s.match(/yes.*day/) // null
s.match(/yes[^]*day/) // [ 'yes\nmake my day']
```

每次写`/[0-9a-cA-Z][a-z]/`这样的表达式，一个字符就要写这么长串，如何解决，这里就可以使用到**字符类**

### 字符类

-	`.`：点号，小数点）匹配任意单个字符，但是换行符除外，包括：`\n`,`\r`,`\u2028` 或 `\u2029` -

> \d 匹配0-9之间的任一数字，相当于[0-9]。
>
> \D 匹配所有0-9以外的字符，相当于[^0-9]。
>
> \w 匹配任意的字母、数字和下划线，相当于[A-Za-z0-9_]。
>
> \W 除所有字母、数字和下划线以外的字符，相当于[^A-Za-z0-9_]。
>
> \s 匹配空格（包括制表符、空格符、断行符等），相等于\[\t\r\n\v\f]。
>
> \S 匹配非空格的字符，相当于[^\t\r\n\v\f]。
>
> \b 匹配词的边界。
>
> \B 匹配非词边界，即在词的内部。

其他特殊字符

> \cX 表示Ctrl-[X]，其中的X是A-Z之中任一个英文字母，用来匹配控制字符。
>
> \[\b] 匹配退格键(U+0008)，不要与\b混淆。
>
> \n 匹配换行键。
>
> \r 匹配回车键。
>
> \t 匹配制表符tab（U+0009）。
>
> \v 匹配垂直制表符（U+000B）。
>
> \f 匹配换页符（U+000C）。
>
> \0 匹配null字符（U+0000）。
>
> \xhh 匹配一个以两位十六进制数（\x00-\xFF）表示的字符。
>
> \uhhhh 匹配一个以四位十六进制数（\u0000-\uFFFF）表示的unicode字符。

### 量词

1.精准量词

> x(?=y) ：只有当 x 后面紧跟着 y 时，才匹配 x。
>
> x(?!y)：只有当 x 后面不是紧跟着 y 时，才匹配 x。
>
> x|y ：匹配 x 或 y。
>
> x{n} ：n 是一个正整数。前面的模式 x 连续出现 n 次时匹配。
>
> x{n,} ：n 是一个正整数。前面的模式 x 连续出现至少 n 次时匹配。
>
> x{n,m} ：n 和 m 为正整数。前面的模式 x 连续出现至少 n 次，至多 m 次时匹配。

2.模糊量词

> ? 问号表示某个模式出现0次或1次，等同于{0, 1}。
>
> \* 星号表示某个模式出现0次或多次，等同于{0,}。
>
> \+ 加号表示某个模式出现1次或多次，等同于{1,}。

```
// t出现0次或1次
/t?est/.test('test') // true
/t?est/.test('est') // true

// t出现1次或多次
/t+est/.test('test") // true
/t+est/.test('ttest') // true
/t+est/.test('est') // false

// t出现0次或多次
/t*est/.test('test') // true
/t*est/.test('ttest') // true
/t*est/.test('tttest') // true
/t*est/.test('est') // true

/lo{2}k/.test('look') // true
/lo{2, 5}k/.test('looook') // true
```

### 边界

> ^ ： 匹配输入/字符串的开始。如果多行（multiline）标志被设为 true，该字符也会匹配一个断行（line break）符后的开始处。

例如，/^A/ 不匹配 "an A" 中的 "A"，但匹配 "An A" 中的 "A"。

> $ ： 匹配输入/字符串的结尾。如果多行（multiline）标志被设为 true，该字符也会匹配一个断行（line break）符的前的结尾处。

例如，/t$/ 不匹配 "eater" 中的 "t"，但匹配 "eat" 中的 "t"。

> \b ： 匹配一个零宽单词边界（zero-width word boundary），如一个字母与一个空格之间。 （不要和 \[\b] 混淆）

例如，/\bno/ 匹配 "at noon" 中的 "no"，/ly\b/ 匹配 "possibly yesterday." 中的 "ly"。

> \B ： 匹配一个零宽非单词边界（zero-width non-word boundary），如两个字母之间或两个空格之间。

例如，/\Bon/ 匹配 "at noon" 中的 "on"，/ye\B/ 匹配 "possibly yesterday." 中的 "ye"。

### 分组

> (x)  
> 匹配 x 并且捕获匹配项。 这被称为捕获括号（capturing parentheses）。

例如，/(foo)/ 匹配且捕获 "foo bar." 中的 "foo"。被匹配的子字符串可以在结果数组的元素 [1], ..., [n] 中找到，或在被定义的 RegExp 对象的属性 $1, ..., $9 中找到。

捕获组（Capturing groups）有性能惩罚。如果再次访问被匹配的子字符串，最好使用非捕获括号（non-capturing parentheses），见下面。

> \n  
> n 是一个正整数。一个反向引用（back reference），指向正则表达式中第 n 个括号（从左开始数）中匹配的子字符串。

例如，/apple(,)\sorange\1/ 匹配 "apple, orange, cherry, peach." 中的 "apple,orange,"。一个更全面的例子在该表格下面。

> (?:x) 匹配 x 不会捕获匹配项。这被称为非捕获括号（non-capturing parentheses）。匹配项不能够从结果数组的元素 [1], ..., [n] 或已被定义的 RegExp 对象的属性 $1, ..., $9 再次访问到。

### 贪婪模式

正则匹配默认是贪婪匹配，也就是匹配尽可能多的字符,匹配直到下一个字符不满足匹配规则为止;

全局匹配可以多次执行exec()方法来搜索一个匹配的字符串。当我们指定g标志后，每次运行exec()，正则表达式本身会更新lastIndex属性，表示上次匹配到的最后索引：

全局匹配类似搜索，因此不能使用/^...$/，那样只会最多匹配一次。

### 修饰符

1.g修饰符

默认情况下，第一次匹配成功后，正则对象就停止向下匹配了。g修饰符表示全局匹配（global），加上它以后，正则对象将匹配全部符合条件的结果，主要用于搜索和替换。

正则模式不含g修饰符，每次都是从字符串头部开始匹配。所以，连续做了三次匹配，都返回true。

```
var regex = /b/;
var str = 'abba';

regex.test(str); // true
regex.test(str); // true
regex.test(str); // true
```

正则模式含有g修饰符，每次都是从上一次匹配成功处，开始向后匹配。因为字符串“abba”只有两个“b”，所以前两次匹配结果为true，第三次匹配结果为false。

```
var regex = /b/g;
var str = 'abba';

regex.test(str); //ture
regex.test(str); //ture lastIndex
regex.test(str); //false

```

### 组匹配

正则表达式的括号表示分组匹配，括号中的模式可以用来匹配分组的内容。

```
console.log(/rose{2,}/.test("roseee"));  //true
console.log(/(rose){2,}/.test("roseee"));  //false
console.log(/(rose){2,}/.test("roserose"));  //true
console.log(/(rose){2,}/.test("roserose"));  //true
```

说明：第一个模式没有括号，结果`{2,}`只表示重复字母d，第二个模式有括号，结果`{2,}`就表示匹配“rose”这个词。

分组捕获的例子:

1.捕获组

2.非捕获组

### String
