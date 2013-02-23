(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["mvcSandbox", "text!../templates/question.htm"], function(sandbox, tmpl) {
    var MainView;
    return MainView = (function(_super) {

      __extends(MainView, _super);

      function MainView() {
        return MainView.__super__.constructor.apply(this, arguments);
      }

      MainView.prototype.className = "modal fade";

      MainView.prototype.template = sandbox.template.compile(tmpl);

      MainView.prototype.initialize = function(params) {
        this.indices = params.indices;
        return this.question = this.model.get("question");
      };

      MainView.prototype.events = {
        "click .close": "close",
        "click .add-answer": "addAnswer",
        "click #submit-question": "save"
      };

      MainView.prototype.render = function() {
        this.$el.html(this.template(this.question.toJSON()));
        return this;
      };

      MainView.prototype.close = function() {
        this.$el.modal("hide");
        return this.remove();
      };

      MainView.prototype.save = function() {
        var answer, answers, data,
          _this = this;
        answers = (function() {
          var _i, _len, _ref, _results;
          _ref = this.$el.find("input.answer");
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            answer = _ref[_i];
            _results.push($(answer).val());
          }
          return _results;
        }).call(this);
        this.question.set({
          title: this.$el.find(".question-title").val(),
          answers: answers
        });
        data = {
          h: this.indices.h,
          v: this.indices.v,
          question: this.question.toJSON()
        };
        return sandbox.http.post("edit", data).done(function(res) {
          return _this.$el.find(".alert").removeClass("hide");
        });
      };

      MainView.prototype.addAnswer = function() {
        return this.$el.find("#answers-form").append("<li>\n  <input class=\"answer\" type=\"text\" placeholder=\"New answer\" />\n</li>");
      };

      return MainView;

    })(sandbox.mvc.View);
  });

}).call(this);
