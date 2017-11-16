import sha1 from 'sha1'
import getRawBody from 'raw-body'
import * as util from './util'

export default function(opts, reply) {
  return async (ctx, next) => {
    //微信初始化
    require('../wechat')

    const token = opts.token
    const {
      signature,
      nonce,
      timestamp,
      echostr
    } = ctx.query

    const str = [token, timestamp, nonce].sort().join('')

    const sha = sha1(str)

    if (ctx.method === 'GET') {
      console.log(sha, signature)
      if (sha == signature) {
        return echostr
      } else {
        return 'Failed'
      }
    } else if (ctx.method === 'POST') {
      if (sha !== signature) {
        ctx.body = 'Failed'
        return false
      }

      const data = await getRawBody(ctx.req, {
        length: ctx.length,
        limit: '1mb',
        encoding: ctx.charset
      })


      const content = await util.parseXML(data)
      const message = util.formatMessage(content.xml)

      ctx.weixin = message

      await reply.apply(ctx, [ctx, next])

      const replyBody = ctx.body
      const msg = ctx.weixin
      const xml = util.tpl(replyBody, msg)

      console.log('replyBody', replyBody)
      console.log('msg', msg)
      console.log('xml', xml)

      ctx.status = 200
      ctx.type = 'application/xml'
      return xml
    }
  }
}
