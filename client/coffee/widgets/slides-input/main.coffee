define [
  "widgetSandbox"
  "./views/form"
  "socketio"
], (sandbox, FormView) ->

  (options = {}) ->
    new FormView el: options.el
