mongoose = require "mongoose"

module.exports = mongoose.model "Presentation", new mongoose.Schema
  title: String
  slug:
    type: String
    unique: yes
  slides_h: [
    slides_v: [
      data: String
      question:
        title: String
        answers: [String]
    ]
  ]
  date:
    type: Date
    default: Date.now
