String.prototype.replace()
========

字符串对象的replace方法可以替换匹配的值。它接受两个参数，第一个是搜索模式，第二个是替换的内容。

# 参数1： 搜索模式

**搜索模式如果不加g修饰符，就替换第一个匹配成功的值，否则替换所有匹配成功的值**

```
'aaa'.replace('a', 'b') // "baa"
'aaa'.replace(/a/, 'b') // "baa"
'aaa'.replace(/a/g, 'b') // "bbb"
```

# 参数2： 替换内容 & 替换函数

- replace方法的第二个参数可以使用美元符号`$`，用来指代所替换的内容。

> `$&`: 指代匹配的子字符串。
>
> $`: 指代匹配结果前面的文本。
>
> `$'`: 指代匹配结果后面的文本。
>
> `$n`: 指代匹配成功的第n组内容，n是从1开始的自然数。
>
> `$$`: 指代美元符号$。

```
'hello world'.replace(/(\w+)\s(\w+)/, '$2 $1')

'abc'.replace('b', '[$`-$&-$\']')
// "a[a-b-c]c"
```

- 替换函数

replace方法的第二个参数还可以是一个函数，将每一个匹配内容替换为 函数返回值

eg: 

```
'3 and 5'.replace(/[0-9]+/g, function(match) {
  return match * 2
})
// "6 and 10"

var a = 'The quick brown fox jumped over the lazy dog.';
var pattern = /quick|brown|lazy/ig;

a.replace(pattern, function replacer(match) {
  return match.toUpperCase();
});
// The QUICK BROWN fox jumped over the LAZY dog.
```

**替换函数，可以接受多个参数**

第一个参数是捕捉到的内容，
第二个参数是捕捉到的组匹配（有多少个组匹配，就有多少个对应的参数）。

此外，最后还可以添加两个参数，倒数第二个参数是捕捉到的内容在整个字符串中的位置（比如从第五个位置开始），最后一个参数是原字符串。


```
var prices = {
  'pr_1': '$1.99',
  'pr_2': '$9.99',
  'pr_3': '$5.00'
}
  
var template = `
<span id="pr_1"></span>
<span id="pr_2"></span>
<span id="pr_3"></span>`

<!-- 有四个括号，所以会产生四个组匹配，在匹配函数中用$1到$4表示 -->

template.replace(
  /(<span id=")(.*?)(">)(<\/span>)/g,
  function(match, $1, $2, $3, $4){
    return $1 + $2 + $3 + prices[$2] + $4
  }
)

```

```
function generateHtml(list) {
    var temp = `<tr>
                  <td>$nickname</td>
                  <td><button data-id="$member_id" class="btn btn-danger btn-summon $view">$txt</button></td>
                </tr>
    var html = [];

    list = list || []

    list.forEach(function (item) {
        if (item.need_awaken == 0) return
        html.push(
            temp
              .replace(/\$nickname/g, item.name || item.nickname || item.telephone)
              .replace(/\$telephone/g, item.telephone)
              .replace(/\$member_id/g, item.member_id)
              .replace(/\$view/g, item.need_awaken != 1 ? 'view' : '')
              .replace(/\$txt/g, item.need_awaken == -1 ? 'Selengkapnya' : 'Remind')
          )
    });
    return html.join('')
}
```