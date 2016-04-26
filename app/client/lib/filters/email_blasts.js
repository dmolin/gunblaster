Meteor.startup(function() {
  App.queryFilters.emailBlasts.initialValue = {createdAt: '1w'};
  App.data.filters.emailBlasts = new ReactiveVar(App.queryFilters.emailBlasts.initialValue);
})
