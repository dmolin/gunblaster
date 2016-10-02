Meteor.publish('email_blast', function(id) {
  this.unblock();

  if(!this.userId) {
    throw new Meteor.Error('enoauth', 'The email blast can be queried only by logged in users');
  }

  return App.collections.EmailBlasts.find({
    _id: id,
    createdBy: this.userId
  });
});
