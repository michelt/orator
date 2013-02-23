(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["core", "commandExtension", "underscore", "backbone"], function(core, command, _, Backbone) {
    var CacheItem, Collection, Events, Model, Router, View, cacheItems, constructorCheck, constructorCreate, deferred;
    deferred = core.data.deferred;
    Events = Backbone.Events;
    Events.emit = Events.trigger;
    CacheItem = (function(_super) {

      __extends(CacheItem, _super);

      function CacheItem() {
        return CacheItem.__super__.constructor.apply(this, arguments);
      }

      CacheItem.prototype.defaults = {
        refs: {},
        duration: 300
      };

      return CacheItem;

    })(Backbone.Model);
    cacheItems = new Backbone.Collection({
      model: CacheItem
    });
    command.register("data.fetch", function(dfd, url, attrs, options) {
      return require([url], function(Cls) {
        var instance;
        if (!Cls) {
          return dfd.reject();
        }
        instance = new Cls(attrs, options);
        if (instance.fromCache) {
          return dfd.resolve(instance);
        } else {
          return instance.fetch().pipe(dfd.resolve, dfd.reject);
        }
      });
    });
    constructorCheck = function(attrs, options) {
      var cacheItem, duration, refs, self, _ref;
      if (attrs.rid && (cacheItem = cacheItems.get(attrs.rid))) {
        self = cacheItem.get("data");
        self.set(attrs);
        self.fromCache = cacheItem.get("update");
        cacheItem.set("update", new Date());
        if (options.cache && options.cache.ref) {
          refs = cacheItem.get("refs");
          duration = (_ref = options.cache.duration) != null ? _ref : cacheItem.get("duration");
          refs[options.cache.ref] = duration ? duration + new Date() : true;
          cacheItem.set("refs", refs);
        }
        return self;
      } else {
        return false;
      }
    };
    constructorCreate = function(self, attrs, options) {
      var cacheAttrs, duration, _ref, _ref1;
      cacheAttrs = {
        id: (_ref = attrs.rid) != null ? _ref : _.uniqueId("r"),
        data: self,
        update: new Date(),
        refs: {}
      };
      if (options.cache && options.cache.ref) {
        duration = (_ref1 = options.cache.duration) != null ? _ref1 : options.cache.defaultDuration;
        cacheAttrs.refs[options.cache.ref] = duration != null ? duration + new Date : true;
        if (options.cache.defaultDuration != null) {
          cacheAttrs.duration = options.cache.defaultDuration;
        }
      }
      return cacheItems.add(new CacheItem(cacheAttrs));
    };
    Model = (function(_super) {

      __extends(Model, _super);

      function Model(attrs, options) {
        var self;
        if (attrs == null) {
          attrs = {};
        }
        if (options == null) {
          options = {};
        }
        if (attrs instanceof Model) {
          return attrs;
        }
        if (self = constructorCheck(attrs, options)) {
          return self;
        }
        Model.__super__.constructor.call(this, attrs);
        constructorCreate(this, attrs, options);
      }

      return Model;

    })(Backbone.Model);
    Collection = (function(_super) {

      __extends(Collection, _super);

      function Collection(attrs, options) {
        var self;
        if (attrs == null) {
          attrs = {};
        }
        if (options == null) {
          options = {};
        }
        if (attrs instanceof Collection) {
          return attrs;
        }
        if (self = constructorCheck(attrs, options)) {
          return self;
        }
        Collection.__super__.constructor.call(this, attrs);
        constructorCreate(this, attrs, options);
      }

      return Collection;

    })(Backbone.Collection);
    Router = Backbone.Router, View = Backbone.View;
    return {
      Events: Events,
      Router: Router,
      View: View,
      Model: Model,
      Collection: Collection
    };
  });

}).call(this);
