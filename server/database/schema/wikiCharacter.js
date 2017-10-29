const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed

const WikiCharacterSchema = new mongoose.Schema({
  _id: String,
  name: String,
  cname: String,
  playedBy: String,
  profile: String,
  images: [String],
  nmId: String,
  chId: String,
  wikiId: String,
  sections: Mixed,
  intro: [String],
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

WikiCharacterSchema.pre('save', function(next) {
  //如果是新增的数据
  if (this.isNew) {
    this.meta.createdAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }

  next()
})


const WikiCharacter = mongoose.model('WikiCharacter', WikiCharacterSchema)
