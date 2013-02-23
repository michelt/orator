define [
  "mvcSandbox"
  "text!../templates/question.htm"
], (sandbox, tmpl) ->

  class MainView extends sandbox.mvc.View

    className: "modal fade"
    template: sandbox.template.compile tmpl

    initialize: (params) ->
      @indices = params.indices
      @question = @model.get "question"

    events:
      "click .close" : "close"
      "click .add-answer" : "addAnswer"
      "click #submit-question" : "save"

    render: ->
      @$el.html @template @question.toJSON()
      @

    close: ->
      @$el.modal("hide")
      @remove()

    save: ->
      answers = ($(answer).val() for answer in @$el.find "input.answer")
      @question.set
        title : @$el.find(".question-title").val()
        answers : answers
      data =
        h : @indices.h
        v : @indices.v
        question : @question.toJSON()
      sandbox.http.post("edit", data)
        .done (res) =>
          @$el.find(".alert").removeClass "hide"

    addAnswer: ->
      @$el.find("#answers-form").append """
        <li>
          <input class="answer" type="text" placeholder="New answer" />
        </li>
      """