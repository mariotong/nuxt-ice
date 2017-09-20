import axios from 'axios'

const baseUrl = ''

class Services {
  getWechatSignture(url) {
    return axios.get(`${baseurl}/wechat-signature?url=${url}`)
  }
}
