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

  Meteor.autorun(function () {
    if(Meteor.user()) {
      console.log("logged in");
      var currentUser = _.extend({}, Meteor.user());
      currentUser.email = currentUser.emails && currentUser.emails.length && currentUser.emails[0].address || "";
      currentUser.gravatar = Gravatar.imageUrl(currentUser.email, {
          size: 34,
          default: 'mm'
        });
      Session.set('currentUser', currentUser);
    } else {
      Session.set('currentUser', {});
      App.currentUser = {};
      console.log("logged out");
    }
  });
});
