import {controller, get, post} from '../decorator/router'
import api from '../api'

@controller('/wiki')
export class WikiController {

  @get('/houses')
  async getHouses(ctx, next) {
    const data = await api.wiki.getHouses()
    ctx.body = {
      data: data,
      success: true
    }
  }

  @get('/houses/:_id')
  async getHouse(ctx, next) {
    const { params } = ctx
    const { _id } = params

    if(!_id) {
      ctx.body = {
        success: false,
        err: '_id is required'
      }
      return
    }

    const data = await api.wiki.getHouse(_id)

    ctx.body = {
      data: data,
      success: true
    }
  }

  @get('/characters')
  async getCharacters(ctx, next) {
    const {limit = 20} = ctx.query
    const data = await api.wiki.getCharacters(limit)

    ctx.body = {
      data: data,
      success: true
    }

  }

  @get('/characters/:_id')
  async getCharacter(ctx, next) {
    const { params } = ctx
    const { _id } = params

    if(!_id) {
      ctx.body = {
        success: false,
        err: '_id is required'
      }
      return
    }

    const data = await api.wiki.getCharacter(_id)

    ctx.body = {
      data: data,
      success: true
    }
  }

}
