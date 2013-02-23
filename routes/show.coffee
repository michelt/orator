module.exports = (req, res) ->
  res.render "show",
    presentation: req.presentation
    presentation_data: JSON.stringify req.presentation
