(function() {

  require(["widgetSandbox"], function(sandbox) {
    return sandbox.dom.ready(function() {
      return sandbox.start("how-it-works", {
        el: "#how-it-works",
        slug: sandbox.dom.data("#app", "slug")
      });
    });
  });

}).call(this);
