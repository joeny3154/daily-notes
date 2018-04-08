XSS：跨站脚本攻击

它允许用户将恶意代码植入到提供给其他用户使用的页面中，可以简单的理解为一种javascript代码注入。

##### XSS的防御措施：

- 过滤转义输入输出

- 避免使用eval、new Function等执行字符串的方法，除非确定字符串和用户输入无关

- 使用`cookie`的`httpOnly`属性，加上了这个属性的cookie字段，js是无法进行读写的

- 使用`innerHTML`、`document.write`的时候，如果数据是用户输入的，那么需要对象关键字符进行过滤与转义

### 如何转义？

1. HTML 特殊字符 转义

``` js
function encodeHTML (a) {
  return String(a)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};
```

那么有哪些字符需要转义呢？这里列了一些常见的。

```
" --> &#34;
# --> &#35;
$ --> &#36;
& --> &#38;
' --> &#39;
( --> &#40;
) --> &#41;
; --> &#59;
< --> &#60;
> --> &#62;
```

`<p>my name is&#58;&#32;<a href="http&#58;&#47;&#47;www.jchen.cc">名一</a></p>`

经过浏览器解码就变成

`<p>my name is: <a href="http://www.jchen.cc">名一</a></p>`

这里要说的是，浏览器只会对两个地方解码，一个是标签的内容（即 textContent，除了 <script> 和 <style> 标签），另一个是标签的属性值。对于属性名是不会解码的。

2. url 转义

- `encodeURI`

`encodeURI` 是不会转义 :, /, ?, &, = 这些在 URL 中有特殊含义的字符的，那么如果有个参数正好包含了这些字符，就不会转义，比如

``` js
encodeURI('http://jchen.cc/login?name=名一&from=http://other.com'); 
// -> http://jchen.cc/login?name=%E5%90%8D%E4%B8%80&from=http://other.com
```
from 参数的值并没有转义，这时候，就需要用到另一个方法 `encodeURIComponent`

- `encodeURIComponent`

``` js
var param = encodeURIComponent('http://other.com');
encodeURI('http://jchen.cc/login?name=名一&from=') + param;
// -> http://jchen.cc/login?name=%E5%90%8D%E4%B8%80&from=http%3A%2F%2Fother.com
```

所以结论就是，如果要对整个 URL 进行转义，使用 `encodeURI`，如果对参数的值进行转义，使用 `encodeURIComponent`。

当动态生成的链接地址需要赋值给 href 或者 src 属性时，需要对这些地址进行 URL 转义。当然，如果服务端支持在 URL 中包含 UTF-8 的字符的话，其实不转义也不会错，这就是为什么我们平时不会太注意对表单和 URL 参数进行转义的原因，因为服务端表现良好。

3. js 转义

JS 中的转义都是通过反斜杠完成，有三种类型，以 ' 和 " 为例

直接反斜杠 --> \'\"

十六进制 --> \x22\x27

Unicode --> \u0022\u0027


https://segmentfault.com/a/1190000003874852