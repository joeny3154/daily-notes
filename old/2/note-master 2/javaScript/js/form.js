// 未完结

// var md5_pwd = toMD5('574335215'); //toMD5需要自定义
// console.log(md5_pwd);


// 提交表单
//方式一是通过<form>元素的submit()方法提交一个表单，例如，响应一个<button>的click事件，在JavaScript代码中提交表单：

/* <form id="test-form">
    <input type="text" name="test">
    <button type="button" onclick="doSubmitForm()">Submit</button>
</form>

<script>
function doSubmitForm() {
    var form = document.getElementById('test-form');
    // 可以在此修改form的input...
    // 提交form:
    form.submit();
}
</script>*/

console.log('第二种方式是响应<form>本身的onsubmit事件，在提交form时作修改：')

// <!-- HTML -->
// <form id="test-form" onsubmit="return checkForm()">
//     <input type="text" name="test">
//     <button type="submit">Submit</button>
// </form>
//
// <script>
// function checkForm() {
//     var form = document.getElementById('test-form');
//     // 可以在此修改form的input...
//     // 继续下一步:
//     return true;
// }
// </script>


//提交表单时不传输明文口令，而是口令的MD5
//直接修改：口令框的显示会突然从几个*变成32个*因为MD5有32个字符）。

//利用<input type="hidden">实现
// 把用户输入的明文变为MD5:
    // md5_pwd.value = toMD5(input_pwd.value);
    // // 继续下一步:
    // return true;
