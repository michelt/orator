define [
  "mvcSandbox"
], (sandbox) ->

  tmpl = """
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
    <h2>{{title}}</h2>
    {{#each answers}}
    <label>{{value}}: {{count}} / {{../total}}</label>
    <div class="progress">
      <div class="bar" style="width: {{percent}}%;"></div>
    </div>
    {{/each}}
  """

  class AnswersView extends sandbox.mvc.View

    el: "#answers-results"
    template: sandbox.template.compile tmpl
    events:
      "click .close": "close"

    initialize: (params = {}) ->
      @title = params.title
      @answers = params.answers

    close: ->
      @$el.fadeOut()

    calculatePercent: (count, total) ->
      if count? then count / total * 100
      else 0

    render: ->
      total = 0
      total += a.count for a in @answers when a.count?

      @$el.html @template
        answers: ({value: a.value, count: a.count ? 0, percent: @calculatePercent a.count, total} for a in @answers)
        title: @title
        total: total
      @
