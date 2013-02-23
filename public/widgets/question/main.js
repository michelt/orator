(function() {

  define(["widgetSandbox", "./views/main", "question", "bootstrap"], function(sandbox, MainView, Question) {
    return function(options) {
      var container;
      if (options == null) {
        options = {};
      }
      container = sandbox.dom.find("#main-container");
      container.append(new MainView({
        model: options.slide,
        indices: options.indices
      }).render().el);
      return container.find(".modal").modal();
    };
  });

}).call(this);
