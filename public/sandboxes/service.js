(function() {

  define(["core", "commandExtension", "httpExtension"], function(core, command, http) {
    return {
      util: core.util,
      data: core.data,
      on: function(channel, cb) {
        return core.on(channel, "service", cb, this);
      },
      emit: function() {
        return core.emit.apply(this, arguments);
      },
      register: command.register,
      request: command.request,
      http: http
    };
  });

}).call(this);