module.exports.view = (req, res) ->
  res.render "edit",
    presentation: req.presentation
    presentation_data: JSON.stringify req.presentation

module.exports.save = (req, res) ->
  missing = []
  unless req.body.h then missing.push "h"
  unless req.body.v then missing.push "v"
  unless req.body.question then missing.push "question"

  if missing.length
    return res.json 400,
      status: "ERROR"
      missing: missing

  if req.body.h > req.presentation.slides_h.length or req.body.v > req.presentation.slides_h[req.body.h].slides_v.length
    return res.json 400, status: "ERROR"

  req.presentation.slides_h[req.body.h].slides_v[req.body.v].question = req.body.question
  req.presentation.on "save", (p) ->
    res.json 200, status: "OK"
  req.presentation.save (err) ->
    if err then res.json 500,
      status: "ERROR"
      more: err
