(function() {

  define(["widgetSandbox", "./views/button"], function(sandbox, ButtonView) {
    return function(options) {
      if (options == null) {
        options = {};
      }
      return new ButtonView({
        el: options.el,
        presentation: options.presentation
      });
    };
  });

}).call(this);
