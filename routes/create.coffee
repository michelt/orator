_s = require "underscore.string"
Presentation = require "../models/presentation"

module.exports.view = (req, res) ->
  res.render "create"

module.exports.save = (req, res) ->
  missing = []
  unless req.body.slug then missing.push "slug"
  unless req.body.slides_h then missing.push "slides_h"
  return res.json 400,
    status: "ERROR"
    missing: missing if missing.length

  slug = _s.slugify req.body.slug

  Presentation.findOne {slug}, (err, presentation) ->
    if err then res.json 500,
      status: "ERROR"
      more: err
    else if presentation then res.json 409
      status: "ERROR"
    else
      pres = new Presentation
        slug: slug
        slides_h: req.body.slides_h

      pres.on "save", (p) ->
        res.json 200,
          status: "OK"
          slug: p.slug

      pres.save (err) ->
        if err then res.json 500,
          status: "ERROR"
          more: err
