define [
  "mvcSandbox"
  "slide"
  "question"
  "reveal"
], (sandbox, Slide, Question, Reveal) ->

  class ButtonView extends sandbox.mvc.View

    events:
      "click" : "initQuestion"

    initialize: (params) ->
      @presentation = params.presentation

    initQuestion: ->
      indices = Reveal.getIndices()
      slide_data = @presentation.getSlideByIndices indices
      slide = new Slide
        data: slide_data.data
        question: new Question slide_data.question
      sandbox.start "question",
        slide: slide
        indices: indices
