(function() {

  define(["widgetSandbox", "./views/main"], function(sandbox, MainView) {
    return function(options) {
      if (options == null) {
        options = {};
      }
      return new MainView({
        el: options.el,
        slug: options.slug
      });
    };
  });

}).call(this);
