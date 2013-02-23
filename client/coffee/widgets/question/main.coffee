define [
  "widgetSandbox"
  "./views/main"
  "question"
  "bootstrap"
], (sandbox, MainView, Question) ->

  (options = {}) ->
    container = sandbox.dom.find "#main-container"
    container.append new MainView(
      model: options.slide
      indices: options.indices
    ).render().el
    container.find(".modal").modal()

