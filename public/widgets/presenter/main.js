(function() {

  define(["widgetSandbox", "socketio", "components/reveal", "models/question", "views/question-button", "./views/answers"], function(sandbox, io, Reveal, Question, ButtonView, AnswersView) {
    return function(options) {
      var $answers_results, $first, answers, content, displayAnswersResults, presentation, rendered, section, slides, slug, url;
      if (options == null) {
        options = {};
      }
      presentation = options.presentation;
      slug = presentation.get("slug");
      rendered = {};
      answers = {};
      $answers_results = sandbox.dom.find("#answers-results");
      url = "" + window.location.origin + "/" + slug + "/show";
      section = "<section>\n  <p>" + url + "</p>\n  <img src=\"http://chart.googleapis.com/chart?cht=qr&chs=540x540&chld=H|0&chl=" + url + "\"/>\n</section>";
      $first = $(sandbox.dom.find(".slides > section")[0]);
      if ($first.find("section").length) {
        $first.append(section);
      } else {
        content = $first.html();
        $first.html("<section>" + content + "</section>" + section);
      }
      Reveal.initialize({
        controls: true,
        progress: true,
        history: false,
        keyboard: true,
        overview: true,
        loop: false,
        autoSlide: 0,
        mouseWheel: true,
        rollingLinks: true,
        transition: "default"
      });
      slides = io.connect("/" + slug);
      displayAnswersResults = function(question) {
        var h, i, v, value, _name, _ref;
        h = question.get("h");
        v = question.get("v");
        if ((_ref = answers[_name = "" + h + "." + v]) == null) {
          answers[_name] = (function() {
            var _i, _len, _ref1, _results;
            _ref1 = question.get("answers");
            _results = [];
            for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
              value = _ref1[i];
              _results.push({
                value: value,
                count: 0
              });
            }
            return _results;
          })();
        }
        new AnswersView({
          title: question.get("title"),
          answers: answers["" + h + "." + v]
        }).render();
        return $answers_results.fadeIn();
      };
      sandbox.on("reveal.changed", function(ev) {
        return slides.emit("change", {
          h: ev.indexh,
          v: ev.indexv
        });
      });
      slides.on("change", function(slide) {
        return sandbox.request("reveal.change", slide);
      });
      slides.on("answers", function(data) {
        var i, question, slide, value;
        slide = presentation.getSlideByIndices(data);
        question = new Question({
          title: slide.question.title,
          answers: slide.question.answers,
          h: data.h,
          v: data.v
        }, {
          cache: {
            ref: "slide" + data.h + "." + data.v
          }
        });
        answers["" + data.h + "." + data.v] = (function() {
          var _i, _len, _ref, _results;
          _ref = question.get("answers");
          _results = [];
          for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
            value = _ref[i];
            _results.push({
              value: value,
              count: data.answers[i]
            });
          }
          return _results;
        })();
        return new AnswersView({
          title: question.get("title"),
          answers: answers["" + data.h + "." + data.v]
        }).render();
      });
      sandbox.on("reveal.changed", function(ev) {
        var h, question, slide, v, _ref;
        h = ev.indexh;
        v = ev.indexv;
        slide = presentation.getSlideByIndices({
          h: h,
          v: v
        });
        $answers_results.hide();
        if (((_ref = slide.question) != null ? _ref.title : void 0) != null) {
          question = new Question({
            title: slide.question.title,
            answers: slide.question.answers,
            h: h,
            v: v
          }, {
            cache: {
              ref: "slide" + h + "." + v
            }
          });
          displayAnswersResults(question);
          if (!rendered["" + h + "." + v]) {
            $(ev.currentSlide).append(new ButtonView({
              model: question
            }).render().el);
          }
          return rendered["" + h + "." + v] = true;
        }
      });
      return sandbox.on("question.display", displayAnswersResults);
    };
  });

}).call(this);
