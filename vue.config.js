module.exports = {
  publicPath: process.env.TESTENV === 'test' ? '/test/' : process.env.NODE_ENV === 'production' ? '././' : './'
}
