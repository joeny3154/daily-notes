

// 1.RegExp对象的test()方法用于测试给定的字符串是否符合条件。
var re1 = /^\d{3}\-\d{3,8}$/;
console.log(re1.test("010-12345")); // true
console.log(re1.test("010-1234x")); // false
console.log(re1.test("010 12345")); //false


//2.用正则表达式切分字符串
var arr1 = 'a b   c'.split("");
console.log(arr1);  //[ 'a', ' ', 'b', ' ', ' ', ' ', 'c' ]
var arr2 = 'a b   c'.split(/\s+/);
console.log(arr2);  //[ 'a', 'b', 'c' ]
var arr3 = 'a,b, c  d'.split(/[\s\,]+/);
console.log(arr3);  //[ 'a', 'b', 'c', 'd' ]
var arr4 = 'a;;b, c  d'.split(/[\s\;\,]+/);
console.log(arr4);  //[ 'a', 'b', 'c', 'd' ]

// 3.分组：
// 除了简单地判断是否匹配之外，正则表达式还有提取子串的强大功能。用()表示的就是要提取的分组（Group）

var re3 = /^(\d{3})\-(\d{3,8})$/;
var arr3_1 =  re3.exec("010-12345");
console.log(arr3_1); //  [ '010-12345', '010', '12345', index: 0, input: '010-12345' ]
var arr3_2 =  re3.exec("010 12345");
console.log(arr3_2); //  null
// 如果正则表达式中定义了组，就可以在RegExp对象上用exec()方法提取出子串来。
// exec()方法在匹配成功后，会返回一个Array，第一个元素是正则表达式匹配到的整个字符串，后面的字符串表示匹配成功的子串。
// exec()方法在匹配失败时返回null。
var re3_3 =/^(0[0-9]|1[0-9]|2[0-3]|[0-9])\:(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|[0-9])\:(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|[0-9])$/;
var arr3_3 = re3_3.exec("19:05:30");
console.log(arr3_3);  //  [ '19:05:30', '19', '05', '30', index: 0, input: '19:05:30' ]

// 4.贪婪匹配 正则匹配默认是贪婪匹配，也就是匹配尽可能多的字符
var re4_1 = /^(\d+)(0*)$/;
var arr4_1 =re4_1.exec('102300'); //匹配数字后面的零
console.log(arr4_1);// [ '102300', '102300', '', index: 0, input: '102300' ]
//由于\d+采用贪婪匹配，直接把后面的0全部匹配了，结果0*只能匹配空字符串了。
// 必须让\d+采用非贪婪匹配（也就是尽可能少匹配），才能把后面的0匹配出来，加个?就可以让\d+采用非贪婪匹配
var re4_2 =/^(\d+?)(0*)$/;
var arr4_2 = re4_2.exec('102300'); //
console.log(arr4_2);//[ '102300', '1023', '00', index: 0, input: '102300' ]

// 5. 全局搜索 JavaScript的正则表达式还有几个特殊的标志，最常用的是g，表示全局匹配：
// 全局匹配可以多次执行exec()方法来搜索一个匹配的字符串。当我们指定g标志后，每次运行exec()，正则表达式本身会更新lastIndex属性，表示上次匹配到的最后索引

var str5_1= 'JavaScript, VBScript, JScript and ECMAScript';
var re5_1=/[a-zA-Z]+Script/g;
re5_1.exec(str5_1);
console.log(re5_1.lastIndex);//10
re5_1.exec(str5_1);
console.log(re5_1.lastIndex);//20
re5_1.exec(str5_1);
console.log(re5_1.lastIndex);//29
re5_1.exec(str5_1);
console.log(re5_1.lastIndex);//44
re5_1.exec(str5_1);
console.log(re5_1.lastIndex);//0 lastIndex属性重置为0
re5_1.exec(str5_1);
console.log(re5_1.lastIndex);//10

// 利用g修饰符允许多次匹配的特点，可以用一个循环完成全部匹配。

// 全局匹配类似搜索，因此不能使用/^...$/，那样只会最多匹配一次。
//
// 正则表达式还可以指定i标志，表示忽略大小写，m标志，表示执行多行匹配。

