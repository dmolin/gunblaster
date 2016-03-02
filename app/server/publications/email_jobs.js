Meteor.publish('email_jobs', function(blastId) {
  this.unblock();

  if(!this.userId) {
    throw new Meteor.Error('enoauth', 'The email jobs can be queried only by logged in users');
  }

  return App.collections.EmailJobs.find({
    createdBy: this.userId,
    blastId: blastId
  });
});