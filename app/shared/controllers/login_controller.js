App.controllers.LoginController = RouteController.extend({
  onRun: function () {
    console.log("login controller:onRun");
    this.next();
  },
  onRerun: function () {
    this.next();
  },
  onBeforeAction: function () {
    console.log("login controller:onBeforeAction");
    this.next();
  },
  action: function () {
    console.log("login controller:action");
    this.render();
  }
});
