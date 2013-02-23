define ["mvcSandbox"], (sandbox) ->

  class Presentation extends sandbox.mvc.Model

    getSlideByIndices: (data = {}) ->
      return null unless slides_h = @get "slides_h"
      if data.h? and slides = slides_h[data.h]?.slides_v
        if data.v? and slide_v = slides[data.v] then slide_v
        else slides[0]
      else null
