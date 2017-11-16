import {controller, get, post} from '../decorator/router'
import api from '../api'
import axios from 'axios'
const apiUrl = 'http://nodet.cn:3000/api'


@controller('/edu')
export class EduController {

  @get('/')
  async getHome(ctx, next) {
    axios({
      url: `${apiUrl}/`,
      method: ctx.method,
      headers: ctx.header
    }).then((res) => {
      api.edu.saveIndexJson(res.data)
      ctx.body = res.data
    })
  }

}
