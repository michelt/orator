(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["mvcSandbox"], function(sandbox) {
    var AnswerView;
    return AnswerView = (function(_super) {

      __extends(AnswerView, _super);

      function AnswerView() {
        return AnswerView.__super__.constructor.apply(this, arguments);
      }

      AnswerView.prototype.tagName = "button";

      AnswerView.prototype.attributes = {
        "class": "btn btn-large btn-block"
      };

      AnswerView.prototype.events = {
        click: "answer"
      };

      AnswerView.prototype.initialize = function(params) {
        if (params == null) {
          params = {};
        }
        this.question = params.question;
        this.index = params.answer.i;
        this.value = params.answer.value;
        return this.active = params.answer.active;
      };

      AnswerView.prototype.answer = function() {
        if (this.active != null) {
          return;
        }
        this.question.answer(this.index);
        return this.$el.addClass("btn-success");
      };

      AnswerView.prototype.render = function() {
        var addClass;
        this.$el.text(this.value);
        if (this.active != null) {
          addClass = "disabled";
          if (this.active === this.index) {
            addClass += " btn-success";
          }
          this.$el.addClass(addClass);
        }
        return this;
      };

      return AnswerView;

    })(sandbox.mvc.View);
  });

}).call(this);
