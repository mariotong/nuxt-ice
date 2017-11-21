import R from 'ramda'
import _ from 'lodash'
import { resolve } from 'path'
import { writeFileSync, createWriteStream, existsSync } from 'fs'
import glob from 'glob'
import axios from 'axios'
const apiUrl = 'http://nodet.cn:3000'

//console.log(eduIndexData)
function saveIndexImg() {
  let eduIndexData = require(resolve(__dirname, '../../eduWikiJson/index.json'))

  for (let key in eduIndexData) {
    //console.log(key)
    if (key == 'allparentinfo') {
      eduIndexData[key].forEach((item, key2) => {
        for (let key2 in item) {
          if(key2 == 'headinfo') {
            let name = item[key2].imgurl.split('/')[1]
            axios({
              method: 'get',
              url: `${apiUrl}/${item[key2].imgurl}`,
              responseType: 'stream'
            }).then((response) => {
              if(existsSync(`./static/img/${name}`)) {
                console.log(`${name}已存在`)
              } else {
                console.log(`正在下载${name}图片`)
                response.data.pipe(createWriteStream(`./static/img/${name}`))
              }
            })
          } else if (key2 == 'course') {
            let item3 = item[key2]
            for (let key3 in item3) {
              item3[key3].forEach((item4, key4) => {
                let name = item4.imgurl.split('/')[1]
                axios({
                  method: 'get',
                  url: `${apiUrl}/${item4.imgurl}`,
                  responseType: 'stream'
                }).then((response) => {
                  if(existsSync(`./static/img/${name}`)) {
                    console.log(`${name}已存在`)
                  } else {
                    console.log(`正在下载${name}图片`)
                    response.data.pipe(createWriteStream(`./static/img/${name}`))
                  }
                })
              })
            }
          }
        }
      })
    }
  }
}

//saveIndexImg()
function saveCourseDetailImg() {
  glob.sync(resolve(__dirname, '../../eduWikiJson/*.json')).forEach((match) => {
    if(/courseDetail/g.test(match)) {
      let courseDetail = require(match)
      if (courseDetail['teacher_actor']) {
        let name = courseDetail['teacher_actor']
        axios({
          method: 'get',
          url: `${apiUrl}/img/teacherHead/${courseDetail['teacher_actor']}`,
          responseType: 'stream'
        }).then((response) => {
          if(existsSync(`./static/img/${name}`)) {
            console.log(`${name}已存在`)
          } else {
            console.log(`正在下载${name}图片`)
            response.data.pipe(createWriteStream(`./static/img/${name}`))
          }
        })
      }
    }

    if(/\/\d{10}\.json/g.test(match)) {
      let listDetail = require(match)
      if(listDetail.data) {
        listDetail.data.forEach((item, key) =>  {
          if (item['teacher_actor']) {
            let name = item['teacher_actor']
            axios({
              method: 'get',
              url: `${apiUrl}/img/teacherHead/${item['teacher_actor']}`,
              responseType: 'stream'
            }).then((response) => {
              if(existsSync(`./static/img/${name}`)) {
                console.log(`${name}已存在`)
              } else {
                console.log(`正在下载${name}图片`)
                response.data.pipe(createWriteStream(`./static/img/${name}`))
              }
            })
          }
        })
      }

    }
  })
}

//saveCourseDetailImg()
