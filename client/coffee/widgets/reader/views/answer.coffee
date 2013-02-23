define [
  "mvcSandbox"
], (sandbox) ->

  class AnswerView extends sandbox.mvc.View

    tagName: "button"
    attributes:
      class: "btn btn-large btn-block"
    events:
      click: "answer"

    initialize: (params = {}) ->
      @question = params.question
      @index = params.answer.i
      @value = params.answer.value
      @active = params.answer.active

    answer: ->
      return if @active?
      @question.answer @index
      @$el.addClass "btn-success"

    render: ->
      @$el.text @value
      if @active?
        addClass = "disabled"
        addClass += " btn-success" if @active is @index
        @$el.addClass addClass
      @
