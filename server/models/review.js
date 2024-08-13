const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  rating:{
    type: Number,
    default:5.0
  },
  reviewDesc: {
    type: String,
  },
})

const Review = mongoose.model('review', reviewSchema)

module.exports = { Review }
