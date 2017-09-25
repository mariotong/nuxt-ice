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

  fetchHouses() {
    return axios.get(`${apiUrl}/wiki/houses`)
  }

  fetchCities() {
    return axios.get(`${apiUrl}/wiki/cities`)
  }

  fetchCharacters() {
    return axios.get(`${apiUrl}/wiki/characters`)
  }

  fetchHouse(id) {
    return axios.get(`${apiUrl}/wiki/houses/${id}`)
  }

  fetchCharacter(id) {
    return axios.get(`${apiUrl}/wiki/characters/${id}`)
  }

  fetchProducts(id) {
    return axios.get(`${apiUrl}/wiki/products`)
  }
}

export default new Services()
