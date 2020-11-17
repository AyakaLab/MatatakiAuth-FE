import Axios from 'axios'

const Bilibili = {
  async getQrcode () {
    return new Promise((resolve, reject) => {
      Axios.get('https://auth.matataki.io/api/bilibili/qrcodeUrl').then(res => {
        resolve(res.data)
      })
    })
  },
  async getLoginStatus (hashId, userId) {
    return new Promise((resolve, reject) => {
      Axios.get('https://auth.matataki.io/api/bilibili/loginStatus', { params: { id: hashId, userId } }).then(res => {
        resolve(res.data)
      })
    })
  }
}

export default Bilibili
