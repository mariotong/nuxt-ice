const tip = '我是郑磊，欢迎来到我的世界\n' + '点击去往<a href="http://www.baidu.com">百度</a>'

export default async (ctx, next) => {
  const message = ctx.weixin

  console.log(message)

  ctx.body = tip
}
