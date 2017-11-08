import {controller, get, post, del, put} from '../decorator/router'
import api from '../api'
import xss from 'xss'
import R from 'ramda'

@controller('/api')
export class ProductController {

  @get('/products')
  async getProducts(ctx, next) {
    let { limit = 50 } = ctx.query
    const data = await api.product.getProducts()
    ctx.body = {
      data: data,
      success: true
    }
  }

  @get('/products/:_id')
  async getProduct(ctx, next) {
    const { params } = ctx
    const { _id } = params

    if(!_id) {
      return(ctx.body = {
        success: false,
        err: '_id is required'
      })
    }

    const data = await api.product.getProduct(_id)

    ctx.body = {
      data: data,
      success: true
    }
  }

  @post('/products')
  async postProducts(ctx, next) {
    let product = ctx.request.body

    console.log('没有xxs之前的product', product)

    //对于恶意的字符串进行过滤,对每个字段进行xss过滤
    product = {
      title: xss(product.title),
      price: xss(product.price),
      intro: xss(product.intro),
      images: R.map(xss)(product.images),
      parameters: R.map(
        item => ({
          key: xss(item.key),
          value: xss(item.value)
        })
      )(product.parameters)
    }

    console.log('xxs处理之后的product', product)

    try {
      product = await api.product.save(product)
      ctx.body = {
        success: true,
        data: product
      }
    } catch(e) {
      ctx.body = {
        success: false,
        err: e
      }
    }

  }

  @put('/products')
  async putProducts(ctx, next) {
    let body = ctx.request.body

    //console.log('putProducts的body是:', body)

    const { _id } = body

    if(!_id) {
      return(ctx.body = {
        success: false,
        err: '_id is required'
      })
    }

    let product = await api.product.getProduct(_id)

    //console.log('putId拿到了吗', product)

    if(!product) {
      return (ctx.body = {
        succes: false,
        err: 'product not exist'
      })
    }

    product.title = xss(body.title)
    product.price = xss(body.price)
    product.intro = xss(body.intro)
    product.images = R.map(xss)(body.images)
    product.parameters = R.map(
      item => ({
        key: xss(item.key),
        value: xss(item.value)
      })
    )(body.parameters)

    try {
      product = await api.product.update(product)

      ctx.body = {
        success: true,
        data: product
      }
    } catch(e) {
      ctx.body = {
        success: false,
        err: e
      }
    }
  }

  @del('/products/:_id')
  async delProducts(ctx, next) {
    const params = ctx.params
    const { _id } = params

    if (!_id) {
      return (ctx.body = {success: false, err: '_id is required'})
    }

    let product = await api.product.getProduct(_id)

    console.log('delProductId', product)

    if(!product) {
      return (
        ctx.body = {
          success: false,
          err: 'product not exist'
        }
      )
    }

    try {
      await api.product.del(product)
      ctx.body = {
        success: true
      }
    } catch(e) {
      ctx.body = {
        success: false,
        err: e
      }
    }
  }

}
