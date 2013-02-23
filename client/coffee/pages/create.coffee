require ["widgetSandbox"], (sandbox) ->

  sandbox.dom.ready ->
    sandbox.start "slides-input", el: "#slides-input"
