require [
  "widgetSandbox"
  "models/presentation"
], (sandbox, Presentation) ->

  sandbox.dom.ready ->
    sandbox.start "presenter",
      presentation: new Presentation sandbox.dom.data "#app", "presentation"
