// filter
// 用于把Array的某些元素过滤掉，然后返回剩下的元素。

//filter()把传入的函数依次作用于每个元素，然后根据返回值是true还是false决定保留还是丢弃该元素。true 留下

// 保留偶数
var arr_1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var r_1 = arr_1.filter(function(x) {
    return x % 2 === 0;
})
r_1.forEach(function(ele, index, arr) {
    console.log(ele); //2,4,6,8
})

//空字符串删掉
var arr = ['A', '', 'B', null, undefined, 'C', '  '];
var r = arr.filter(function(s) {
    return s && s.trim(); // 注意：IE9以下的版本没有trim()方法
});
r.forEach(function(ele, index, arr) {
    console.log(ele); //A B c
})
