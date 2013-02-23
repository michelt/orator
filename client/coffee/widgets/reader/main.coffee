define [
  "widgetSandbox"
  "socketio"
  "components/reveal"
  "models/question"
  "views/question-button"
  "./views/question"
], (sandbox, io, Reveal, Question, ButtonView, QuestionView) ->

  (options = {}) ->

    {presentation} = options
    slug = presentation.get "slug"
    rendered = {}

    Reveal.initialize
      # Display controls in the bottom right corner
      controls: no
      # Display a presentation progress bar
      progress: yes
      # Push each slide change to the browser history
      history: off
      # Enable keyboard shortcuts for navigation
      keyboard: no
      # Enable the slide overview mode
      overview: off
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

    slides = io.connect "/#{slug}"

    slides.on "change", (slide) ->
      sandbox.request "reveal.change", slide

    sandbox.on "question.display", (question) ->
      new QuestionView(model: question).render()

    sandbox.on "reveal.changed", (ev) ->
      h = ev.indexh
      v = ev.indexv
      slide = presentation.getSlideByIndices {h, v}

      if slide.question?.title? and not rendered["#{h}.#{v}"]
        question = new Question slide.question, cache: ref: "slide#{h}.#{v}"
        question.on "answered", (answer) ->
          slides.emit "answer", {h, v, answer}

        $(ev.currentSlide).append new ButtonView(model: question).render().el
        rendered["#{h}.#{v}"] = yes
