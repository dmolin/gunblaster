App.controllers.BaseController = RouteController.extend({
  onBeforeAction: function() {
    App.Router.currentRoute.set('');
    this.next();
  }
});