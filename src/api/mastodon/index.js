import Axios from 'axios'

const MATATAKI_AUTH_API = 'https://auth.matataki.io/api'
// const MATATAKI_AUTH_API_TEST = 'https://auth.matataki.io/apitest'
const MATATAKI_AUTH_API_TEST = 'http://127.0.0.1:8083'

const instanceModel = {
  uri: '',
  title: '',
  short_description: '',
  description: '',
  email: '',
  version: '',
  urls: {},
  stats: {},
  thumbnail: '',
  languages: [],
  registrations: false,
  approval_required: false,
  invites_enabled: false,
  contact_account: {}
}

const instanceKeys = Object.keys(instanceModel).sort()

const Mastodon = {
  async isMastodonInstance (url) {
    // eslint-disable-next-line no-unused-vars
    let instanceResData
    try {
      instanceResData = (await Axios.get(url + '/api/v1/instance')).data
    } catch {
      try {
        instanceResData = (await Axios.get(url + '/api/v1/instance')).data
      } catch {
        return false
      }
    }
    const instanceResKeys = Object.keys(instanceResData).sort()
    return JSON.stringify(instanceKeys) === JSON.stringify(instanceResKeys)
  },
  async getOAuthToken (token) {
    return (await Axios.get(MATATAKI_AUTH_API + '/mastodon/oauth/token', { headers: { Authorization: `Bearer ${token}` } })).data
  },
  async getOAuthTokenTest (token) {
    return (await Axios.get(MATATAKI_AUTH_API_TEST + '/mastodon/oauth/token', { headers: { Authorization: `Bearer ${token}` } })).data
  }
}

export default Mastodon
