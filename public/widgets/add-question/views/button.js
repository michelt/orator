(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["mvcSandbox", "slide", "question", "reveal"], function(sandbox, Slide, Question, Reveal) {
    var ButtonView;
    return ButtonView = (function(_super) {

      __extends(ButtonView, _super);

      function ButtonView() {
        return ButtonView.__super__.constructor.apply(this, arguments);
      }

      ButtonView.prototype.events = {
        "click": "initQuestion"
      };

      ButtonView.prototype.initialize = function(params) {
        return this.presentation = params.presentation;
      };

      ButtonView.prototype.initQuestion = function() {
        var indices, slide, slide_data;
        indices = Reveal.getIndices();
        slide_data = this.presentation.getSlideByIndices(indices);
        slide = new Slide({
          data: slide_data.data,
          question: new Question(slide_data.question)
        });
        return sandbox.start("question", {
          slide: slide,
          indices: indices
        });
      };

      return ButtonView;

    })(sandbox.mvc.View);
  });

}).call(this);
