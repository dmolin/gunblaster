Meteor.publish('email_blasts', function(filter) {
  this.unblock();

  if(!this.userId) {
    throw new Meteor.Error('enoauth', 'The email blasts can be queried only by logged in users');
  }

  console.log("email_blasts filter", filter);

  var queryFilter = {
    createdBy: this.userId
  };

  queryFilter = _.extend({}, queryFilter, App.queryFilters.emailBlasts(filter));

  console.log("query", queryFilter);
  return App.collections.EmailBlasts.find(queryFilter, {
    sort: { createdAt:-1 }
  });
});
