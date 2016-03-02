Template.registerHelper('currentRoute', function() {
  return App.Router.currentRoute.get();
});

Template.registerHelper('equals', function (a, b) {
  return a === b;
});

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('DD-MM-YYYY HH:mm:ss');
});