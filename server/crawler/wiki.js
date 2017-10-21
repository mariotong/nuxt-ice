import cheerio from 'cheerio'
import rp from 'request-promise'
import R from 'ramda'
import { resolve } from 'path'
import { writeFileSync } from 'fs'

const sleep = time => new Promise(resolve => setTimeout(resolve, time))

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

  console.log(res.id)

  return R.merge(data, res)
}

const getWikiDetail = async data => {
  let query = data.name || data.cname
  const url = `http://zh.asoiaf.wikia.com/api/v1/Search/List?query=${encodeURI(query)}`
  let res
  try {
    res = await rp(url)
  } catch(e) {
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
    
  )
}
