Meteor.publish('email_blasts', function(filter) {
  this.unblock();

  if(!this.userId) {
    throw new Meteor.Error('enoauth', 'The email blasts can be queried only by logged in users');
    //alternatively, I can return this.ready() to ready the cursor without transferring any data
  }

  var queryFilter = {
    createdBy: this.userId
  };

  queryFilter = _.extend({}, queryFilter, App.queryFilters.emailBlasts(filter));

  return App.collections.EmailBlasts.find(queryFilter, {
    sort: { createdAt:-1 }
  });
});
