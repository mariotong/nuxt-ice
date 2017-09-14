import Router from 'koa-router'
import config from '../config'
import sha1 from 'sha1'
import reply from '../wechat/reply'
import wechatMiddle from '../wechat-lib/middlewares'

export const router = app => {
  const router = new Router()

  router.all('/wechat-hear', wechatMiddle(config.wechat, reply))

  // router.post('/wechat-hear', (ctx, next) {
  //
  // })

  app.use(router.routes())
  app.use(router.allowedMethods())
}
