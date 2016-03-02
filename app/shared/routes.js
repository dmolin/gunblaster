Router.configure({
  layoutTemplate: 'LoggedIn',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

App.Router.plugins.login = {
  loginRequired: function(router, options) {
    //skip API routes
    if(router.url && router.url.match(/^\/api\//)) {
      //skip API routes
      this.next();
      return;
    }

    if(!Meteor.userId()) {
      Router.go('login');
    } else {
      this.next();
    }
  },
  homeIfLogged: function(route) {
    if(Meteor.userId()) {
      Router.go('blaster/history')
    } else {
      this.next();
    }
  }
};

Router.onBeforeAction(App.Router.plugins.login.loginRequired, {
  except: ['login']
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
  name: 'blaster/new',
  controller: 'App.controllers.NewBlasterController'
});

Router.route('/history', {
  name: 'blaster/history',
  controller: 'App.controllers.BlasterHistoryController'
});

Router.route('/', function() { Router.go("blaster/history"); });
