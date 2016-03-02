Template.BackButton.events({
  'click a.go-back': function(event) {
    if(event) {
      event.preventDefault();
    }
    Router.go('blaster/history');
  }
});