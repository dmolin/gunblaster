App.Utils.currentUserEmail = function() {
  var user = Meteor.user();
  return user && user.emails && user.emails[0].address || "";
};