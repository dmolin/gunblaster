App.controllers.BaseController = RouteController.extend({
  onBeforeAction: function() {
    console.log("BaseController:onBeforeAction");
    App.Router.currentRoute.set('');
    this.next();
  }
});