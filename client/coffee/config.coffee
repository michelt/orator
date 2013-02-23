require.config
  baseUrl: "/"
  shim:
    backbone:
      deps: ["underscore", "jquery"]
      exports: "Backbone"
    handlebars:
      exports: "Handlebars"
    bootstrap:
      deps: ["jquery"]
    reveal:
      exports: "Reveal"
    socketio:
      exports: "io"

  paths:
    # RequireJS plugins
    text: "lib/require/text"
    async: "lib/require/async"
    propertyParser: "lib/require/propertyParser"

    # Aura deps
    jquery: "lib/jquery"
    underscore: "lib/lodash"
    backbone: "lib/backbone"
    handlebars: "lib/handlebars"
    # Aura core and extensions
    aura_base: "lib/aura/base"
    dom: "lib/aura/dom"
    core: "lib/aura/core"
    backboneExtension: "extensions/backbone"
    commandExtension: "extensions/command"
    handlebarsExtension: "extensions/handlebars"
    httpExtension: "extensions/http"
    # Aura sandboxes
    mvcSandbox: "sandboxes/mvc"
    serviceSandbox: "sandboxes/service"
    widgetSandbox: "sandboxes/widget"

    # App libs
    bootstrap: "lib/bootstrap"
    reveal: "lib/reveal.min"
    socketio: "socket.io/socket.io"

    #Models
    question: "models/question"
    slide: "models/slide"

require.aura =
  baseUrl: "/"
  shim:
    dom:
      exports: "$"
      deps: ["jquery"]
  paths:
    aura_base: "lib/aura/base"
    dom: "lib/aura/dom"
    core: "lib/aura/core"

require.config require.aura
