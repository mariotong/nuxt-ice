import { controller, get, post, put } from '../decorator/router'
import { uptoken } from '../libs/qiniu'

@controller('/qiniu')
export class QiniuController {
  @get('token')
  async qiniuToken (ctx, next) {
    //console.log(ctx.query.key)
    //let key = ctx.query.key
    let token = uptoken()

    ctx.body = {
      success: true,
      data: {
        token: token
      }
    }
  }
}
