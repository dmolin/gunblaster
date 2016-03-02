Template.Gravatar.helpers({
  gravatar: function() {
    return Session.get('currentUser').gravatar;
  }
});