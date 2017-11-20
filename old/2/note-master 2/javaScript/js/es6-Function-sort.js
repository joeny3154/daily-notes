// sort 排序算法
//字符串根据ASCII码进行排序，而小写字母a的ASCII码在大写字母之后
// Array的sort()方法默认把所有元素先转换为String再排序

//最后友情提示，sort()方法会直接对Array进行修改，它返回的结果仍是当前Array
var a1 = ['B', 'A', 'C'];
var a2 = a1.sort();
console.log(a1); // ['A', 'B', 'C']
console.log(a2); // ['A', 'B', 'C']
console.log(a1 === a2); // true, a1和a2是同一对象

//  按数字大小排序
var arr = [10, 20, 1, 2];
arr.sort(function (x, y) {
    if (x < y) {
        return -1;
    }
    if (x > y) {
        return 1;
    }
    return 0;
}); // [1, 2, 10, 20]

// 倒序
var arr = [10, 20, 1, 2];
arr.sort(function (x, y) {
    if (x < y) {
        return 1;
    }
    if (x > y) {
        return -1;
    }
    return 0;
}); // [20, 10, 2, 1]
