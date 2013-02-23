require [
  "widgetSandbox"
  "models/presentation"
], (sandbox, Presentation) ->

  sandbox.dom.ready ->
    sandbox.start "reader",
      presentation: new Presentation sandbox.dom.data "#app", "presentation"
