// JSON是JavaScript Object Notation的缩写，它是一种数据交换格式。


//在JSON中，一共就这么几种数据类型


// number：和JavaScript的number完全一致；
// boolean：就是JavaScript的true或false；
// string：就是JavaScript的string；
// null：就是JavaScript的null；
// array：就是JavaScript的Array表示方式——[]；
// object：就是JavaScript的{ ... }表示方式。


console.log("JSON的字符串规定必须用双引号，Object的键也必须用双引号");


// 在JavaScript中，我们可以直接使用JSON，因为JavaScript内置了JSON的解析。


// 序列化 对象序列化成JSON格式的字符串
console.log("序列化:JOSN.Stringify");
// 在JSON中，一共就这么几种数据类型：
//
// number：和JavaScript的number完全一致；
// boolean：就是JavaScript的true或false；
// string：就是JavaScript的string；
// null：就是JavaScript的null；
// array：就是JavaScript的Array表示方式——[]；
// object：就是JavaScript的{ ... }表示方式。
// 以及上面的任意组合。

// 并且，JSON还定死了字符集必须是UTF-8，表示多语言就没有问题了。

//为了统一解析，JSON的字符串规定必须用双引号""，Object的键也必须用双引号"",。

// 序列化
//
// 让我们先把小明这个对象序列化成JSON格式的字符串：

var xiaoming = {
    name: '小明',
    age: 14,
    gender: true,
    height: 1.65,
    grade: null,
    'middle-school': '\"W3C\" Middle School',
    skills: ['JavaScript', 'Java', 'Python', 'Lisp']
};

var j = JSON.stringify(xiaoming, null, ' ');
console.log(j)
    // 第一个参数 ： 需要序列化的对象

//第二个参数：用于控制如何筛选对象的键值，如果我们只想输出指定的属性，
//1.可以传入Array：
var xiaoming = {
    name: '小明',
    age: 14,
    gender: true,
    height: 1.65,
    grade: null,
    'middle-school': '\"W3C\" Middle School',
    skills: ['JavaScript', 'Java', 'Python', 'Lisp']
};
var j1 = JSON.stringify(xiaoming, ['name', 'skills'], '  ');
console.log(j1);
//2.可以传入一个函数，这样对象的每个键值对都会被函数先处理
function convert(key, value) {
    if (typeof value === 'string') {
        return value.toUpperCase();
    }
    return value;
}

var j2 = JSON.stringify(xiaoming, convert, '  ');

// 3.精确控制如何序列化小明，可以给xiaoming定义一个toJSON()的方法，直接返回JSON应该序列化的数据
var _xiaoming = {
    name: '小明',
    age: 14,
    gender: true,
    height: 1.65,
    grade: null,
    'middle-school': '\"W3C\" Middle School',
    skills: ['JavaScript', 'Java', 'Python', 'Lisp'],
    toJSON: function() {
        return { // 只输出name和age，并且改变了key：
            'Name': this.name,
            'Age': this.age
        };
    }
};

var j3 = JSON.stringify(_xiaoming);
console.log(j3);

// 第三个参数 ：
//  输出得好看一些，按缩进输出：
var j_tap = JSON.stringify(xiaoming, null, '  ');
console.log(j_tap);


///反序列化 JSON格式的字符串，我们直接用JSON.parse()把它变成一个JavaScript对象

//可以接收一个函数，用来转换解析出的属性
var o = JSON.parse('{"name":"xiaoming","age":14}', function(key, value) {
    if (key == 'name') {
        return value + '同学';
    }
    return value;
})
console.log(o);//{ name: 'xiaoming同学', age: 14 }
