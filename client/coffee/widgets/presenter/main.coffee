define [
  "widgetSandbox"
  "socketio"
  "components/reveal"
  "models/question"
  "views/question-button"
  "./views/answers"
], (sandbox, io, Reveal, Question, ButtonView, AnswersView) ->

  (options = {}) ->

    {presentation} = options
    slug = presentation.get "slug"
    rendered = {}
    answers = {}
    $answers_results = sandbox.dom.find "#answers-results"

    url = "#{window.location.origin}/#{slug}/show"
    section = """
      <section>
        <p>#{url}</p>
        <img src="http://chart.googleapis.com/chart?cht=qr&chs=540x540&chld=H|0&chl=#{url}"/>
      </section>
    """

    $first = $ sandbox.dom.find(".slides > section")[0]
    if $first.find("section").length then $first.append section
    else
      content = $first.html()
      $first.html "<section>#{content}</section>#{section}"

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

    slides = io.connect "/#{slug}"

    displayAnswersResults = (question) ->
      h = question.get "h"
      v = question.get "v"
      answers["#{h}.#{v}"] ?= ({value: value, count: 0} for value, i in question.get "answers")
      new AnswersView(
        title: question.get "title"
        answers: answers["#{h}.#{v}"]
      ).render()
      $answers_results.fadeIn()

    sandbox.on "reveal.changed", (ev) ->
      slides.emit "change",
        h: ev.indexh
        v: ev.indexv

    slides.on "change", (slide) ->
      sandbox.request "reveal.change", slide

    slides.on "answers", (data) ->
      slide = presentation.getSlideByIndices data
      question = new Question
        title: slide.question.title
        answers: slide.question.answers
        h: data.h
        v: data.v
      , cache: ref: "slide#{data.h}.#{data.v}"

      answers["#{data.h}.#{data.v}"] = ({value: value, count: data.answers[i]} for value, i in question.get "answers")
      new AnswersView(
        title: question.get "title"
        answers: answers["#{data.h}.#{data.v}"]
      ).render()

    sandbox.on "reveal.changed", (ev) ->
      h = ev.indexh
      v = ev.indexv
      slide = presentation.getSlideByIndices {h, v}

      $answers_results.hide()
      if slide.question?.title?
        question = new Question
          title: slide.question.title
          answers: slide.question.answers
          h: h
          v: v
        , cache: ref: "slide#{h}.#{v}"

        displayAnswersResults question

        $(ev.currentSlide).append new ButtonView(model: question).render().el unless rendered["#{h}.#{v}"]
        rendered["#{h}.#{v}"] = yes

    sandbox.on "question.display", displayAnswersResults
