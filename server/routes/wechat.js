import {controller, get, post} from '../decorator/router'
import config from '../config'
import { resolve } from 'path'
import reply from '../wechat/reply'
import wechatMiddle from '../wechat-lib/middleware'
import { signature, redirect, oauth } from '../controllers/wechat'

@controller('')
export class WechatController {
  @post('/wechat-hear')
  async wechatHear(ctx, next) {
    const middle = wechatMiddle(config.wechat, reply)
    await middle(ctx, next)

    //ctx.body = body
  }

  @get('/wechat-redirect')
  async wechatRedirect(ctx, next) {
    redirect(ctx, next)
  }

  @get('/wechat-signature')
  async wechatSignature(ctx, next) {
    signature(ctx, next)
  }

  @get('/wechat-oauth')
  async wechatOAuth(ctx, next) {
    oauth(ctx, next)
  }
}
