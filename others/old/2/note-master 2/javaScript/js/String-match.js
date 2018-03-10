//String-match()

var str="1 plus 2 equal 3"
//参数：要匹配的模式的 RegExp 对象
console.log(str.match(/\d+/g)); 	//	[ '1', '2', '3' ]
console.log(str.match(/\d+/)); 	//	[ '1', index: 0, input: '1 plus 2 equal 3' ]
//参数：要检索的字符串值
console.log(str.match('u')); 	//	[ 'u', index: 4, input: '1 plus 2 equal 3' ]

var _str="String-match.js";
//无全局标志 g 
	//数组的第 0 个元素存放的是匹配文本，而其余的元素存放的是 与正则表达式的[子表达式]匹配的文本。
	//两个对象属性:index 属性声明的是匹配文本的起始字符在 stringObject 中的位置，input 属性声明的是对 stringObject 的引用
console.log(_str.match(/(.+)\.js$/)); //[ 'String-match.js',  'String-match',  index: 0,  input: 'String-match.js' ]
//全局标志 g 
	//在全局检索模式下，match() 即不提供与子表达式匹配的文本的信息，也不声明每个匹配子串的位置。如果您需要这些全局检索的信息，可以使用 RegExp.exec()。
console.log(_str.match(/(.+)\.js$/g)); //[ 'String-match.js' ]

//RegExp.exec()
var reg=/(.+)\.js$/;
console.log(reg.exec(_str));// [ 'String-match.js',  'String-match',  index: 0,  input: 'String-match.js' ]








