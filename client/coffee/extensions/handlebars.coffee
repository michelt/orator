define [
  "jquery"
  "handlebars"
], ($, Handlebars) ->

  Handlebars.registerHelper "safe", (html) ->
    new Handlebars.SafeString html

  subViews = {}

  template = Handlebars

  template.addSubView = (view) ->
    subViews[view.cid] = view
    new template.SafeString "<view data-cid=\"#{ view.cid }\"></view>"

  template.renderSubView = (cid) ->
    view = subViews[cid]
    delete subViews[cid]
    if view then view.render().el
    else ""

  template.renderSubViews = ($el) ->
    $el.find("view").each (i, view) ->
      $view = $ view
      $view.replaceWith template.renderSubView $view.data "cid"

  template
