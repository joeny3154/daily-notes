var { validater, getMyNpmInfo, charStat } = require('./index.js')
// console.time('charStat')
charStat('http://www.sina.com.cn/').then(json => console.log('json=>', json))
