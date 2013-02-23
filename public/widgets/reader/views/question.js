(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["mvcSandbox", "./answer", "bootstrap"], function(sandbox, AnswerView) {
    var QuestionView;
    sandbox.template.registerHelper("Answer", function(question, answer) {
      return sandbox.template.addSubView(new AnswerView({
        question: question,
        answer: answer
      }));
    });
    return QuestionView = (function(_super) {

      __extends(QuestionView, _super);

      function QuestionView() {
        return QuestionView.__super__.constructor.apply(this, arguments);
      }

      QuestionView.prototype.id = "question-show";

      QuestionView.prototype.template = sandbox.template.compile("<div class=\"modal-header\">\n  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n  <h3>{{title}}</h3>\n</div>\n<div class=\"modal-body\">\n{{#each answers}}\n  {{Answer ../question this}}\n{{/each}}\n</div>");

      QuestionView.prototype.attributes = {
        "class": "modal fade"
      };

      QuestionView.prototype.initialize = function() {
        var _this = this;
        return this.model.on("answered", function() {
          return _this.$el.modal("hide");
        });
      };

      QuestionView.prototype.render = function() {
        var data, i, value;
        data = {
          question: this.model,
          title: this.model.get("title"),
          answers: (function() {
            var _ref, _results;
            _ref = this.model.get("answers");
            _results = [];
            for (i in _ref) {
              value = _ref[i];
              _results.push({
                i: i,
                value: value,
                active: this.model.answered
              });
            }
            return _results;
          }).call(this)
        };
        this.$el.html(this.template(data));
        sandbox.template.renderSubViews(this.$el);
        this.$el.modal("show");
        return this;
      };

      return QuestionView;

    })(sandbox.mvc.View);
  });

}).call(this);
