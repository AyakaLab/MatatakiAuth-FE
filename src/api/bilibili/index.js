import Axios from 'axios'

const MATATAKI_AUTH_API = 'https://auth.matataki.io/api'

const Bilibili = {
  async getQrcode () {
    return new Promise((resolve, reject) => {
      Axios.get(MATATAKI_AUTH_API + '/bilibili/qrcodeUrl').then(res => {
        resolve(res.data)
      })
    })
  },
  async getLoginStatus (hashId, userId) {
    return new Promise((resolve, reject) => {
      Axios.get(MATATAKI_AUTH_API + '/bilibili/loginStatus', { params: { id: hashId, userId } }).then(res => {
        resolve(res.data)
      })
    })
  }
}

export default Bilibili
