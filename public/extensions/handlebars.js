(function() {

  define(["jquery", "handlebars"], function($, Handlebars) {
    var subViews, template;
    Handlebars.registerHelper("safe", function(html) {
      return new Handlebars.SafeString(html);
    });
    subViews = {};
    template = Handlebars;
    template.addSubView = function(view) {
      subViews[view.cid] = view;
      return new template.SafeString("<view data-cid=\"" + view.cid + "\"></view>");
    };
    template.renderSubView = function(cid) {
      var view;
      view = subViews[cid];
      delete subViews[cid];
      if (view) {
        return view.render().el;
      } else {
        return "";
      }
    };
    template.renderSubViews = function($el) {
      return $el.find("view").each(function(i, view) {
        var $view;
        $view = $(view);
        return $view.replaceWith(template.renderSubView($view.data("cid")));
      });
    };
    return template;
  });

}).call(this);
