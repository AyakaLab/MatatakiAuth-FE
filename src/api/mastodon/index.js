import Axios from 'axios'

// const MATATAKI_AUTH_API = 'https://auth.matataki.io/api'
// const MATATAKI_AUTH_API_TEST = 'https://auth.matataki.io/apitest'

const Mastodon = {
  async isMastodonInstance (url) {
    let instanceData
    try {
      instanceData = (await Axios.get('http://' + url + '/api/v1/instance')).data
    } catch {
      instanceData = (await Axios.get('https://' + url + '/api/v1/instance')).data
    }
    return instanceData
  }
}

export default Mastodon
