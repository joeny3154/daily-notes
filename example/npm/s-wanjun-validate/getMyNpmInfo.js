const fetch = require('isomorphic-fetch')
const USER_NAME = "wanjun1130"

function getMyNpmInfo() {
  return fetch('http://npm.qutoutiao.net/-/verdaccio/packages')
    .then(function(response) {
      if (response.status >= 400) {
          throw new Error("Bad response from server")
      }
      return response.json()
    })
    .then(function(json) {
        let data = json.find(item => item.author.name === USER_NAME)
        return (data || {})
    })
}

module.exports = getMyNpmInfo

// getMyNpmInfo().then(json => console.log('json==>', json))