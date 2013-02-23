(function() {

  define(["core", "jquery", "commandExtension", "backboneExtension", "handlebarsExtension"], function(core, $, command, backbone, handlebars) {
    return {
      util: core.util,
      dom: {
        find: core.dom.find,
        data: core.dom.data,
        ready: function(cb) {
          return $(function() {
            return cb();
          });
        }
      },
      data: core.data,
      events: core.events,
      on: function(channel, cb) {
        return core.on(channel, "widget", cb, this);
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
      request: command.request,
      mvc: {
        View: backbone.View,
        Events: backbone.Events
      },
      template: handlebars
    };
  });

}).call(this);
