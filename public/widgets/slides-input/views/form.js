(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["mvcSandbox"], function(sandbox) {
    var FormView;
    return FormView = (function(_super) {

      __extends(FormView, _super);

      function FormView() {
        return FormView.__super__.constructor.apply(this, arguments);
      }

      FormView.prototype.events = {
        "submit": "handleForm"
      };

      FormView.prototype.initialize = function() {
        this.htmlInput = this.$el.find("textarea");
        return this.slugInput = this.$el.find("input.slug");
      };

      FormView.prototype.handleForm = function(e) {
        var html, slides_h, slug,
          _this = this;
        e.preventDefault();
        this.htmlInput.removeClass("error");
        this.slugInput.removeClass("error");
        html = $(this.htmlInput.val());
        if (html.length) {
          slides_h = this.parseSlides(html);
        } else {
          this.htmlInput.addClass("error");
        }
        slug = this.slugInput.val();
        if (!slug.length) {
          this.slugInput.addClass("error");
        }
        if (slides_h && slides_h.length && slug.length) {
          return this.postSlides({
            slides_h: slides_h,
            slug: slug
          }).fail(function() {
            return _this.slugInput.addClass("error");
          });
        }
      };

      FormView.prototype.parseSlides = function(html) {
        var section, slide, slides, subsections, _i, _len, _ref;
        slides = [];
        if (html.length) {
          _ref = html.find("> section");
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            section = _ref[_i];
            subsections = $(section).find("section");
            if (subsections.length) {
              slides.push({
                slides_v: (function() {
                  var _j, _len1, _results;
                  _results = [];
                  for (_j = 0, _len1 = subsections.length; _j < _len1; _j++) {
                    slide = subsections[_j];
                    _results.push({
                      data: slide.outerHTML
                    });
                  }
                  return _results;
                })()
              });
            } else {
              slides.push({
                slides_v: [
                  {
                    data: section.outerHTML
                  }
                ]
              });
            }
          }
        }
        return slides;
      };

      FormView.prototype.postSlides = function(data) {
        return sandbox.http.post("/create", data).done(function(res) {
          if (res && res.slug) {
            return location.href = "/" + res.slug + "/edit";
          }
        });
      };

      return FormView;

    })(sandbox.mvc.View);
  });

}).call(this);
