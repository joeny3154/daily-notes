https://www.zhihu.com/question/36593766


原理大概是：
DOM中加入一个隐藏的textarea；
把要复制的文本写入textarea中；
用textarea.select()选中文本，然后调用document.execCommand('Copy')；
删除textarea。

``` js
const execCopy = function (value, cb = copyHandler) {
  const tempInput = document.createElement('textarea')
  tempInput.style = 'position: absolute left: -1000px top: -1000px'
  tempInput.value = value
  document.body.appendChild(tempInput)
  tempInput.select()
  try {
    const isSuccess = document.execCommand('copy')
    if (isSuccess) {
      cb && cb(value)
    } else {
      showMessageDialog('error', '复制失败，请手动复制')
    }
  } catch (e) {
    showMessageDialog('error', '复制功能无法使用，请手动复制')
  }
  document.body.removeChild(tempInput)
}
```