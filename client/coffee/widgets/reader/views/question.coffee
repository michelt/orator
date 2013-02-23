define [
  "mvcSandbox"
  "./answer"
  "bootstrap"
], (sandbox, AnswerView) ->

  sandbox.template.registerHelper "Answer", (question, answer) ->
    sandbox.template.addSubView new AnswerView {question, answer}

  class QuestionView extends sandbox.mvc.View

    id: "question-show"
    template: sandbox.template.compile """
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h3>{{title}}</h3>
      </div>
      <div class="modal-body">
      {{#each answers}}
        {{Answer ../question this}}
      {{/each}}
      </div>
    """
    attributes:
      class: "modal fade"

    initialize: ->
      @model.on "answered", =>
        @$el.modal "hide"

    render: ->
      data =
        question: @model
        title: @model.get "title"
        answers: ({i:i, value:value, active: @model.answered} for i, value of @model.get "answers")

      @$el.html @template data
      sandbox.template.renderSubViews @$el

      @$el.modal "show"

      @
