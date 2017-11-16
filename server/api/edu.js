import { resolve } from 'path'
import { writeFileSync } from 'fs'

export async function saveIndexJson(data) {
  writeFileSync('./server/database/eduWikiJson/index.json', JSON.stringify(data, null, 2), 'utf8')
}
