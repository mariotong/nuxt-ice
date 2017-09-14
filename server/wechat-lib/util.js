import xml2js from 'xml2js'

export function xml2js (xml) {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, {
      trim: true
    }, (err, content) => {
      if (err) reject(err)
      else resolve(content)
    })
  })
}
