(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["mvcSandbox"], function(sandbox) {
    var Presentation;
    return Presentation = (function(_super) {

      __extends(Presentation, _super);

      function Presentation() {
        return Presentation.__super__.constructor.apply(this, arguments);
      }

      Presentation.prototype.getSlideByIndices = function(data) {
        var slide_v, slides, slides_h, _ref;
        if (data == null) {
          data = {};
        }
        if (!(slides_h = this.get("slides_h"))) {
          return null;
        }
        if ((data.h != null) && (slides = (_ref = slides_h[data.h]) != null ? _ref.slides_v : void 0)) {
          if ((data.v != null) && (slide_v = slides[data.v])) {
            return slide_v;
          } else {
            return slides[0];
          }
        } else {
          return null;
        }
      };

      return Presentation;

    })(sandbox.mvc.Model);
  });

}).call(this);
