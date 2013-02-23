define [
  "widgetSandbox"
  "./views/main"
], (sandbox, MainView) ->

  (options = {}) ->
    new MainView el: options.el, slug: options.slug
