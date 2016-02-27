Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

App.Router = {
  plugins:{},
  stack: []
};

//function ensureNoAuth () {
//  if (Meteor.userId()) {
//    Router.go('home');
//  } else {
//    this.next();
//  }
//}

