Meteor.startup(function () {
  if (Router) {
    Blaze.addBodyClass(function () {
      if (Router.current() && Router.current().route && typeof Router.current().route.getName === 'function') {
        var routeName = (Router.current().route && Router.current().route.getName());
        return "route-" + (routeName || "none");
      } else {
        return '';
      }
    });
  }

});
