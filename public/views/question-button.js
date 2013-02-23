(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["mvcSandbox"], function(sandbox) {
    var ButtonView;
    return ButtonView = (function(_super) {

      __extends(ButtonView, _super);

      function ButtonView() {
        return ButtonView.__super__.constructor.apply(this, arguments);
      }

      ButtonView.prototype.tagName = "button";

      ButtonView.prototype.attributes = {
        "class": "btn btn-large"
      };

      ButtonView.prototype.events = {
        click: "displayQuestion"
      };

      ButtonView.prototype.displayQuestion = function() {
        return sandbox.emit("question.display", this.model);
      };

      ButtonView.prototype.render = function() {
        this.$el.text(this.model.get("title"));
        return this;
      };

      return ButtonView;

    })(sandbox.mvc.View);
  });

}).call(this);
