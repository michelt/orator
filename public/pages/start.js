(function() {

  require(["widgetSandbox", "models/presentation"], function(sandbox, Presentation) {
    return sandbox.dom.ready(function() {
      return sandbox.start("presenter", {
        presentation: new Presentation(sandbox.dom.data("#app", "presentation"))
      });
    });
  });

}).call(this);
