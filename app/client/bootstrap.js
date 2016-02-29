Meteor.startup(function () {
  if (Router) {
    Blaze.addBodyClass(function () {
      if (Router.current() && Router.current().route && typeof Router.current().route.getName === 'function') {
        //App.Router.currentRoute = (Router.current().route && Router.current().route.getName());
        var routeName = (Router.current().route && Router.current().route.getName());
        return "route-" + (routeName || "none");
      } else {
        return '';
      }
    });
  }

});
