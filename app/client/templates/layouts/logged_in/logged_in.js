Template.LoggedIn.helpers({
  username: function() {
    return Meteor.user() && Meteor.user().username || "-"
  },
  senderEmail: App.Utils.currentUserEmail,
  userImageUrl: function() {
    return Gravatar.imageUrl(App.Utils.currentUserEmail(), {
      size: 34,
      default: 'mm'
    });
  }
});

Template.LoggedIn.events({
  'click .logout': function() {
    Accounts.logout();
  }
});
