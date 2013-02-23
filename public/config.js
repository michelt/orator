(function() {

  require.config({
    baseUrl: "/",
    shim: {
      backbone: {
        deps: ["underscore", "jquery"],
        exports: "Backbone"
      },
      handlebars: {
        exports: "Handlebars"
      },
      bootstrap: {
        deps: ["jquery"]
      },
      reveal: {
        exports: "Reveal"
      },
      socketio: {
        exports: "io"
      }
    },
    paths: {
      text: "lib/require/text",
      async: "lib/require/async",
      propertyParser: "lib/require/propertyParser",
      jquery: "lib/jquery",
      underscore: "lib/lodash",
      backbone: "lib/backbone",
      handlebars: "lib/handlebars",
      aura_base: "lib/aura/base",
      dom: "lib/aura/dom",
      core: "lib/aura/core",
      backboneExtension: "extensions/backbone",
      commandExtension: "extensions/command",
      handlebarsExtension: "extensions/handlebars",
      httpExtension: "extensions/http",
      mvcSandbox: "sandboxes/mvc",
      serviceSandbox: "sandboxes/service",
      widgetSandbox: "sandboxes/widget",
      bootstrap: "lib/bootstrap",
      reveal: "lib/reveal.min",
      socketio: "socket.io/socket.io",
      question: "models/question",
      slide: "models/slide"
    }
  });

  require.aura = {
    baseUrl: "/",
    shim: {
      dom: {
        exports: "$",
        deps: ["jquery"]
      }
    },
    paths: {
      aura_base: "lib/aura/base",
      dom: "lib/aura/dom",
      core: "lib/aura/core"
    }
  };

  require.config(require.aura);

}).call(this);
