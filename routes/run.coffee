stored_answers = {}

module.exports.start = (req, res) ->
  slug = req.presentation.slug

  chan = require("../settings").get("io")
    .of("/#{slug}")

  chan.on "connection", (socket) ->

    stored_answers[slug] ?= {}

    # Slide change event from presenter
    socket.on "change", (slide) ->
      socket.broadcast.emit "change", slide

    # Answer from reader
    socket.on "answer", (data) ->
      answers = stored_answers[slug]["#{data.h}-#{data.v}"]
      answers ?= {}

      answers[data.answer] ?=
        count: 0
        ids: []

      unless socket.id in answers[data.answer].ids
        answers[data.answer].count++
        answers[data.answer].ids.push socket.id

      res = {}
      for index, value of answers
        res[index] = value.count

      stored_answers[slug]["#{data.h}-#{data.v}"] = answers
      socket.broadcast.emit "answers",
        h: data.h
        v: data.v
        answers: res

  res.render "start",
    presentation: req.presentation
    presentation_data: JSON.stringify req.presentation

module.exports.stop = (req, res) ->
  slug = req.presentation.slug

  delete answers[slug]

  require("../settings").get("io")
    .of("/#{slug}")
    .emit "end"

  res.redirect "/"
