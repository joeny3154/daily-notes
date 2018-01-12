
const charStat = (url = 'http://www.baidu.com/') => new Promise((resolve, reject) => {
  let _html = '', _c = {}
  http.get(url, res => {
    res.on('data', data => _html += data)
    res.on('end', () => {
      let _range = ['a'.charCodeAt(), 'z'.charCodeAt()]
      for(let i = _range[0]; i <= _range[1]; i ++){
        let _alp = String.fromCharCode(i)
        _c[_alp] = _html.match(new RegExp(_alp, 'ig')).length
      }
      resolve(_c)
    })
  })
})
