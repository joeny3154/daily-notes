var http = require('http')

module.exports = (url = 'http://www.baidu.com/') => new Promise((resolve, reject) => {
  let _c = {}, _range = ['a'.charCodeAt(), 'z'.charCodeAt()]
  for(let i = _range[0]; i <= _range[1]; i ++){
    _c[String.fromCharCode(i)] = 0
  }
  http.get(url, res => {
    res.on('data', data => `${data}`.replace(/[a-z]/ig, i => _c[i.toLowerCase()] ++))
    res.on('end', () => resolve(_c))
  })
})