// 正则对象的属性和方法
//属性
// 1.ignoreCase：返回一个布尔值，表示是否设置了i修饰符，该属性只读。
// 2.global：返回一个布尔值，表示是否设置了g修饰符，该属性只读。
// 3.multiline：返回一个布尔值，表示是否设置了m修饰符，该属性只读。
// 4.lastIndex：返回下一次开始搜索的位置。该属性可读写，但是只在设置了g修饰符时有意义。
// 5.source：返回正则表达式的字符串形式（不包括反斜杠），该属性只读。
var r = /abc/img
console.log(r.ignoreCase);//true
console.log(r.global);//true
console.log(r.multiline);//true
console.log(r.lastIndex);//0
console.log(r.source);//abc

// 方法
console.log("regexp test()========================");
// 1.test() 返回一个布尔值，表示当前模式是否能匹配参数字符串
var b = /cat/.test('cats and dogs');// 验证参数字符串之中是否包含cat
console.log(b);

console.log("test() 全局匹配模式========================");
// 全局匹配模式
var r = /a/g;
var str = "_a_a";
console.log(r.lastIndex);//0
console.log(r.test(str));//true

console.log(r.lastIndex);//2
console.log(r.test(str));//true

console.log(r.lastIndex);//4
console.log(r.test(str));//false

console.log(r.lastIndex);//0
console.log(r.test(str));//true
//带有g修饰符时，可以通过正则对象的lastIndex属性指定开始搜索的位置
r.lastIndex = 4;
console.log(r.test(str));  // false
//只在设置了g修饰符的情况下，才会有效
var r = /a/;
r.lastIndex = 7; // 无效
var match = r.exec('xaxa');
console.log(match.index); // 1 正则表达式没有g修饰符，所以是无效的。每次匹配都是从字符串的头部开始。
console.log(r.lastIndex); // 7
// 2.exec()
console.log("regexp exec()========================");
// 返回匹配结果。如果发现匹配，就返回一个数组，成员是每一个匹配成功的子字符串，否则返回null。
// 正则表示式包含圆括号（即含有“组匹配”），则返回的数组会包括多个成员。第一个成员是整个匹配成功的结果，后面的成员就是圆括号对应的匹配成功的组。

// exec方法的返回数组还包含以下两个属性：
// input：整个原字符串。
// index：整个模式匹配成功的开始位置（从0开始计数）。

//如果有g修饰符，lastIndex属性就会生效。
// 注意：lastIndex属性只对同一个正则表达式有效，所以下面这样写是错误的

//错误    每次匹配条件都是一个新的正则表达式，导致lastIndex属性总是等于0。
// var count = 0;
// while(/a/g.test("babaa")){
//   count++;
// }
// 错误
console.log(/a(?=b)/g.exec("abab"));//[ 'a', index: 0, input: 'abab' ]
console.log(/a(?=b)/g.exec("abab"));//[ 'a', index: 0, input: 'abab' ]
//正确
var r = /a(?=b)/g;
console.log(r.exec("abab"));//[ 'a', index: 0, input: 'abab' ]
console.log(r.exec("abab"));//[ 'a', index: 2, input: 'abab' ]
//3.修饰符
// 3.1 g修饰符
console.log("=================g修饰符=================");
var r = /b/;
var str = 'abba';
console.log(r.test(str));//true
console.log(r.test(str));//true
console.log(r.test(str));//true
//正则模式不含g修饰符，每次都是从字符串头部开始匹配。所以，连续做了三次匹配，都返回true。

var r = /b/g;
var str = 'abba';
console.log(r.test(str));//true
console.log(r.test(str));//true
console.log(r.test(str));//false

console.log("=================i 修饰符=================");
// 3.2 i修饰符
// 默认情况下，正则对象区分字母的大小写，加上i修饰符以后表示忽略大小写（ignorecase）。
console.log(/abc/.test("ABC"));//false
console.log(/abc/i.test("ABC"));//true


