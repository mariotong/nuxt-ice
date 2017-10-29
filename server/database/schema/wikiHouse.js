const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed

const WikiHouseSchema = new mongoose.Schema({
  name: String,
  cname: String,
  words: String,
  intro: String,
  wikiId: Number,
  sections: Mixed,
  swornMembers: [{
    character: {
      type: String,
      ref: 'WikiCharacter' //指向另外一张Schema
    },
    text: String
  }],
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

WikiHouseSchema.pre('save', function(next) {
  //如果是新增的数据
  if (this.isNew) {
    this.meta.createdAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }

  next()
})


const WikiHouse = mongoose.model('WikiHouse', WikiHouseSchema)
