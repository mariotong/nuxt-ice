import { resolve } from 'path'
import { writeFileSync, existsSync} from 'fs'

export async function saveIndexJson(data) {
  if(existsSync('./eduWikiJson/index.json')) {
    console.log('已经存在')
  } else {
    writeFileSync('./eduWikiJson/index.json', JSON.stringify(data, null, 2), 'utf8')
  }
}

export async function saveListHomeJson(data) {
  if(existsSync('./eduWikiJson/listHome.json')) {
    console.log('已经存在')
  } else {
    writeFileSync('./eduWikiJson/listHome.json', JSON.stringify(data, null, 2), 'utf8')
  }
}

export async function saveListOtherJson(data, _id) {
  if(existsSync(`./eduWikiJson/listHome${_id}.json`)) {
    console.log('已经存在')
  } else {
    writeFileSync(`./eduWikiJson/listHome${_id}.json`, JSON.stringify(data, null, 2), 'utf8')
  }
}

export async function saveCourselistJson(data, query) {
  let { type, sort, courseId, selectScreenStr } = query
  let name = (type + sort + encodeURIComponent(selectScreenStr) + courseId + '')
  console.log(query)
  console.log(name)
  if(existsSync(`./eduWikiJson/${name}.json`)) {
    console.log('已经存在')
  } else {
    writeFileSync(`./eduWikiJson/${name}.json`, JSON.stringify(data, null, 2), 'utf8')
  }
}

export async function saveCourseDetailJson(data, _id) {
  if(existsSync(`./eduWikiJson/courseDetail${_id}.json`)) {
    console.log('已经存在')
  } else {
    writeFileSync(`./eduWikiJson/courseDetail${_id}.json`, JSON.stringify(data, null, 2), 'utf8')
  }
}

export async function saveListhomeFilterJson(data, query) {
  if(existsSync(`./eduWikiJson/listhomeFilter.json`)) {
    console.log('已经存在')
  } else {
    writeFileSync(`./eduWikiJson/listhomeFilter.json`, JSON.stringify(data, null, 2), 'utf8')
  }
}

export async function cartListJson(data, query) {
  if(existsSync(`./eduWikiJson/cartListJson.json`)) {
    console.log('已经存在')
  } else {
    writeFileSync(`./eduWikiJson/cartListJson.json`, JSON.stringify(data, null, 2), 'utf8')
  }
}
