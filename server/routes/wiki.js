import Router from 'koa-router'
import mongoose from 'mongoose'
import {controller, get, post} from '../decorator/router'
import config from '../config'
import { resolve } from 'path'
import { signature, redirect, oauth } from '../controllers/wechat'

const WikiHouse = mongoose.model('WikiHouse')
const WikiCharacter = mongoose.model('WikiCharacter')

@controller('/wiki')
export class WikiController {

  @get('/houses')
  async getHouses(ctx, next) {
    const data = await WikiHouse.find({}).populate({
      path: 'swornMembers.character',
      select: '_id name cname profile'
    }).exec()

    console.log('houses', data[0].swornMembers[0].character)

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

    const data = await WikiHouse.findOne({
      _id
    }).populate({
      path: 'swornMembers.character',
      select: '_id name cname nmId'
    }).exec()

    console.log('house', data[0])

    ctx.body = {
      data: data,
      success: true
    }
  }

  @get('/characters')
  async getCharacters(ctx, next) {
    const {limit = 20} = ctx.query
    const data = await WikiCharacter.find({}).limit(Number(limit)).exec()

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

    const data = await WikiCharacter.findOne({
      _id
    }).exec()

    ctx.body = {
      data: data,
      success: true
    }
  }

}
