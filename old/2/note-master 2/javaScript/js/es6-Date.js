'use strict';

var now = new Date();
console.log(now);//2016-09-18T02:55:26.288Z
console.log(now.getFullYear());//年 2016
console.log(now.getMonth());//月 8
console.log(now.getDate());//日/号 18
console.log(now.getDay());//星期 0
console.log(now.getHours());//小时 10
console.log(now.getMinutes());//分 55
console.log(now.getSeconds());// 秒 26
console.log(now.getMilliseconds()); // 毫秒数 288
console.log(now.getTime());//以number形式表示的时间戳  1474167326288


//注意： JavaScript的月份范围用整数表示是0~11，0表示一月，1表示二月……，所以要表示6月，我们传入的是5

console.log("创建一个指定日期和时间的Date对象，可以用：")
//方法1：
var d1 = new Date(2016,8,18,11,2,999);
console.log("方法1： " + d1); //方法1： Sun Sep 18 2016 11:18:39 GMT+0800 (中国标准时间)

//方法2：
var d2 = new Date(1474167326288);
console.log("方法2： " + d2);// 方法2： Sun Sep 18 2016 10:55:26 GMT+0800 (中国标准时间)


var d = new Date(1435146562875);
d.toLocaleString(); // '2015/6/24 下午7:49:22'，本地时间（北京时区+8:00），显示的字符串与操作系统设定的格式有关
d.toUTCString(); // 'Wed, 24 Jun 2015 11:49:22 GMT'，UTC时间，与本地时间相差8小时


console.log("\nJavaScript中如何进行时区转换?");
//只要我们传递的是一个number类型的时间戳，我们就不用关心时区转换。任何浏览器都可以把一个时间戳正确转换为本地时间。
console.log("\n什么事时间戳:");
// 时间戳是一个自增的整数，它表示从1970年1月1日零时整的GMT时区开始的那一刻，到现在的毫秒数。假设浏览器所在电脑的时间是准确的，那么世界上无论哪个时区的电脑，它们此刻产生的时间戳数字都是一样的，所以，时间戳可以精确地表示一个时刻，并且与时区无关。
//
// 所以，我们只需要传递时间戳，或者把时间戳从数据库里读出来，再让JavaScript自动转换为当地时间就可以了。

console.log("\n获取事件戳:");
if(Date.now){
  console.log("// 老版本IE没有now()方法")
  console.log(Date.now());
}else{
  console.log(new Date().getTime());
}
