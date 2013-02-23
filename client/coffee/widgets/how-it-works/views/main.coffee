define [
  "mvcSandbox"
  "text!../templates/help.htm"
], (sandbox, tmpl) ->

  class MainView extends sandbox.mvc.View

    template: sandbox.template.compile tmpl

    events:
      "click .important" : "render"

    initialize: (params) ->
      @slug = params.slug

    render: ->
      @$el.addClass("help")
        .hide()
        .html(@template slug : @slug )
        .fadeIn()
