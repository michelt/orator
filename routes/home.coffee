Presentation = require "../models/presentation"

module.exports = (req, res) ->
  Presentation.findOne {}, {"slug"}, $orderby: date: -1, (err, presentation) ->
      if err then res.render "errors/500"
      else res.render "index",
        title: "Preziew"
        last_presentation: presentation.slug
