(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["mvcSandbox"], function(sandbox) {
    var Slide;
    return Slide = (function(_super) {

      __extends(Slide, _super);

      function Slide() {
        return Slide.__super__.constructor.apply(this, arguments);
      }

      return Slide;

    })(sandbox.mvc.Model);
  });

}).call(this);
