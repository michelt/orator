(function() {

  define(["serviceSandbox", "reveal"], function(sandbox, Reveal) {
    Reveal.addEventListener("slidechanged", function(ev) {
      return sandbox.emit("reveal.changed", ev);
    });
    sandbox.register("reveal.change", function(dfd, slide) {
      return Reveal.slide(slide.h, slide.v);
    });
    return Reveal;
  });

}).call(this);
