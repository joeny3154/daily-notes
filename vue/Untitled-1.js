




var add = (function () {
  var arr = []
  return function _add(val) {
    var len = arguments.length
    if (len === 0) {
      return arr.reduce((a, b) => {
        return a + b
      }, 0)
    } else {
      arr.push(val)
      return _add
    }
  }
})()

console.log(add(1)(2)(3)(4)(5)())