import Router from 'koa-router'
import config from '../config'

export const router = app => {
  const router = new Router()

  router.get('/wechat-hear', (ctx, next) => {
    const token = config.wechat.token
    const {
      signature,
      nonce,
      timestamp,
      echostr
    } = ctx.query

    const str = [token, timestamp, nonce].sort().join('')

    const sha = sha1(str)

    ctx.body = echostr

  })

  // router.post('/wechat-hear', (ctx, next) {
  //
  // })

  app.use(router.routes())
  app.use(router.allowedMethods())
}
