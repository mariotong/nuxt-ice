import { getWechat, getOAuth } from '../wechat'
import mongoose from 'mongoose'

const User = mongoose.model('User')

const client = getWechat()

export async function getSignatureAsync(url) {
  const data = await client.fetchAccessToken()
  const token = data.access_token
  const ticketData = await client.fetchTicket(token)
  const ticket = ticketData.ticket

  let params = client.sign(ticket, url)
  params.appId = client.appID

  return params
}

export function getAuthorizeURL(...args) {
  const oauth = getOAuth()

  return oauth.getAuthorizeURL(...args)
}

export async function getUserByCode(code) {
  const oauth = getOAuth()
  const data = await oauth.fetchAccessToken(code)
  console.log('fetchAccessToken的openid是什么', data)
  const user = await oauth.getUserInfo(data.access_token, data.openid)
  console.log('getUserInfo是什么', user)

  const existUser = await User.findOne({
    openid: data.openid
  }).exec()

  console.log('existUser', existUser)

  if (!existUser) {
    let newUser = new User({
      openid: [data.openid],
      unionid: data.unionid,
      nickname: user.nickname,
      province: user.province,
      country: user.country,
      city: user.city,
      headimgurl: user.headimgurl,
      sex: user.sex
    })

    await newUser.save()
  }

  return {
    nickname: user.nickname,
    province: user.province,
    country: user.country,
    city: user.city,
    openid: user.openid,
    unionid: user.unionid,
    headimgurl: user.headimgurl,
    sex: user.sex
  }
}
