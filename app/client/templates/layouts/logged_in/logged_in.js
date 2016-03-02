Template.LoggedIn.helpers({
  username: function() {
    return Session.get('currentUser').username || "-"
  },
  userImageUrl: function() {
    return Session.get('currentUser').gravatar;
  }
});

Template.LoggedIn.events({
  'click .logout': function() {
    Accounts.logout();
  }
});
