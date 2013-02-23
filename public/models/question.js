(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["mvcSandbox"], function(sandbox) {
    var Question;
    return Question = (function(_super) {

      __extends(Question, _super);

      function Question() {
        return Question.__super__.constructor.apply(this, arguments);
      }

      Question.prototype.answered = null;

      Question.prototype.answer = function(index) {
        if (this.answered != null) {
          return;
        }
        this.answered = index;
        return this.trigger("answered", index);
      };

      return Question;

    })(sandbox.mvc.Model);
  });

}).call(this);
