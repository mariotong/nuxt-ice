const tip = '我是郑磊，欢迎来到我的世界\n' + '点击去往<a href="http://www.baidu.com">百度</a>'

export default async (ctx, next) => {
  const message = ctx.weixin
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
  // const news = {
  //   "articles": [{
  //      "title": "my name is zhenglei",
  //      "thumb_media_id": "X0Nkx8SvCoka6pfFHaMTN5BCc118QjP1oSuZjfRiaqE",
  //      "author": "zhenglei",
  //      "digest": "no digest",
  //      "show_cover_pic": 1,
  //      "content": "no content",
  //      "content_source_url": "https://www.baidu.com"
  //   }, {
  //      "title": "my name is zhenglei2",
  //      "thumb_media_id": "X0Nkx8SvCoka6pfFHaMTN5BCc118QjP1oSuZjfRiaqE",
  //      "author": "zhenglei2",
  //      "digest": "no digest",
  //      "show_cover_pic": 0,
  //      "content": "no content",
  //      "content_source_url": "https://www.baidu.com"
  //   }]
  // }
  //图文素材
  //const data = await client.handle('uploadMaterial', 'news', news, {})
  //素材总数
  //const data = await client.handle('countMaterial')


  if (message.MsgType === 'event') {
    //点击事件
    if (message.Event === 'subscribe') {
      ctx.body = tip
    } else if (message.Event === 'unsubscribe') {
      console.log('取关了')
    } else if (message.Event === 'LOCATION') {
      ctx.body = message.Latitude + ':' + message.longitude
    } else if (message.Event === 'view') {
      ctx.body = message.EventKey + message.MenuId
    } else if (message.Event === 'pic_sysphoto') {
      ctx.body = message.SendPicsInfo.Count + ' phtots sent'
    }

  } else if (message.MsgType === 'text') {
   //问什么回什么。。。
    if (message.Content === '1') {
      let userList = [
      {'openid':'oThawwt3rLy602Vb_hMsplBtP0mo','lang':'zh_CN'},
      {'openid':'oThawwkxSHyeHKQ4pxg11TaRIfxE','lang':'zh_CN'},
      {'openid':'oThawwm_McqFpAWOnlHlCqLS1vLU','lang':'zh_CN'},
      {'openid':'oThawwvl6MI0mbgeTRHwzvhrSgM0','lang':'zh_CN'},
      {'openid':'oThawwrgHWcM-T1v0MvBKiiEDYJw','lang':'zh_CN'},
      {'openid':'oThawws6A4NkxXr9D0bcjBPZ5mnc','lang':'zh_CN'},
      {'openid':'oThawwgYc4RyTVU_FeLoSxCSvsqs','lang':'zh_CN'},
      {'openid':'oThawwlYNmoVu5wIuSE-sgGpB038','lang':'zh_CN'},
      {'openid':'oThawwlYyWubMogLd1zjInfzWAf8','lang':'zh_CN'}]
      const data = await client.handle('batchUserInfo', userList)
      console.log(data)
    } else if (message.Content === '2') {
      const data = await client.handle('getUserInfo', 'oThawwt3rLy602Vb_hMsplBtP0mo')
      console.log(data)
    } else if (message.Content === '3') {
      const data = await client.handle('fetchTags')
      console.log(data)
    } else if (message.Content == '4') {
      const data = await client.handle('createTag', 'VUE')
      console.log(data)
    } else if (message.Content == '5') {
      const data = await client.handle('fetchTagUsers', 2)
      console.log(data)
    } else if (message.Content == '6') {
      const data = await client.handle('getMenu')
      console.log(JSON.stringify(data))
    } else if (message.Content == '7') {
      console.log('是不是到7这里面来了吗')
      const menu = require('./menu').default
      await client.handle('delMenu')
      console.log('删除成功了吗')
      const data = await client.handle('createMenu', menu)
      console.log('创建成功了吗', JSON.stringify(data))
    } else if (message.Content == '8') {

    }

    ctx.body = message.Content
  } else if (message.MsgType === 'image') {
    ctx.body = {
      mediaId: message.MediaId,
      msgType: 'image'
    }
  } else if (message.MsgType === 'voice') {
    ctx.body = {
      msgType: 'voice',
      mediaId: message.MediaId
    }
  } else if (message.MsgType === 'video') {
    ctx.body = {
      title: message.ThumbMediaId,
      msgType: 'video',
      mediaId: message.MediaId
    }
  } else if (message.MsgType === 'location') {
    ctx.body = message.Location_X + ':' + message.Location_Y + ':' + message.Label
  } else if (message.MsgType === 'link') {
    ctx.body = message.title
  }

}
