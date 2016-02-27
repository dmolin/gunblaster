App.Router.plugins.login = {
  loginRequired: function(route) {
    console.log(route);
    if(!Meteor.userId()) {
      //App.Router.stack.push(route);
      //this.render('login');
      Router.go('login');
    } else {
      //if there's something in the route stack, pop it and go there
      if(App.Router.stack.length) {
        Router.go(App.Router.stack.shift().url);
      } else {
        this.next();
      }
    }
  },
  homeIfLogged: function(route) {
    if(Meteor.userId()) {
      Router.go('home')
    } else {
      this.next();
    }
  }
};

Router.onBeforeAction(App.Router.plugins.login.loginRequired, {
  only: ['home']
});

Router.onBeforeAction(App.Router.plugins.login.homeIfLogged, {
  only: ['login']
});

// Log in route
Router.route('/login', {
  name: 'login',
  controller: 'App.controllers.LoginController'
});

Router.route('/', {
  name: 'home',
  controller: 'HomeController'
});

