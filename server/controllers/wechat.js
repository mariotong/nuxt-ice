import api from '../api'
import { parse as urlParse } from 'url'
import { parse as queryParse } from 'querystring'
import config from '../config'

export async function signature(ctx, next) {
  let url = ctx.query.url

  if(!url) ctx.throw(404)

  url = decodeURIComponent(url)

  const params = await api.wechat.getSignatureAsync(url)

  ctx.body = {
    success: true,
    params: params
  }
}

export async function redirect(ctx, next) {
  let redirect = config.SITE_ROOT_URL + '/oauth'
  //let redirect = 'http://mariotong.viphk.ngrok.org/oauth'
  let scope = 'snsapi_userinfo'
  const { visit, id } = ctx.query
  console.log(visit, id)
  const params = id ? `${visit}_${id}` : visit

  const url = api.wechat.getAuthorizeURL(scope, redirect, params)

  ctx.redirect(url)
}

export async function oauth(ctx, next) {
  console.log('第一步oauth,拿到url', ctx.query.url)
  let url = ctx.query.url

  url = decodeURIComponent(url)

  const urlObj = urlParse(url)
  const params = queryParse(urlObj.query)
  const code = params.code
  const user = await api.wechat.getUserByCode(code)

  console.log('第二部拿到user的信息并返回', user)
  ctx.session.user = user
  ctx.body = {
    success: true,
    data: user
  }
}
