import fetch from 'isomorphic-fetch'

export const getNpmInfoByName = (username = 'wanjun1130') => {
  return fetch('http://npm.qutoutiao.net/-/verdaccio/packages')
    .then(function(response) {
      if (response.status >= 400) {
          throw new Error("Bad response from server")
      }
      return response.json()
    })
    .then(function(json) {
      if (typeof username !== 'undefined') {
        let data = json.find(item => item.author.name === username)
        return (data || {})
      }
      return json
    })
}

export const getNpmInfo = username => {
  return fetch('http://npm.qutoutiao.net/-/verdaccio/packages')
    .then(function(response) {
      if (response.status >= 400) {
          throw new Error("Bad response from server")
      }
      return response.json()
    })
}