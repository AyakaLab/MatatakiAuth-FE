import Axios from 'axios'

const Bilibili = {
  async getQrcode () {
    return new Promise((resolve, reject) => {
      Axios.get('http://127.0.0.1:8083/app/qrcodeUrl').then(res => {
        resolve(res.data)
      })
    })
  },
  async getLoginStatus (hashId) {
    return new Promise((resolve, reject) => {
      Axios.get('http://127.0.0.1:8083/app/loginStatus', { params: { id: hashId } }).then(res => {
        resolve(res.data)
      })
    })
  }
}

export default Bilibili
