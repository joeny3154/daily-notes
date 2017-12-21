var { validater, getMyNpmInfo } = require('./index.js')

getMyNpmInfo().then(json => console.log('json=>', json))