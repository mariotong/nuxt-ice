import request from 'request-promise'
import formstream from 'formstream'
import path from 'path'
import fs from 'fs'
import * as _ from 'lodash'

const base = 'https://api.weixin.qq.com/cgi-bin'
const api = {
  accessToken: `${base}/token?grant_type=client_credential`,
  temporary: {
    upload: `${base}/media/upload`,
    fetch: `${base}/media/get`
  },
  permanent: {
    upload: `${base}/material/add_material`,
    uploadNews: `${base}/material/add_news`,
    uploadNewsPic: `${base}/media/uploadimg`,
    fetch: `${base}/material/get_material`,
    del: `${base}/material/del_materail`,
    update: `${base}/material/update_news`,
    count: `${base}/material/get_materialcount`,
    batch: `${base}/material/batchget_material`
  },
  tag: {
    create: `${base}/tags/create`,
    fetch: `${base}/tags/get`,
    update: `${base}/tags/update`,
    del: `${base}/tags/delete`,
    fetchUsers: `${base}/user/tag/get`,
    batchTag: `${base}/tags/members/batchtagging`,
    batchUnTag: `${base}/tags/members/batchuntagging`,
    getTagList: `${base}/tags/getidlist`
  }
}

function statFile (filepath) {
  return new Promise((resolve, reject) => {
    fs.stat(filepath, (err, stat) => {
      if(err) reject(err)
      else resovle(stat)
    })
  })
}

export default class Wechat {
  constructor(opts) {
    this.opts = Object.assign({}, opts)
    this.appID = opts.appID
    this.appSecret = opts.appSecret
    this.getAccessToken = opts.getAccessToken
    this.saveAccessToken = opts.saveAccessToken

    this.fetchAccessToken()
  }

  async request(options) {
    options = Object.assign({}, options, {
      json: true
    })

    try {
      const response = await request(options)
      console.log(response)
      return response
    } catch (error) {
      console.error(error)
    }

  }

  async fetchAccessToken() {
    let data = await this.getAccessToken()

    if (!this.isValidAccessToken(data)) {
      data = await this.updateAccessToken()
    }

    await this.saveAccessToken(data)

    return data
  }

  async updateAccessToken() {
    const url = `${api.accessToken}&appid=${this.appID}&secret=${this.appSecret}`

    const data = await this.request({
      url
    })

    const now = (new Date().getTime())
    const expiresIn = now + (data.expires_in - 20) * 1000

    data.expires_in  =  expiresIn

    return data
  }

  isValidAccessToken(data) {
    if(!data || !data.access_token || !data.expires_in) {
      return false
    }

    const expiresIn = data.expires_in
    const now = (new Date().getTime())

    if (now < expiresIn) {
      return true
    } else {
      return false
    }
  }

  async handle (operation, ...args) {
    const tokenData = await this.fetchAccessToken()
    const options = this[operation](tokenData.access_token, ...args)
    const data = await this.request(options)
    return data
  }

  uploadMaterial(token, type, material, permanent) {
    let form = {}
    let url = api.temporary.upload

    if (permanent) {
      url = api.permanent.upload

      _.extend(form, permanent)
    }

    if (type === 'pic') {
      url = api.permanent.uploadNewsPic
    }

    if (type === 'news') {
      url = api.permanent.uploadNews
      form = material
    } else {
      //form = formstream()
      form.media = fs.createReadStream(material)
      //const stat = await statFile(material)
      //form.file('media', material, path.basename(material), stat.size)
    }

    let uploadUrl = `${url}?access_token=${token}`

    if (!permanent) {
      uploadUrl += '&type=' + type
    } else {
      if (type !== 'news') {
        form.access_token = token
      }
      //form.field('access_token', access_token)
    }

    const options = {
      method: 'POST',
      url: uploadUrl,
      json: true
    }

    if (type === 'news') {
      options.body = form
    } else {
      options.formData = form
    }

    return options

  }

  //获取素材
  fetchMaterial(token, mediaId, type, permanent) {
    let form = {}
    let fetchUrl = api.temporary.fetchurl

    if (permanent) {
      fetchUrl = api.permanent.fetch
    }

    let url = fetchUrl + "?accessToken=" + token

    let options = {
      method: 'POST',
      url: url
    }

    if (permanent) {
      form.media_id = mediaId
      form.access_token = token
      options.body = form
    } else {
      if (type == 'video') {
        //获取video素材是http协议，并不是https协议
        url = url.replace('https://', 'http://')
      }
      url += '&media_id=' + mediaId
    }

    return options
  }

  //删除素材
  deleteMaterial(token, mediaId) {
    const form = {
      media_id: mediaId
    }
    const url = api.permanent.del + '?access_token=' + token + '&media_id' + mediaId

    return {
      method: 'POST',
      url: url,
      body: form
    }
  }

  //更新素材
  updateMaterial(token, mediaId, news) {
    const form = {
      media_id: mediaId
    }

    _.extend(form, news)

    const url = api.permanent.update + '?access_token=' + token + '&media_id' + mediaId

    return {
      method: 'POST',
      url: url,
      body: form
    }
  }

  //获取素材总数
  countMaterial (token) {
    const url = api.permanent.count + '?access_token=' + token

    return {
      method: 'POST',
      url: url
    }
  }

  batchMaterial(token, options) {
    options.type = options.type || 'image'
    options.offset = options.offset || 0
    options.count = options.count || 10

    const url = api.permanent.batch + 'access_token' + token

    return {
      method: 'POST',
      url: url,
      body: options
    }
  }

  //创建标签
  createTag(token, name) {
    const form = {
      tag: {
        name: name
      }
    }
    const url = api.tag.create + '?access_token=' + token

    return {
      method: 'POST',
      url: url,
      body: form
    }
  }
  //标签列表
  fetchTags(token) {
    const url = api.tag.fetch + '?access_token=' + token

    return {
      url: url
    }
  }

  updateTag (token, tagId, name) {
    const form = {
      tag: {
        id: tagId,
        name: name
      }
    }

    const url = api.tag.update + '?access_token=' + token

    return {
      method: 'POST',
      url: url,
      body: form
    }
  }

  delTag(token, tagId) {
    const form = {
      tag: {
        id: tagId
      }
    }

    const url = api.tag.del + '?access_token=' + token

    return {
      method: 'POST',
      url: url,
      body: form
    }
  }

  fetchTagUsers(token, tagId, openId) {
    const form = {
      tagid: tagId,
      next_openid: openId || ''
    }

    const url = api.tag.fetchUsers + '?access_token=' + token

    return {
      method: 'POST',
      url: url,
      body: form
    }
  }

  // unTag true|false
  batchTag(token, openIdList, tagId, unTag) {
    //openIdList是个数组
    const form = {
      openid_list: openIdList,
      tagid: tagId
    }
    let url = api.tag.batchTag

    if (unTag) {
      url = api.tag.batchUnTag
    }

    url += '?acess_token=' + token

    return {
      method: 'POST',
      url: url,
      body: form
    }
  }

  getTagList(token, openId) {
    const form = {
      openid: openId
    }

    const url = api.tag.getTagList + '?access_token=' + token

    return {
      method: 'POST',
      url: url,
      body: form
    }
  }

}
