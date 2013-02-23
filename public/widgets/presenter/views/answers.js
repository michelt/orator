(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["mvcSandbox"], function(sandbox) {
    var AnswersView, tmpl;
    tmpl = "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n<h2>{{title}}</h2>\n{{#each answers}}\n<label>{{value}}: {{count}} / {{../total}}</label>\n<div class=\"progress\">\n  <div class=\"bar\" style=\"width: {{percent}}%;\"></div>\n</div>\n{{/each}}";
    return AnswersView = (function(_super) {

      __extends(AnswersView, _super);

      function AnswersView() {
        return AnswersView.__super__.constructor.apply(this, arguments);
      }

      AnswersView.prototype.el = "#answers-results";

      AnswersView.prototype.template = sandbox.template.compile(tmpl);

      AnswersView.prototype.events = {
        "click .close": "close"
      };

      AnswersView.prototype.initialize = function(params) {
        if (params == null) {
          params = {};
        }
        this.title = params.title;
        return this.answers = params.answers;
      };

      AnswersView.prototype.close = function() {
        return this.$el.fadeOut();
      };

      AnswersView.prototype.calculatePercent = function(count, total) {
        if (count != null) {
          return count / total * 100;
        } else {
          return 0;
        }
      };

      AnswersView.prototype.render = function() {
        var a, total, _i, _len, _ref;
        total = 0;
        _ref = this.answers;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          a = _ref[_i];
          if (a.count != null) {
            total += a.count;
          }
        }
        this.$el.html(this.template({
          answers: (function() {
            var _j, _len1, _ref1, _ref2, _results;
            _ref1 = this.answers;
            _results = [];
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              a = _ref1[_j];
              _results.push({
                value: a.value,
                count: (_ref2 = a.count) != null ? _ref2 : 0,
                percent: this.calculatePercent(a.count, total)
              });
            }
            return _results;
          }).call(this),
          title: this.title,
          total: total
        }));
        return this;
      };

      return AnswersView;

    })(sandbox.mvc.View);
  });

}).call(this);
