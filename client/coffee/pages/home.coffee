require ["widgetSandbox"], (sandbox) ->

  sandbox.dom.ready ->
    sandbox.start "how-it-works",
      el: "#how-it-works"
      slug: sandbox.dom.data "#app", "slug"
