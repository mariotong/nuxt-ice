import Router from 'koa-router'
import mongoose from 'mongoose'
import {controller, get, post} from '../decorator/router'
import config from '../config'
import { resolve } from 'path'
import { signature, redirect, oauth } from '../controllers/wechat'

const WikiHouse = mongoose.model('WikiHouse')

@controller('/wiki')
export class WikiController {

  @get('/houses')
  async getHouses(ctx, next) {
    const houses = await WikiHouse.find({}).populate({
      path: 'swornMembers.character',
      select: '_id name cname profile'
    }).exec()

    console.log('houses', houses[0].swornMembers[0].character)

    ctx.body = {
      data: houses,
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

    const house = await WikiHouse.findOne({
      _id
    }).populate({
      path: 'swornMembers.character',
      select: '_id name cname nmId'
    }).exec()

    console.log('house', house[0])

    ctx.body = {
      data: house,
      success: true
    }

  }

}
