import Router from 'koa-router'
import config from '../config'
import { resolve } from 'path'
import reply from '../wechat/reply'
import wechatMiddle from '../wechat-lib/middleware'

export const router = app => {
  const router = new Router()

  router.all('/wechat-hear', wechatMiddle(config.wechat, reply))

  router.get('/upload', async (ctx, next) => {
    let mp = require('../wechat')
    let client = mp.getWechat()
    //视频素材
    // const data = await client.handle('uploadMaterial', 'video', resolve(__dirname, '../../ice.mp4'), {
    //   type: 'video',
    //   description: '{ "title": "haha","introduction": "heihei" }'
    // })
    // 永久素材
    // const data = await client.handle('uploadMaterial', 'image', resolve(__dirname, '../../ice.jpeg'), {
    //   type: 'image'
    // })
    // 临时素材
    //const data = await client.handle('uploadMaterial', 'image', resolve(__dirname, '../../ice.jpeg'))
    const news = {
      "articles": [{
         "title": "my name is zhenglei",
         "thumb_media_id": "X0Nkx8SvCoka6pfFHaMTN5BCc118QjP1oSuZjfRiaqE",
         "author": "zhenglei",
         "digest": "no digest",
         "show_cover_pic": 1,
         "content": "no content",
         "content_source_url": "https://www.baidu.com"
      }, {
         "title": "my name is zhenglei2",
         "thumb_media_id": "X0Nkx8SvCoka6pfFHaMTN5BCc118QjP1oSuZjfRiaqE",
         "author": "zhenglei2",
         "digest": "no digest",
         "show_cover_pic": 0,
         "content": "no content",
         "content_source_url": "https://www.baidu.com"
      }]
    }
    //图文素材
    //const data = await client.handle('uploadMaterial', 'news', news, {})
    //素材总数
    const data = await client.handle('countMaterial')
    console.log(data)
  })

  app.use(router.routes())
  app.use(router.allowedMethods())
}
