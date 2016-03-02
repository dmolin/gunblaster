Meteor.publish('currentUser', function () {
  // Unblock queue for session
  this.unblock();
  if (!this.userId) {
    throw new Meteor.Error('unauthorized', 'You are not authorized to subscribe to this data');
  }
  return Meteor.users.findOne({ _id: this.userId });
});