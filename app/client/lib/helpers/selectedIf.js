
Template.registerHelper('selectedIf', function(prop, val) {
  return prop === val ? 'selected' : '';
});
