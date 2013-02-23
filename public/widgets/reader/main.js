(function() {

  define(["widgetSandbox", "socketio", "components/reveal", "models/question", "views/question-button", "./views/question"], function(sandbox, io, Reveal, Question, ButtonView, QuestionView) {
    return function(options) {
      var presentation, rendered, slides, slug;
      if (options == null) {
        options = {};
      }
      presentation = options.presentation;
      slug = presentation.get("slug");
      rendered = {};
      Reveal.initialize({
        controls: false,
        progress: true,
        history: false,
        keyboard: false,
        overview: false,
        loop: false,
        autoSlide: 0,
        mouseWheel: true,
        rollingLinks: true,
        transition: "default"
      });
      slides = io.connect("/" + slug);
      slides.on("change", function(slide) {
        return sandbox.request("reveal.change", slide);
      });
      sandbox.on("question.display", function(question) {
        return new QuestionView({
          model: question
        }).render();
      });
      return sandbox.on("reveal.changed", function(ev) {
        var h, question, slide, v, _ref;
        h = ev.indexh;
        v = ev.indexv;
        slide = presentation.getSlideByIndices({
          h: h,
          v: v
        });
        if ((((_ref = slide.question) != null ? _ref.title : void 0) != null) && !rendered["" + h + "." + v]) {
          question = new Question(slide.question, {
            cache: {
              ref: "slide" + h + "." + v
            }
          });
          question.on("answered", function(answer) {
            return slides.emit("answer", {
              h: h,
              v: v,
              answer: answer
            });
          });
          $(ev.currentSlide).append(new ButtonView({
            model: question
          }).render().el);
          return rendered["" + h + "." + v] = true;
        }
      });
    };
  });

}).call(this);
