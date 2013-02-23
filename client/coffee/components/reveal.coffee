define [
  "serviceSandbox"
  "reveal"
], (sandbox, Reveal) ->

  Reveal.addEventListener "slidechanged", (ev) ->
    sandbox.emit "reveal.changed", ev

  sandbox.register "reveal.change", (dfd, slide) ->
    Reveal.slide slide.h, slide.v

  Reveal
