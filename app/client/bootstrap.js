Meteor.startup(function () {
  if (Router) {
    Blaze.addBodyClass(function () {
      if (Router.current() && Router.current().route && typeof Router.current().route.getName === 'function') {
        return "route-" + Router.current().route.getName();
      } else {
        return '';
      }
    });
  }

});
