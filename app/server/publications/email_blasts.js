Meteor.publish('email_blasts', function() {
  this.unblock();

  if(!this.userId) {
    throw new Meteor.Error('enoauth', 'The email blasts can be queried only by logged in users');
  }

  return App.collections.EmailBlasts.find({
    createdBy: this.userId
  }, {
    sort: { createdAt:-1 }
  });
});