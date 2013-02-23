(function() {

  define(["core", "backboneExtension", "commandExtension", "handlebarsExtension", "httpExtension"], function(core, backbone, command, handlebars, http) {
    return {
      util: core.util,
      data: core.data,
      on: function(channel, cb) {
        return core.on(channel, "mvc", cb, this);
      },
      emit: function() {
        return core.emit.apply(this, arguments);
      },
      start: function() {
        return core.start.apply(this, arguments);
      },
      stop: function() {
        return core.stop.apply(this, arguments);
      },
      register: command.register,
      request: command.request,
      mvc: {
        Model: backbone.Model,
        Collection: backbone.Collection,
        View: backbone.View,
        Events: backbone.Events
      },
      template: handlebars,
      http: http
    };
  });

}).call(this);