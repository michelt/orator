define ["mvcSandbox"], (sandbox) ->

  class ButtonView extends sandbox.mvc.View

    tagName: "button"
    attributes:
      class: "btn btn-large"
    events:
      click: "displayQuestion"

    displayQuestion: ->
      sandbox.emit "question.display", @model

    render: ->
      @$el.text @model.get "title"
      @
