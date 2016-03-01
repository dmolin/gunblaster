Router.configure({
  layoutTemplate: 'LoggedIn',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

App.Router.plugins.login = {
  loginRequired: function(route) {
    if(!Meteor.userId()) {
      Router.go('login');
    } else {
      this.next();
    }
  },
  homeIfLogged: function(route) {
    if(Meteor.userId()) {
      Router.go('newBlaster')
    } else {
      this.next();
    }
  }
};

Router.onBeforeAction(App.Router.plugins.login.loginRequired, {
  only: ['newBlaster']
});

Router.onBeforeAction(App.Router.plugins.login.homeIfLogged, {
  only: ['login']
});

// Log in route
Router.route('/login', {
  name: 'login',
  controller: 'App.controllers.LoginController',
  layoutTemplate: "MasterLayout"
});

Router.route('/new', {
  name: 'newBlaster',
  controller: 'App.controllers.NewBlasterController'
});

Router.route('/history', {
  name: 'blasterHistory',
  controller: 'App.controllers.BlasterHistoryController'
});