console.log("=================m 修饰符=================");
// m修饰符表示多行模式（multiline），会修改^和$的行为。默认情况下（即不加m修饰符时），^和$匹配字符串的开始处和结尾处，加上m修饰符以后，^和$还会匹配行首和行尾，即^和$会识别换行符（\n）。
console.log(/world$/.test('hello world\n')); // false
console.log(/world$/m.test('hello world\n')); // true
// 字符串结尾处有一个换行符。如果不加m修饰符，匹配不成功，因为字符串的结尾不是“world”；加上以后，$可以匹配行尾。

console.log(/^b/.test('a\nb')); // false
console.log(/^b/m.test('a\nb')); // true
// 上面代码要求匹配行首的b，如果不加m修饰符，就相当于b只能处在字符串的开始处。

console.log("=================组匹配===========");
// 4 组匹配
// 正则表达式的括号表示分组匹配，括号中的模式可以用来匹配分组的内容。

console.log(/rose{2,}/.test("roseee"));  //true
console.log(/(rose){2,}/.test("roseee"));  //false
console.log(/(rose){2,}/.test("roserose"));  //true
console.log(/(rose){2,}/.test("roserose"));  //true
//说明：第一个模式没有括号，结果+只表示重复字母d，第二个模式有括号，结果+就表示匹配“fred”这个词。

console.log("=================分组捕获===========");
//分组捕获
var m = 'abczbc'.match(/(.)b(.)/);
var _m = 'abczbc'.match(/(.)b(.)/g);
console.log(m);//[ 'abc', 'a', 'c', index: 0, input: 'abczbc' ]
console.log(_m);//[ 'abc', 'zbc' ]  //使用组匹配时，不宜同时使用g修饰符，否则match方法不会捕获分组的内容。
// 说明：正则表达式/(.)b(.)/一共使用两个括号，第一个括号捕获a，第二个括号捕获c。
// 注意：使用组匹配时，不宜同时使用g修饰符，否则match方法不会捕获分组的内容。

//在正则表达式内部，可以用\n引用括号匹配的内容，n是从1开始的自然数，表示对应顺序的括号
console.log(/(.)b(.)\1b\2/.test("abcabc"));//true
console.log(/(.)b(.)\1b\2/.test("abcabd"));//false
// 说明：\1表示前一个括号匹配的内容（即“a”），\2表示第二个括号匹配的内容（即“b”）

//括号还可以嵌套
console.log(/y((..)\2)\1/.test("yabababab"));//true
//  说明：1指向外层括号，\2指向内层括号。

//匹配html标签
var tagName = /<([^>]+)>([^<]*)<\/\1>/;
console.log(tagName.exec("<b>bold</b>")[0]);  //<b>bold</b>
console.log(tagName.exec("<b>bold</b>")[1]);  // b
console.log(tagName.exec("<b>bold</b>")[2]);  // bold

//说明 ： 圆括号匹配尖括号之中的标签，而\1就表示对应的闭合标签。

// 捕获带有属性的标签。
var tagName = /<(\w+)\s+([^>]*)>(.*?)<\/\1>/;
var html = '<b class="hello">Hello</b><i>world</i>';
var match = tagName.exec(html);
console.log(match[0]);  // "<b class="hello">Hello</b>"
console.log(match[1]);  // "b"
console.log(match[2]);  // "class="hello""


console.log("==========非捕获组=============");
// 非捕获组
//(?:x)称为非捕获组（Non-capturing group），表示不返回该组匹配的内容，即匹配的结果中不计入这个括号。

// 场景：分组但不想占用组匹配
var r =/(foo){1, 2}/; //
var r =/(?:foo){1, 2}/ ;//不会占用一个组匹配，不会单独输出括号内部的内容

console.log("==========| 或字符=============");
// \ （或）如何使用
  //竖线符号（|）在正则表达式中表示“或关系”（OR），即cat|dog表示匹配cat或dog。
var b = /cat|dog/.test("dog");
console.log(b);// true;
  // 多个选择符可以联合使用。
var b =  /fred|barney|betty/.test("betty");
console.log(b);// true;
  //选择符会包括它前后的多个字符，比如/ab|cd/指的是匹配ab或者cd，而不是指匹配b或者c。如果想修改这个行为，可以使用圆括号。
var b =  /a( |\t)b/.test('a\tb');
console.log(b);// true;
  //说明：a和b之间有一个空格或者一个制表符。

