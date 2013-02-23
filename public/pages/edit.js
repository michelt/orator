(function() {

  require(["widgetSandbox", "models/presentation", "components/reveal"], function(sandbox, Presentation, Reveal) {
    return sandbox.dom.ready(function() {
      Reveal.initialize({
        controls: true,
        progress: true,
        history: false,
        keyboard: true,
        overview: true,
        loop: false,
        autoSlide: 0,
        mouseWheel: true,
        rollingLinks: true,
        transition: "default"
      });
      return sandbox.start("add-question", {
        el: "#add-question",
        presentation: new Presentation(sandbox.dom.data("#app", "presentation"))
      });
    });
  });

}).call(this);
