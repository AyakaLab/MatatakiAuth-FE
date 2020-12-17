const flags = new Map()

export const Limiter = {
  /**
   * 设置限制时间
   * @param {*} flag          - 标记名称
   * @param {*} milisecond    - 限制时间
   */
  setInterval (flag, milisecond) {
    const flagData = flag.get(flag)
    flags.delete(flag)
    flags.set(flag, { interval: milisecond, last: flagData.last })
  },
  /**
   * 创建一个限制器
   * @param {*} flag          - 创建时给定的标记名称
   * @param {*} initInterval  - 基本限制时间
   */
  create (flag, initInterval) {
    flags.delete(flag)
    flags.set(flag, { interval: initInterval, last: (new Date()).getTime() })
  },
  check (flag) {
    if (!flags.has(flag)) return { code: -1, time: '应用程序设定错误，请及时联系开发者' }
    const { interval, last } = flags.get(flag)
    const now = (new Date()).getTime()
    if ((now - last) < interval) {
      flags.delete(flag)
      flags.set(flag, { interval: interval, last: now })
      return { code: 1, time: interval - (now - last) }
    } else {
      flags.delete(flag)
      flags.set(flag, { interval: interval, last: now })
      return { code: 0, time: now - last }
    }
  }
}
