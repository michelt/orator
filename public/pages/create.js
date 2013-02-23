(function() {

  require(["widgetSandbox"], function(sandbox) {
    return sandbox.dom.ready(function() {
      return sandbox.start("slides-input", {
        el: "#slides-input"
      });
    });
  });

}).call(this);
