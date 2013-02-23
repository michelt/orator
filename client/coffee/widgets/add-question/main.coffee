define [
  "widgetSandbox"
  "./views/button"
], (sandbox, ButtonView) ->

  (options = {}) ->
    new ButtonView el: options.el, presentation: options.presentation
