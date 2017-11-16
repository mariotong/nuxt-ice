import { resolve } from 'path'
import { writeFileSync, existsSync} from 'fs'

export async function saveIndexJson(data) {
  if(existsSync('./eduWikiJson/index.json')) {
    console.log('已经存在')
  } else {
    writeFileSync('./eduWikiJson/index.json', JSON.stringify(data, null, 2), 'utf8')
  }
}
