import qiniu from 'qiniu'
import config from '../config'
import { exec } from 'shelljs'

//在使用sdk前，需要一对有效的accesskey和secretkey签名授权
qiniu.conf.ACCESS_KEY = config.qiniu.AK
qiniu.conf.SECRET_KEY = config.qiniu.SK

const bucket = 'fjxmzl'

//获取图片
export const fetchImage = async (url, key) => {
  //const client = new qiniu.rs.client
  return new Promise((resolve, reject) => {
    // client.fetch(url, bucket, key (err, ret) => {
    //   if (err) reject(err)
    //   else resolve(ret)
    // })

    const bash = `qshell fetch ${url} ${bucket} '${key}'`
    const child = exec(bash, {async: true})
    child.stdout.on('data', data => {
      console.log(data)
      resolve(data)
    })
  })
}

//获取token
export const uptoken = () => {
  return new qiniu.rs.PutPolicy(bucket).token()
}
