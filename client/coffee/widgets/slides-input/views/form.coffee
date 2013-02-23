define [
  "mvcSandbox"
], (sandbox) ->

  class FormView extends sandbox.mvc.View

    events:
      "submit" : "handleForm"

    initialize: ->
      @htmlInput = @$el.find "textarea"
      @slugInput = @$el.find "input.slug"

    handleForm: (e) ->
      e.preventDefault()
      @htmlInput.removeClass "error"
      @slugInput.removeClass "error"

      html = $ @htmlInput.val()
      if html.length then slides_h = @parseSlides html
      else @htmlInput.addClass "error"

      slug = @slugInput.val()
      unless slug.length then @slugInput.addClass "error"

      if slides_h and slides_h.length and slug.length
        @postSlides({slides_h, slug})
          .fail =>
            @slugInput.addClass "error"

    parseSlides: (html) ->
      slides = []
      if html.length
        for section in html.find "> section"
          subsections = $(section).find "section"
          if subsections.length then slides.push slides_v: (data: slide.outerHTML for slide in subsections)
          else slides.push slides_v: [data: section.outerHTML]
      slides

    postSlides: (data) ->
      sandbox.http.post("/create", data)
        .done (res) ->
          location.href = "/#{res.slug}/edit" if res and res.slug
