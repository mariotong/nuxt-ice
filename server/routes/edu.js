import {controller, get, post} from '../decorator/router'
import api from '../api'
import axios from 'axios'
const apiUrl = 'http://nodet.cn:3000/api'


@controller('/edu')
export class EduController {

  @get('/')
  async getHome(ctx, next) {

    let { data } = await axios({
      url: `${apiUrl}/`,
      method: ctx.method,
      headers: ctx.header
    })

    api.edu.saveIndexJson(data)

    ctx.body = data
  }

  @get('/listhome')
  async getListHome(ctx, next) {

    let { data } = await axios({
      url: `${apiUrl}/listhome`,
      method: ctx.method,
      headers: ctx.header
    })

    api.edu.saveListHomeJson(data)

    ctx.body = data
  }

  @get('/listhome/:_id')
  async getListOther(ctx, next) {
    const { params } = ctx
    const { _id } = params

    let { data } = await axios({
      url: `${apiUrl}/listhome/${_id}`,
      method: ctx.method,
      headers: ctx.header
    })

    api.edu.saveListOtherJson(data, _id)

    ctx.body = data
  }

  @get('/courseDetail/index/:_id')
  async getCourseDetail(ctx, next) {
    const { params } = ctx
    const { _id } = params

    let { data } = await axios({
      url: `${apiUrl}/courseDetail/index/${_id}`,
      method: ctx.method,
      headers: ctx.header
    })

    api.edu.saveCourseDetailJson(data, _id)

    ctx.body = data
  }

  @get('/isexistCard/:_id')
  async isexistCard(ctx, next) {
    const { params } = ctx
    const { _id } = params

    ctx.body = {
      data: null,
      msg: 0,
      status: false
    }
  }

  @get('/courselist')
  async getCourselist(ctx, next) {
    const { query } = ctx
    const { offset, limit, type, sort, courseId, selectScreenStr } = query

    let { data } = await axios({
      url: `${apiUrl}/courselist`,
      method: ctx.method,
      headers: ctx.header,
      params: query
    })

    api.edu.saveCourselistJson(data, query)

    ctx.body = data
  }

  @get('/listhome/filter/data')
  async getListHomeFilterData(ctx, next) {
    let { data } = await axios({
      url: `${apiUrl}/listhome/filter/data`,
      method: ctx.method,
      headers: ctx.header
    })

    api.edu.saveListhomeFilterJson(data)

    ctx.body = data
  }


  @get('/cartList')
  async getCartListData(ctx, next) {
    const { query } = ctx
    let { data } = await axios({
      url: `${apiUrl}/cartlist`,
      method: ctx.method,
      headers: ctx.header,
      params: query
    })

    api.edu.cartListJson(data)

    ctx.body = data
  }

  @post('/longin')
  async postLogin(ctx, next) {
    const { body } = ctx.request
    let { data } = await axios({
      url: `${apiUrl}/longin`,
      method: ctx.method,
      headers: ctx.header,
      data: body
    })

    api.edu.cartListJson(data)

    ctx.body = data
  }

}
