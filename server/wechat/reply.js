const tip = '我是郑磊，欢迎来到我的世界\n' + '点击去往<a href="http://www.baidu.com">百度</a>'

export default async (ctx, next) => {
  const message = ctx.weixin

  //问什么回什么。。。
  if (message.MsgType === 'text') {
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
