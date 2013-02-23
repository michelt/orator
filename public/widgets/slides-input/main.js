(function() {

  define(["widgetSandbox", "./views/form", "socketio"], function(sandbox, FormView) {
    return function(options) {
      if (options == null) {
        options = {};
      }
      return new FormView({
        el: options.el
      });
    };
  });

}).call(this);
