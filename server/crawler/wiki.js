import cheerio from 'cheerio'
import rp from 'request-promise'
import R from 'ramda'
import _ from 'lodash'
import { resolve } from 'path'
import { writeFileSync } from 'fs'
import { fetchImage } from '../libs/qiniu'
import randomToken from 'random-token'

const sleep = time => new Promise(resolve => setTimeout(resolve, time))

const normalizedContent = content => _.reduce(content, (acc, item) => {
  //console.log('原始的content是什么', content)
  //console.log('遍历的这个item是什么', item)
  if (item.text) acc.push(item.text)
  if (item.elements && item.elements.length) {
    let _acc = normalizedContent(item.elements)

    acc =R.concat(acc, _acc)
  }

  return acc
}, [])

const normalizedSections = R.compose(
  R.nth(1),
  R.splitAt(1),
  R.map(i => ({
    level: i.level,
    title: i.title,
    content: normalizedContent(i.content)
  }))
)

const getWikiId = async data => {
  let query = data.name || data.cname
  const url = `http://zh.asoiaf.wikia.com/api/v1/Search/List?query=${encodeURI(query)}`
  let res
  try {
    res = await rp(url)
  } catch(e) {
    console.log(e)
  }

  res = JSON.parse(res)

  res = res.items[0]

  //console.log(res.id)
  //console.log('还有这个data是什么', data)
  //console.log('这个res是什么', res)
  //console.log('最终合起来是什么', R.merge(data, res))
  return R.merge(data, res)
}

const getWikiDetail = async data => {
  const { id } = data
  const url  = `http://zh.asoiaf.wikia.com/api/v1/Articles/AsSimpleJson?id=${id}`
  let res

  try {
    res = await rp(url)
  } catch (e) {
    console.log(e)
  }


  res = JSON.parse(res)

  const getCNameAndINtro = R.compose(
    i => ({
      cname: i.title,
      intro: R.map(R.prop(['text']))(i.content)
    }),
    R.pick(['title', 'content']),
    R.nth(0),
    R.filter(R.propEq('level', 1)),
    R.prop('sections')
  )

  const getLevel = R.compose(
    R.project(['title', 'content', 'level']),
    R.reject(R.propEq('title','扩展阅读')),
    R.reject(R.propEq('title','引用与注释')),
    R.filter(i => i.content.length),
    R.prop('sections')
  )

  const cnameIntro = getCNameAndINtro(res)
  //console.log('拿到cnameIntro是什么', cnameIntro)
  let sections = getLevel(res)
  //console.log('拿到sections是什么', sections)
  //console.log(sections[0].content)
  let body = R.merge(data, getCNameAndINtro(res))

  sections = normalizedSections(sections)

  body.sections = sections
  body.wikiId = id

  //console.log('normalizedSections以后的sections是什么', sections)
  //console.log('最终的body是什么', body)

  return R.pick(['name', 'cname', 'playedBy', 'profile', 'images', 'nmId', 'chId', 'sections',
                 'intro', 'wikiId', 'words'], body)
}

export const getWikiCharacters = async () => {
  let data = require(resolve(__dirname, '../../fullCharacters.json'))

  //console.log(data.length)
  data = R.map(getWikiId, data)
  //所有的异步data数据都完事了才完事
  data = await Promise.all(data)
  console.log('获取wiki ID')
  console.log(data[0])
  data= R.map(getWikiDetail, data)
  data = await Promise.all(data)
  console.log('获取wiki详细资料')
  console.log(data[0])

  writeFileSync('./finalCharacters.json', JSON.stringify(data, null, 2), 'utf8')
}

function checkFinalCharacterCount() {
  let data = require(resolve(__dirname, '../../finalCharacters.json'))

  console.log(data.length)
}

//checkFinalCharacterCount()

export const fetchImageFromIMDb = async () => {
  let IMDbCharacters = require(resolve(__dirname, '../../finalCharacters.json'))

  IMDbCharacters = R.map(async item => {
    try {
      let key = `${item.nmId}/${randomToken(32)}`
      await fetchImage(item.profile, key)

      console.log(key)
      console.log(item.profile)
      console.log('ipload done!')

      item.profile = key

      for (let i = 0; i< item.images.length; i++) {
        let _key = `${item.name}/${randomToken(32)}`
        await fetchImage(item.images[i], _key)

        console.log(_key)
        console.log(item.images[i])

        await sleep(100)

        item.images[i] = _key
      }

      return item
    } catch(e) {
      console.log(e)
    }
  })(IMDbCharacters)

  IMDbCharacters = await Promise.all(IMDbCharacters)

  writeFileSync('./completeCharacters.json', JSON.stringify(IMDbCharacters, null, 2), 'utf8')
}

fetchImageFromIMDb()
