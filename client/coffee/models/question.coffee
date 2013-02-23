define ["mvcSandbox"], (sandbox) ->

  class Question extends sandbox.mvc.Model

    answered: null

    answer: (index) ->
      return if @answered?
      @answered = index
      @trigger "answered", index
