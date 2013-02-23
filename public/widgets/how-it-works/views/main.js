(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["mvcSandbox", "text!../templates/help.htm"], function(sandbox, tmpl) {
    var MainView;
    return MainView = (function(_super) {

      __extends(MainView, _super);

      function MainView() {
        return MainView.__super__.constructor.apply(this, arguments);
      }

      MainView.prototype.template = sandbox.template.compile(tmpl);

      MainView.prototype.events = {
        "click .important": "render"
      };

      MainView.prototype.initialize = function(params) {
        return this.slug = params.slug;
      };

      MainView.prototype.render = function() {
        return this.$el.addClass("help").hide().html(this.template({
          slug: this.slug
        })).fadeIn();
      };

      return MainView;

    })(sandbox.mvc.View);
  });

}).call(this);
