const Bilibili = require('./bilibili/index').default
const Mastodon = require('./mastodon/index').default
const Matataki = require('./matataki')

const API = {
  Bilibili: Bilibili,
  Mastodon: Mastodon,
  Matataki: Matataki
}

export default API
