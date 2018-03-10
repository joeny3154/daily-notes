// 集合类

//map filter

// Array的map()与filter()类似，但是underscore的map()和filter()可以作用于Object。
// 当作用于Object时，传入的函数为function (value, key)，第一个参数接收value，第二个参数接收key

'use strict';

var log = console.log.bind(console);

var obj = {
    name: 'bob',
    school: 'No.1 middle school',
    address: 'xueyuan road'
};


//map/filter

var arr = _.map(obj,function(value,key){
    return value + value;
});
console.log(arr);//["bobbob", "No.1 middle schoolNo.1 middle school", "xueyuan roadxueyuan road"]

// 如果想返回obje
var _obj = _.mapObject(obj,function(value,key){
    return value + value;
});
console.log(_obj);//Object {name: "bobbob", school: "No.1 middle schoolNo.1 middle school", address: "xueyuan roadxueyuan road"}

//filter

var arr = _.filter(obj,function(value,key){})
