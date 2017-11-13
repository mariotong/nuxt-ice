import axios from 'axios'

const baseUrl = ''
const apiUrl = 'http://rapapi.org/mockjsdata/26396'

class Services {
  getWechatSignature(url) {
    return axios.get(`${baseUrl}/wechat-signature?url=${url}`)
  }

  getUserByOAuth(url) {
    return axios.get(`${baseUrl}/wechat-oauth?url=${url}`)
  }

  getWechatOAuth (url) {
    return axios.get(`${baseUrl}/wechat-oauth?url=${encodeURIComponent(url)}`)
  }
  
  fetchHouses() {
    return axios.get(`${baseUrl}/wiki/houses`)
  }

  fetchHouse(id) {
    return axios.get(`${baseUrl}/wiki/houses/${id}`)
  }


  fetchCharacters() {
    return axios.get(`${baseUrl}/wiki/characters`)
  }


  fetchCharacter(id) {
    return axios.get(`${baseUrl}/wiki/characters/${id}`)
  }

  fetchProducts() {
    return axios.get(`${baseUrl}/api/products`)
  }

  fetchProduct(id) {
    return axios.get(`${baseUrl}/api/products/${id}`)
  }

  fetchUserAndOrders() {
    return axios.get(`${baseUrl}/api/user`)
  }
}

export default new Services()
