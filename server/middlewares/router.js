import Router from 'koa-router'
import config from '../config'
import { resolve } from 'path'
import reply from '../wechat/reply'
import wechatMiddle from '../wechat-lib/middleware'

export const router = app => {
  const router = new Router()

  router.all('/wechat-hear', wechatMiddle(config.wechat, reply))
  
  app.use(router.routes())
  app.use(router.allowedMethods())
}
