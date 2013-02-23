require [
  "widgetSandbox"
  "models/presentation"
  "components/reveal"
], (sandbox, Presentation, Reveal) ->

  sandbox.dom.ready ->

    Reveal.initialize
      # Display controls in the bottom right corner
      controls: yes
      # Display a presentation progress bar
      progress: yes
      # Push each slide change to the browser history
      history: off
      # Enable keyboard shortcuts for navigation
      keyboard: on
      # Enable the slide overview mode
      overview: on
      # Loop the presentation
      loop: off
      # Number of milliseconds between automatically proceeding to the
      # next slide, disabled when set to 0, this value can be overwritten
      # by using a data-autoslide attribute on your slides
      autoSlide: 0
      # Enable slide navigation via mouse wheel
      mouseWheel: on
      # Apply a 3D roll to links on hover
      rollingLinks: on
      # Transition style
      transition: "default" # default/cube/page/concave/zoom/linear/none

    sandbox.start "add-question",
      el: "#add-question"
      presentation: new Presentation sandbox.dom.data "#app", "presentation"