console.log("==========x(?!y) 与 x(?=y) =============");
//x(?!y) 与 x(?=y) 的使用
// 先行断言（Positive look-ahead），x只有在y前面才匹配，y不会被计入返回结果。
//x(?=y) 先行断言
console.log(/\d+(?=%)/.test("100%"));//true
console.log(/\d+(?=%)/.test("100"));//false
// “先行断言”中，括号里的部分是不会返回的。
var r = /a(?=b)/g;
console.log(r.exec("abab"));//[ 'a', index: 0, input: 'abab' ]
console.log(r.exec("abab"));//[ 'a', index: 2, input: 'abab' ]
// 先行否定断言 x只有不在y前面才匹配，y不会被计入返回结果。
console.log(/\d+(?!%)/.test('100'));//true
console.log(/\d{2}(?!%)/.test('100%'));//true
console.log(/\d{3}(?!%)/.test('100%'));//false
//3.14 匹配出小数点后面的部分
console.log(/\d+(?!.)/.exec(3.1415926));//[ '1415926', index: 2, input: '3.1415926' ]
// 说明：“先行否定断言”中，括号里的部分是不会返回的。

console.log("==========String.prototype.match() =============");
// str.search(regexp)

// 参数是一个正则表达式对象。
// 如果传入一个非正则表达式对象，则会使用 new RegExp(obj) 隐式地将其转换为正则表达式对象。

// 字符串的match方法与正则对象的exec方法非常类似：匹配成功返回一个数组，匹配失败返回null。
// 如果正则表达式没有 g 标志，返回和 RegExp.exec(str) 相同的结果。
// 而且返回的数组拥有一个额外的 input 属性，该属性包含原始字符串。
// 还拥有一个 index 属性，该属性表示匹配结果在原字符串中的索引（以0开始）。
// 如果正则表达式包含 g 标志，则该方法返回一个包含所有匹配结果的数组。input 和 index属性不存在；如果需要可使用RegExp.prototype.exec()方法
//如果没有匹配到，则返回 null。

    // 正则表达式 没有g修饰符
var str = 'abab';
var arr =str.match(/a/);
console.log(arr);//[ 'a', index: 0, input: 'abab' ]
console.log(arr.index);//0
console.log(arr.input);//'abab'

var _arr =str.match(/c/);
console.log(str.match(_arr));//null

    // 正则表达式 有g修饰符
    var str = 'abab';
    var arr =str.match(/a/g);
    console.log(arr);//[ 'a', 'a' ]

    var _arr =str.match(/c/g);
    console.log(str.match(_arr));//null

    var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var reg = /[A-E]/gi;
    console.log(str.match(reg));//[ 'A', 'B', 'C', 'D', 'E', 'a', 'b', 'c', 'd', 'e' ]

console.log("==========String.prototype.search() =============");
    // search()  使用
    // 参数是一个正则表达式对象。
    // 如果传入一个非正则表达式对象，则会使用 new RegExp(obj) 隐式地将其转换为正则表达式对象。
    // 如果匹配成功，则 search() 返回正则表达式在字符串中首次匹配项的索引。否则，返回 -1。
console.log("abab".search(/b/));//1
// 说明：第一个匹配结果出现在字符串的1号位置。

// 该方法会忽略g修饰符。
var r = /b/g;
r.lastIndex = 2;//无效
console.log("abab".search(r));//1

console.log("==========String.prototype.replace() =============");
//  replace() 使用
// str.replace(regexp|substr,newSubStr|function)
// 参数：
// regexp (pattern)
// 一个 RegExp 对象。该正则所匹配的内容会被第二个参数的返回值替换掉。
// substr (pattern)
// 一个要被 newSubStr 替换的字符串。
// newSubStr (replacement)
//  用于替换掉第一个参数在原字符串中的匹配部分的 String。该字符串中可以内插一些特殊的变量名。参考下面的使用字符串作为参数。
// function (replacement)
// 一个用来创建新子字符串的函数，该函数的返回值将替换掉第一个参数匹配到的结果。参考下面的指定一个函数作为参数。

// 返回：一个部分或全部匹配由替代模式所取代的新的字符串。

