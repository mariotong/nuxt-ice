import koaBody from 'koa-bodyparser'
import session from 'koa-session'

export const addBody = app => {
  app.use(koaBody())
}

export const addSession = app => {
  console.log('走到这个方法里了吗', app)
  app.keys = ['ice']
  const CONFIG = {
    key: 'koa:sess',
    maxAge: 86400000,
    overwrite: true,
    signed: true,
    rolling: false
  }
  app.use(session(CONFIG, app))
}
