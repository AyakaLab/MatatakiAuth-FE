import Axios from 'axios'

const MATATAKIAPI = 'https://api.mttk.net'
const MATATAKIAPITEST = 'https://apitest.mttk.net'
const MTTKIMGCDN = 'https://ssimg.frontenduse.top'

export function getUserProfileTest (uid) {
  return Axios.get(MATATAKIAPITEST + `/user/${uid}`)
}

export function getUserProfile (uid) {
  return Axios.get(MATATAKIAPI + `/user/${uid}`)
}

export function getAvatarUrl (location) {
  const imageCDNServer = MTTKIMGCDN
  return `${imageCDNServer}${location}`
}