console.log('aaa'.replace("a","b"));//baa
console.log('aaa'.replace(/a/,"b"));//baa
console.log('aaa'.replace(/a/g,"b"));//bbb
//说明：搜索模式如果不加g修饰符，就替换第一个匹配成功的值。
var str = '   replace String.prototype.trim()  ';
console.log(str.replace(/^\s+|\s+$/g,''));//replace String.prototype.trim()
// 说明：该方法并不改变调用它的字符串本身，而只是返回一个新的替换后的字符串。
// 在进行全局的搜索替换时，正则表达式需包含 g 标志

//第二个参数（替换字符串）可以插入下面的特殊变量名：
// $& 插入匹配的子串。
// $` 插入当前匹配的子串左边的内容。
// $' 插入当前匹配的子串右边的内容。
// $n 假如第一个参数是 RegExp对象，并且 n 是个小于100的非负整数，那么插入第 n 个括号匹配的字符串。
// $$ 插入一个 "$"。

//交换位置
console.log('hello world'.replace(/(\w+)\s+(\w+)/,"$2 $1"));    //"world hello"
console.log("123".replace(/2/,"-$$:$'$&$`-"));//1-$:321-3
//指定一个函数作为参数
// $&、$n  等特殊替换参数在这里不能被使用
//参数：
    // match	匹配的子串。（对应于上述的$&。）
    // p1,p2, ...   假如replace()方法的第一个参数是一个RegExp 对象，则代表第n个括号匹配的字符串。（对应于上述的$1，$2等。）
    //index     匹配到的子字符串在原字符串中的索引值。（比如，如果原字符串是“abcd”，匹配到的子字符串时“bc”，那么这个参数将是1）
  //string  被匹配的原字符串

  function replacer(match, p1, p2, p3, index, string) {
  // p1 is nondigits, p2 digits, and p3 non-alphanumerics
  console.log("match:"+match);//'abc12345#$*%
  console.log("p1:"+p1);//abc
  console.log("p2:"+p2);//12345
  console.log("p3:"+p3);//#$*%
  console.log("index:"+index);//3
  console.log("string:"+string);//123abc12345#$*%abc
  return [p1, p2, p3].join(' - ');
}
var newString = '123abc12345#$*%abc'.replace(/([^\d]+)(\d+)([^\w]+)/, replacer);
console.log(newString);//123abc - 12345 - #$*%abc

// 网页模板替换的例子:
var p={
    p1:"$1.99",
    p2:"$2.99",
    p3:"$3.99"
};
var template = '<span id="p1">null</span><b>bold</b><span id="p2">null</span><a>link</a><span id="p3">null</span>';
var newStr = template.replace(/(<span id=")(.*?)(">)(?:[^<]+)(<\/span>)/g,function(match,$1,$2,$3,$4){
    return $1+$2+$3+p[$2]+$4;
});
console.log("newStr:"+newStr);//newStr:<span id="p1">$1.99</span><b>bold</b><span id="p2">$2.99</span><a>link</a><span id="p3">$3.99</span>

console.log("==========String.prototype.split() =============");
// split() 使用
// str.split(separator, [limit])
// 第一个参数是分隔规则，第二个参数是返回数组的最大成员数。
// 非正则分隔
console.log('a,  b,c, d'.split(','));//[ 'a', '  b', 'c', ' d' ]
// 正则分隔，去除多余的空格
console.log('a,  b,c, d'.split(/,\s*/));//[ 'a', 'b', 'c', 'd' ]
// 指定返回数组的最大成员
console.log('a,  b,c, d'.split(/,\s*/, 2));//[ 'a', 'b' ]


console.log('aaa*a*'.split(/a*/));//[ '', '*', '*' ]
// 说明：分割规则是0次或多次的a，由于正则默认是贪婪匹配，所以例一的第一个分隔符是aaa，第二个分割符是a，将字符串分成三个部分，包含开始处的空字符串
console.log('aaa**a*'.split(/a*/));//[ '', '*', '*', '*' ]


// 如果正则表达式带有括号，则括号匹配的部分也会作为数组成员返回。 捕获括号（)
console.log('aaa*a*'.split(/(a*)/));// ['','aaa','*','a','*']
