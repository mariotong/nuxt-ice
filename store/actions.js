import Services from './services'

export default {
  getWechatSignture({ commit }, url) {
    return Services.getWechatSignture(url)
  }
}
