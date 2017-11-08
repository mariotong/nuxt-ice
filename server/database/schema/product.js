const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed

const ProductSchema = new Schema({
  price: String,
  title: String,
  intro: String,
  images: [
    String
  ],
  parameters: [
    {
      key: String,
      value: String
    }
  ]
})

mongoose.model('Product', ProductSchema)
