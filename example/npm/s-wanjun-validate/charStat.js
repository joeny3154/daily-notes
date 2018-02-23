// var http = require('http')
const fetch = require('isomorphic-fetch')

module.exports = (url = 'http://www.baidu.com/') => {
  return fetch(url)
    .then( response => response.text())
    .then( html => {
      // console.time('ms')
      let _c = 'abcdefghijklmnopqrstuvwxyz'.split('').reduce((a, b) => (a[b] = 0, a), {})
      for(let i = 0, l = html.length; i < l; i ++){
          let l = html[i], c = l.charCodeAt(0)
          if ( c >= 97 && c <= 122 ){
            _c[l] += 1
          }else if(c >= 65 && c <= 90){
            _c[l.toLowerCase()] += 1
          }
      }
      // console.timeEnd('ms')
      return _c
    })
}
